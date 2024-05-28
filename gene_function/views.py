from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader
import json, requests, io
import pandas as pd
from .models import GeneInfo, GenomeInfo, PathwayInfo
from django.db.models import Q



################### Gene Info Page Templates ###################################

# Template renderer for the Gene Info Page
def gene_info(request):
  template = loader.get_template('gene_function/gene_info.html')
  species = request.GET['species']
  gene = request.GET['gene']

  # Set the filter() function parameters: ----
  filter_params = {}
  filter_params['pangenome_analysis'] = species
  filter_params['gene'] = gene
  # Obtain the gene info: ----
  gene_info = GeneInfo.objects.filter(**filter_params).values()
  # In the Microsoft Azure Blob Storage, we actually store python objects that are dictionaries with the records orientation:
  # [{"key_1": value_1, "key_2": value_2,..., "key_n": value_n}, ..., {} ]
  # Transform the data to the dataframe first and remove a columns with ids (not needed in the output): ----
  gene_info_pd = pd.DataFrame(list(gene_info), index=None)
  del gene_info_pd['_id']

  # Obtain the list of all genomes containing the given gene: ----
  genome_ids_list = list(set(gene_info_pd["genome_id"]))
  # Obrtain the pathways associated with the given gene and genomes containing it: ----
  pathway_info = PathwayInfo.objects.filter(Q(pangenome_analysis = species) & Q(gene = gene) & Q(genome_id__in = genome_ids_list)).values('pathway_id', 'pathway_name', 'strain', 'genome_id').order_by('pathway_name')
  pathway_info_pd = pd.DataFrame(list(pathway_info), index=None)
  if not pathway_info_pd.empty:
    # Wrap the pathway names with tags: ----
    pathway_info_pd["pathway_name"] = "<a href='/gene_function/pathway_info/?pathway_id=" + pathway_info_pd["pathway_id"] + "&strain=" + pathway_info_pd["strain"] + "' target='_blank'>" + pathway_info_pd["pathway_name"] + "</a>"
    pathway_info_pd = pathway_info_pd.groupby(["genome_id", "strain"], as_index=False)["pathway_name"].apply(lambda x: ', '.join(x))
  # Rename the column accordingly remove the old one: ----
    pathway_info_pd["pathways"] = pathway_info_pd["pathway_name"]
    del pathway_info_pd["pathway_name"]
    # Merge the gene and associated pathways info: ----
    gene_info_pd = gene_info_pd.merge(pathway_info_pd, how='left', on=["genome_id"])
    # Fill NaNs that appear after the merge: ----
    gene_info_pd["pathways"] = gene_info_pd["pathways"].fillna(value=" - ")
  else:
    gene_info_pd["pathways"] = " - "
    
  gene_info_pd = gene_info_pd[["locus_tag", "genome_id", "protein", "start_position", "end_position", "nucleotide_seq", "aminoacid_seq", "pathways"]]

  # Transform the df to a list of dictionaries: ----
  gene_info_dict = gene_info_pd.to_dict(orient = "records")
  gene_info_json = json.dumps(gene_info_dict, default = str)  # json dumps replaces the single quotes with the double ones

  # Compose a context for the template rendering: ----
  context = {
    'dataset': gene_info_json
  }
  return HttpResponse(template.render(context, request))


# Template renderer for the Dominant and Variant Amino Acid Position Overview of a gene
def aa_pos_overview(request):
  template = loader.get_template('gene_function/plots/gene_AA_pos_overview.html')
  species = request.GET['species']
  gene = request.GET['gene']

  url1 = 'https://pankb.blob.core.windows.net/data/PanKB/web_data/species/' + species + '/info_panel.json'    # the url of the respective json file stored on the Microsoft Azure Blob Storage
  r1 = requests.get(url1)
  json_obj1 = r1.json()

  url2 = 'https://pankb.blob.core.windows.net/data/PanKB/web_data/species/' + species + '/alleleome/' + gene + '/' + gene + '_pan_aa_thresh_core_dom_var_pos.csv'    # the url of the respective csv file stored on the Microsoft Azure Blob Storage
  r2 = requests.get(url2)
  dataset_df2 = pd.read_csv(io.StringIO(r2.content.decode('utf-8')))
  dataset_dict2 = dataset_df2.to_dict(orient='records')

  # Compose a context for the template rendering: ----
  context = {
    'speciesData': json.dumps(json_obj1),
    'dataset': json.dumps(dataset_dict2)
  }
  return HttpResponse(template.render(context, request))


