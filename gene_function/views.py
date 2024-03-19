from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader
import json, requests, io
import pandas as pd


################### Gene Info Page Templates ###################################

# Template renderer for the Gene Info Page
def gene_info(request):
  template = loader.get_template('gene_function/locustag.html')
  species = request.GET['species']
  gene = request.GET['gene']

  url = 'https://pankb.blob.core.windows.net/data/PanKB/web_data/species/' + species + '/gene_locustag/' + gene + '.json'    # the url of the respective json file stored on the Microsoft Azure Blob Storage
  r = requests.get(url)
  json_obj = r.json()
  # Compose a context for the template rendering
  context = {
    'dataset': json.dumps(json_obj)
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

  # Compose a context for the template rendering
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

  # Compose a context for the template rendering
  context = {
    'jsonData': json.dumps(json_obj1),
    'msaData': json.dumps(r2.text)
  }
  return HttpResponse(template.render(context, request))



################### Genome Info Page Templates ###################################

# Template renderer for the Genome Info Page
def genome_info(request):
  template = loader.get_template('gene_function/genome_page.html')
  species = request.GET['species']
  genome_id = request.GET['genome_id']

  url = 'https://pankb.blob.core.windows.net/data/PanKB/web_data/species/' + species + '/genome_page/' + genome_id + '/genome_info.json'    # the url of the respective json file stored on the Microsoft Azure Blob Storage
  r = requests.get(url)
  json_obj = r.json()

  # Check if antiSMASH url exists for the given genome: ----
  antismash_url = 'https://pankb.blob.core.windows.net/data/PanKB/web_data/species/' + species + '/antismash/' + genome_id + '/index.html'
  if requests.head(antismash_url).status_code == 404:
    antismash_url = ''

  # Compose a context for the template rendering
  context = {
    'dataGenome': json.dumps(json_obj),
    'antismash_url': antismash_url
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
  # Compose a context for the template rendering
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
  gene_id = request.GET['gene_id']

  url1 = 'https://pankb.blob.core.windows.net/data/PanKB/web_data/species/' + species + '/genome_page/' + genome_id + '/genome_info.json'    # the url of the respective json file stored on the Microsoft Azure Blob Storage
  r1 = requests.get(url1)
  json_obj1 = r1.json()

  url2 = 'https://pankb.blob.core.windows.net/data/PanKB/web_data/species/' + species + '/gene_locustag/' + gene_id + '.json'    # the url of the respective json file stored on the Microsoft Azure Blob Storage
  r2 = requests.get(url2)
  json_obj2 = r2.json()

  # Check if antiSMASH url exists for the given genome: ----
  antismash_url = 'https://pankb.blob.core.windows.net/data/PanKB/web_data/species/' + species + '/antismash/' + genome_id + '/index.html'
  if requests.head(antismash_url).status_code == 404:
    antismash_url = ''

  # Compose a context for the template rendering
  context = {
    'dataGenome': json.dumps(json_obj1),
    'dataGene': json.dumps(json_obj2),
    'antismash_url': antismash_url
  }
  return HttpResponse(template.render(context, request))



