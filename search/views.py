from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader
from django.db.models import Q
from organisms.models import Organisms
from pangenome_analyses.models import GeneAnnotations
from gene_function.models import GeneInfo, GenomeInfo, PathwayInfo
import json
import pandas as pd
import re
from fuzzy_match import algorithims


# View: Search Results Page
def search_results(request):
    template = loader.get_template('search/search_results.html')
    # Get the query string from the URL: ----
    q = request.GET.get('q')
    # Clean the query string: ----
    q = re.sub(r'[^A-Za-z0-9-_\s]+', '', q)  # remove all symbols except letters, digits, underscores, dashes, whitespaces
    q = q.strip() # remove the leading and trailing spaces from the query string
    q = " ".join(q.split())  # remove duplicated whitespaces from the query string

    if len(q) >= 2: # only if the cleaned query string length > 2 symbols, perform the DB searches: ----
        # Get the filtered organism families from the DB: ----
        families = Organisms.objects.filter(Q(family__icontains = q)).values('family').distinct()
        families_pd = pd.DataFrame(list(families), index=None)
        if not families_pd.empty:
            families_pd["ratio"] = families_pd.apply(lambda row: algorithims.levenshtein(row["family"], q), axis=1)
            # Sort the results by the Levenstein distance: ----
            families_pd = families_pd.sort_values(by=['ratio'], ascending=False)
            # Remove columns that are not needed in the final results: ----
            del families_pd["ratio"]

        # Get the filtered species from the DB: ----
        species = Organisms.objects.filter(Q(species__icontains = q)).values('species', 'family', 'pangenome_analysis').distinct()
        species_pd = pd.DataFrame(list(species), index=None)
        if not species_pd.empty:
            species_pd["ratio"] = species_pd.apply(lambda row: algorithims.levenshtein(row["species"], q), axis=1)
            # Sort the results by the Levenstein distance: ----
            species_pd = species_pd.sort_values(by=['ratio'], ascending=False)
            # Remove columns that are not needed in the final results: ----
            del species_pd["ratio"]

        # Get the filtered pathways from the DB: ----
        pathways = PathwayInfo.objects.filter(Q(pathway_id__icontains = q) | Q(pathway_name__icontains = q) | Q(product__icontains = q)).order_by('strain', 'gene').values()
        pathways_pd = pd.DataFrame(list(pathways), index=None)

        if not pathways_pd.empty:
            pathways_pd["gene"] = "<a href='/gene_function/gene_info/?species=" + pathways_pd[
                "pangenome_analysis"] + "&gene=" + pathways_pd["gene"] + "&gene_class=" + pathways_pd[
                                      "pangenomic_class"] + "' target='_blank'>" + pathways_pd["gene"] + "</a>"

            # Obtain one df and group it by genes creating a list out of them: ---
            pathways_pd1 = \
            pathways_pd.groupby(["pathway_id", "pathway_name", "pangenome_analysis", "species", "strain"],
                                as_index=False)["gene"].apply(lambda x: ", ".join(x))
            # Obtain one df and group it by gene products creating a list out of them: ---
            pathways_pd2 = \
            pathways_pd.groupby(["pathway_id", "pathway_name", "pangenome_analysis", "species", "strain"],
                                as_index=False)["product"].apply(lambda x: ", ".join(x))

            # Rename the columns accordingly and remove the old ones: ----
            pathways_pd1["genes"] = pathways_pd1["gene"]
            del pathways_pd1["gene"]
            pathways_pd2["products"] = pathways_pd2["product"]
            del pathways_pd2["product"]

            # Merge genes and products together: ----
            pathways_pd = pathways_pd1.merge(pathways_pd2, how='inner',
                                             on=["pathway_id", "pathway_name", "pangenome_analysis", "species",
                                                 "strain"])

            pathways_pd["ratio_pathway_id"] = pathways_pd.apply(lambda row: algorithims.levenshtein(row["pathway_id"], q), axis=1)
            pathways_pd["ratio_pathway_name"] = pathways_pd.apply(lambda row: algorithims.levenshtein(row['pathway_name'], q), axis=1)
            pathways_pd["ratio_product"] = pathways_pd.apply(lambda row: algorithims.levenshtein(row['products'], q), axis=1)
            # Sort the results by the Levenstein distance: ----
            pathways_pd = pathways_pd.sort_values(by=['ratio_pathway_id', 'ratio_pathway_name', 'ratio_product'], ascending=False)
            # Remove columns that are not needed in the final results: ----
            del pathways_pd["ratio_pathway_id"]
            del pathways_pd["ratio_pathway_name"]
            del pathways_pd["ratio_product"]

            # Filter out unnecessary columns: ----
            pathways_pd = pathways_pd[["pathway_id", "pathway_name", "pangenome_analysis", "species", "strain", "genes", "products"]]

        # Get the filtered genes from the DB: ----
        genes = GeneAnnotations.objects.filter(Q(gene__icontains = q) | Q(protein__icontains = q)).values()
        genes_pd = pd.DataFrame(list(genes), index=None)
        if not genes_pd.empty:
            genes_pd["ratio_gene"] = genes_pd.apply(lambda row: algorithims.levenshtein(row["gene"], q), axis=1)
            genes_pd["ratio_protein"] = genes_pd.apply(lambda row: algorithims.levenshtein(row['protein'], q), axis=1)
            # Sort the results by the Levenstein distance: ----
            genes_pd = genes_pd.sort_values(by=['ratio_gene', 'ratio_protein'], ascending=False)
            # Remove columns that are not needed in the final results: ----
            del genes_pd["ratio_gene"]
            del genes_pd["ratio_protein"]
    else: # if the cleaned query string is too short or not set, just return the empty DFs: ----
        families_pd = pd.DataFrame()
        species_pd = pd.DataFrame()
        pathways_pd = pd.DataFrame()
        genes_pd = pd.DataFrame()

    # In the Microsoft Azure Blob Storage, we actually store python objects that are dictionaries with the list orientation:
    # {"key_1": [value_1, value_2, ..., value_n], "key_2": [value_1, value_2, ..., value_n], ..., "key_n": [value_1, value_2, ..., value_n]}
    # Transform the dataframes back to the dictionaries (so that the front-end js will be able to work with the data as in the v.1.0.0): ----
    families_dict = families_pd.to_dict(orient='list')
    families_json = json.dumps(families_dict, default=str)  # json dumps replaces the single quotes with the double ones
    species_dict = species_pd.to_dict(orient='list')
    species_json = json.dumps(species_dict, default=str)
    # Remove the column with ids for the gene search results DF (as it is not needed anymore): ----
    if not genes_pd.empty: del genes_pd["_id"]
    # Transform the dataframe with gene annotations into a list of lists (imposed by the front-end JS):
    ga_list_of_lists = genes_pd.values.tolist()
    # Transform the list of lists into a JSON object: ----
    genes_json = json.dumps(ga_list_of_lists, default=str)
    # Transform the dataframe with pathways into a list of lists (imposed by the front-end JS):
    pathways_list_of_lists = pathways_pd.values.tolist()
    # Transform the list of lists into a JSON object: ----
    pathways_json = json.dumps(pathways_list_of_lists, default=str)

    # Compose the render context: ----
    context = {
        'families_results': families_json,
        'species_results': species_json,
        'pathways_results': pathways_json,
        'genes_results': genes_json
    }
    return HttpResponse(template.render(context, request))