# Template renderer for the MSA plot
def msa(request):
  template = loader.get_template('gene_function/plots/MSA.html')
  species = request.GET['species']
  gene = request.GET['gene']

  url1 = 'https://pankb.blob.core.windows.net/data/PanKB/web_data/species/' + species + '/alleleome/' + gene + '/AA_freq.json'    # the url of the respective json file stored on the Microsoft Azure Blob Storage
  r1 = requests.get(url1)
  json_obj1 = r1.json()

  url2 = 'https://pankb.blob.core.windows.net/data/PanKB/web_data/species/' + species + '/alleleome/' + gene +'/MSA.fasta'    # the url of the respective json file stored on the Microsoft Azure Blob Storage
  r2 = requests.get(url2)

  # Compose a context for the template rendering: ----
  context = {
    'jsonData': json.dumps(json_obj1),
    'msaData': json.dumps(r2.text)
  }
  return HttpResponse(template.render(context, request))



################### Genome Info Page Templates ###################################
# Template renderer for the Genome Info Page
def genome_info(request):
  template = loader.get_template('gene_function/genome_info.html')
  species = request.GET['species']
  genome_id = request.GET['genome_id']

  # Set the filter() function parameters: ----
  filter_params = {}
  filter_params['pangenome_analysis'] = species
  filter_params['genome_id'] = genome_id
  # Obtain the genome info: ----
  genome_info = GenomeInfo.objects.filter(**filter_params).values()
  # In the Microsoft Azure Blob Storage, we actually store python objects that are nested dictionaries:
  # {"genome_id": {"key_1": value_1, "key_2": value_2, ..., "key_n": value_n}}
  # Transform the data to the dataframe first and remove a columns with ids (not needed in the output): ----
  genome_info_pd = pd.DataFrame(list(genome_info), index=None)
  del genome_info_pd['_id']

  # Transform the df to a dict of dicts: ----
  genome_info_dict = genome_info_pd.to_dict(orient="index")
  # Substitute the index with our own (genome_id): ----
  dict_vals = {k:v for d in genome_info_dict.values() for k,v in  d.items()}
  genome_info_dict = {genome_id: dict_vals}
  genome_info_json = json.dumps(genome_info_dict, default = str)  # json dumps replaces the single quotes with the double ones

  # Compose a context for the template rendering: ----
  context = {
    'dataGenome': genome_info_json,
    'antismash_url':  genome_info_dict[genome_id]["antismash_url"]
  }
  return HttpResponse(template.render(context, request))


# Template renderer for the Gene Annotation Distribution barplot of genes in a genome
def genome_barplot(request):
  template = loader.get_template('gene_function/plots/genome_barplot.html')
  species = request.GET['species']
  genome_id = request.GET['genome_id']
  url = 'https://pankb.blob.core.windows.net/data/PanKB/web_data/species/' + species + '/genome_page/' + genome_id + '/COG_distribution.json'    # the url of the respective json file stored on the Microsoft Azure Blob Storage
  r = requests.get(url)
  json_obj = r.json()
  # Compose a context for the template rendering: ----
  context = {
    'dataset': json.dumps(json_obj)
  }
  return HttpResponse(template.render(context, request))



################### Genome & Gene Info Page Templates ###################################

