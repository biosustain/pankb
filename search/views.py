from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader
from django.db.models import Q
from organisms.models import Organisms
from pangenome_analyses.models import GeneAnnotations
from gene_function.models import PathwayInfo
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
        families = list(families)
        families.sort(key=lambda x: algorithims.levenshtein(x["family"], q))

        # Get the filtered species from the DB: ----
        species = Organisms.objects.filter(Q(species__icontains = q)).values('species', 'family', 'pangenome_analysis').distinct()
        species = list(species)
        species.sort(key=lambda x: algorithims.levenshtein(x["species"], q))

        # Get the filtered pathways from the DB: ----
        pathways = PathwayInfo.objects.filter(Q(pathway_id__icontains=q) | Q(pathway_name__icontains=q)).values("pathway_id", "pathway_name").order_by('pathway_id').distinct()
        pathways = list(pathways)
        pathways.sort(key=lambda x: min(algorithims.levenshtein(x["pathway_id"], q), algorithims.levenshtein(x["pathway_name"], q)))

        # Get the filtered genes from the DB: ----
        gene_keys = ['gene', 'cog_category', 'cog_name', 'description', 'protein', 'pfams', 'frequency', 'pangenomic_class']
        genes = GeneAnnotations.objects.filter(Q(gene__icontains = q) | Q(protein__icontains = q) | Q(pfams__icontains=q)).values(*gene_keys)
        genes = list(genes)
        genes.sort(key=lambda x: min(algorithims.levenshtein(x["gene"], q), algorithims.levenshtein(x["protein"], q)))
        genes = [[g[gk] for gk in gene_keys] for g in genes]

    else: # if the cleaned query string is too short or not set, just return the empty DFs: ----
        families = []
        species = []
        pathways = []
        genes = []

    no_results_list = []
    if not families:
        no_results_list.append("families")
    if not species:
        no_results_list.append("species")
    if not pathways:
        no_results_list.append("pathways")
    if not genes:
        no_results_list.append("genes")
    
    # Compose the render context: ----
    context = {
        'families_results': families,
        'species_results': species,
        'pathways_results': pathways,
        'genes_results': json.dumps(genes),
        'no_results_list': no_results_list,
    }
    return HttpResponse(template.render(context, request))