# Template renderer for the Genome Info Page
def genome_gene_info(request):
  template = loader.get_template('gene_function/genome_gene_info.html')
  species = request.GET['species']
  genome_id = request.GET['genome_id']
  gene = request.GET['gene_id']

  # Set the filter() function parameters: ----
  filter_params = {}
  filter_params['pangenome_analysis'] = species
  filter_params['genome_id'] = genome_id
  # Obtain the gene info: ----
  genome_info = GenomeInfo.objects.filter(**filter_params).values()
  # In the Microsoft Azure Blob Storage, we actually store python objects that are nested dictionaries:
  # {"genome_id": {"key_1": value_1, "key_2": value_2, ..., "key_n": value_n}}
  # Transform the data to the dataframe first and remove a columns with ids (not needed in the output): ----
  genome_info_pd = pd.DataFrame(list(genome_info), index=None)
  del genome_info_pd['_id']

  # Transform the df to a dict of dicts: ----
  genome_info_dict = genome_info_pd.to_dict(orient="index")
  # Substitute the index with our own (genome_id): ----
  dict_vals = {k:v for d in genome_info_dict.values() for k,v in  d.items()}
  genome_info_dict = {genome_id: dict_vals}
  genome_info_json = json.dumps(genome_info_dict, default = str)  # json dumps replaces the single quotes with the double ones

  ## Gene Info Table: ##
  # Set the filter() function parameters: ----
  filter_params = {}
  filter_params['pangenome_analysis'] = species
  filter_params['gene'] = gene
  # Obtain the gene info: ----
  gene_info = GeneInfo.objects.filter(**filter_params).values()
  # In the Microsoft Azure Blob Storage, we actually store python objects that are dictionaries with the records orientation:
  # [{"key_1": value_1, "key_2": value_2,..., "key_n": value_n}, ..., {} ]
  # Transform the data to the dataframe first and remove a columns with ids (not needed in the output): ----
  gene_info_pd = pd.DataFrame(list(gene_info), index=None)
  del gene_info_pd['_id']

  # Iterate over genomes to retrieve info about pathways: ----
  # Set the filter() function parameters: ----
  filter_params = {}
  filter_params['pangenome_analysis'] = species
  filter_params['gene'] = gene
  filter_params['genome_id'] = genome_id
  # Obtain info about associated pathways if any: ----
  pathway_info = PathwayInfo.objects.filter(**filter_params).values('pathway_id', 'pathway_name', 'strain').order_by('pathway_name')
  pathway_info_pd = pd.DataFrame(list(pathway_info), index=None)
  if len(pathway_info_pd) > 0:
    # The line below is a hacky way to wrap list items into links.
    # The HTML must be rendered by Django the templates: ----
    gene_info_pd.loc[gene_info_pd.genome_id == genome_id, 'pathways'] = (
      ", ".join(list("<a href='/gene_function/pathway_info/?pathway_id=" + pathway_info_pd["pathway_id"] + "&strain=" + pathway_info_pd["strain"] + "' target='_blank'>" + pathway_info_pd["pathway_name"] + "</a>")))
  else:
    gene_info_pd.loc[gene_info_pd.genome_id == genome_id, 'pathways'] = "-"

  # Transform the df to a list of dictionaries: ----
  gene_info_dict = gene_info_pd.to_dict(orient = "records")
  gene_info_json = json.dumps(gene_info_dict, default = str)  # json dumps replaces the single quotes with the double ones

  # Compose a context for the template rendering: ----
  context = {
    'dataGenome': genome_info_json,
    'dataGene': gene_info_json,
    'antismash_url': genome_info_dict[genome_id]["antismash_url"]
  }
  return HttpResponse(template.render(context, request))


################### Pathway Info Page Templates ###################################
def pathway_info(request):

  template = loader.get_template('gene_function/pathway_info.html')
  pathway_id = request.GET['pathway_id']
  strain = request.GET['strain']

  # Set the filter() function parameters: ----
  filter_params = {}
  filter_params['pathway_id'] = pathway_id
  filter_params['strain'] = strain

  pathway_info = PathwayInfo.objects.filter(**filter_params).values()
  # Transform the data to the dataframe first and remove a columns with ids (as it is not needed in the output): ----
  pathway_info_pd = pd.DataFrame(list(pathway_info), index=None)
  del pathway_info_pd['_id']
  species = pathway_info_pd['pangenome_analysis'][0]

  # Obtain info about the pathway genes: ----
  genes_info = PathwayInfo.objects.filter(**filter_params).values('gene', 'product', 'pangenomic_class').order_by('gene').distinct()
  genes_info_pd = pd.DataFrame(list(genes_info), index=None)

  # The line below is a hacky way to wrap list items into links.
  # The HTML must be rendered by Django the templates: ----
  pathway_info_pd.loc[pathway_info_pd.strain == strain, 'genes'] = (", ".join(list("<a href='/gene_function/gene_info/?species=" + species + "&gene=" + genes_info_pd["gene"] + "&gene_class=" + genes_info_pd["pangenomic_class"] + "' target='_blank'>" + genes_info_pd["gene"] + "</a>")))
  # The pathway products are just proteins obtained from the KEGG DB and coded by the genes included into the pathway: ----
  pathway_info_pd.loc[pathway_info_pd.strain == strain, 'products'] = (", ".join(list(genes_info_pd["product"])))
  del pathway_info_pd["gene"]
  del pathway_info_pd["product"]

  # Transform the pathway df to a dict of dicts like {"pathway_id": {"key_1": value_1, "key_2": value_2, ..., "key_n": value_n}}: ----
  pathway_info_dict = pathway_info_pd.to_dict(orient="index")

  # Substitute the index with our own: ----
  dict_vals = {k:v for d in pathway_info_dict.values() for k,v in d.items()}
  pathway_info_dict = {pathway_id: dict_vals}
  pathway_info_json = json.dumps(pathway_info_dict, default=str)  # json dumps replaces the single quotes with the double ones

  # Compose a context for the template rendering: ----
  context = {
    'dataPathway': pathway_info_json
  }
  return HttpResponse(template.render(context, request))