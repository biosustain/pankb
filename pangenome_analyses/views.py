from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader
import json, requests, io, gzip
import pandas as pd


################### Overview Page Templates ###################################

# Template renderer for the Pangenome Analyses Overview page
# (data for the info panel on the left is contained in the render context)
def overview(request):
  template = loader.get_template('pangenome_analyses/Pangenome_analyses_overview.html')
  species = request.GET['species']
  url = 'https://pankb.blob.core.windows.net/data/PanKB/web_data/species/' + species + '/info_panel.json'    # the url of the respective json file stored on the Microsoft Azure Blob Storage
  r = requests.get(url)
  json_obj = r.json()
  # Compose a context for the template rendering
  context = {
    'speciesData': json.dumps(json_obj)
  }
  return HttpResponse(template.render(context, request))


# Template renderer for the Heap's Law plot
def heaps_law(request):
  template = loader.get_template('pangenome_analyses/plots/heaps_law.html')
  species = request.GET['species']
  url = 'https://pankb.blob.core.windows.net/data/PanKB/web_data/species/' + species + '/gene_freq.json'    # the url of the respective json file stored on the Microsoft Azure Blob Storage
  r = requests.get(url)
  json_obj = r.json()
  # Compose a context for the template rendering
  context = {
    'dataset': json.dumps(json_obj)
  }
  return HttpResponse(template.render(context, request))


# Template renderer for the Cumulative Gene Frequency plot
def cumulative_freq(request):
  template = loader.get_template('pangenome_analyses/plots/cumulative_freq.html')
  species = request.GET['species']
  url = 'https://pankb.blob.core.windows.net/data/PanKB/web_data/species/' + species + '/gene_freq.json'    # the url of the respective json file stored on the Microsoft Azure Blob Storage
  r = requests.get(url)
  json_obj = r.json()
  # Compose a context for the template rendering
  context = {
    'dataset': json.dumps(json_obj)
  }
  return HttpResponse(template.render(context, request))


# Template renderer for the Gene Annotation Distribution Plot
def gene_annotation_distribution(request):
  template = loader.get_template('pangenome_analyses/plots/gene_annotation_barplot.html')
  species = request.GET['species']
  url = 'https://pankb.blob.core.windows.net/data/PanKB/web_data/species/' + species + '/COG_distribution.json'    # the url of the respective json file stored on the Microsoft Azure Blob Storage
  r = requests.get(url)
  json_obj = r.json()
  # Compose a context for the template rendering
  context = {
    'dataset': json.dumps(json_obj)
  }
  return HttpResponse(template.render(context, request))


# Template renderer for the Gene Frequency Plot
def gene_freq(request):
  template = loader.get_template('pangenome_analyses/plots/gene_freq.html')
  species = request.GET['species']
  url = 'https://pankb.blob.core.windows.net/data/PanKB/web_data/species/' + species + '/gene_freq.json'    # the url of the respective json file stored on the Microsoft Azure Blob Storage
  r = requests.get(url)
  json_obj = r.json()
  # Compose a context for the template rendering
  context = {
    'dataset': json.dumps(json_obj)
  }
  return HttpResponse(template.render(context, request))


# Template renderer for the Presence/Absence Matrix Plot
def hotmap(request):
  template = loader.get_template('pangenome_analyses/plots/hotmap.html')
  species = request.GET['species']
  gene_class = request.GET['gene_class']

  url1 = 'https://pankb.blob.core.windows.net/data/PanKB/web_data/species/' + species + '/source_info_' + gene_class + '.json'    # the url of the respective json file stored on the Microsoft Azure Blob Storage
  r1 = requests.get(url1)
  json_obj1 = r1.json()

  url2 = 'https://pankb.blob.core.windows.net/data/PanKB/web_data/species/' + species + '/heatmap_' + gene_class + '.json.gz'    # the url of the respective json.gz file stored on the Microsoft Azure Blob Storage
  r2 = requests.get(url2)
  str2 = str(gzip.decompress(r2.content), 'utf-8')   # decompress the gzipped content and transform it to a string

  # Compose a context for the template rendering
  context = {
    'dataset': json.dumps(json_obj1),
    'heatmapData': json.dumps(str2)
  }
  return HttpResponse(template.render(context, request))


# Template renderer for the first alleleome plot
def variant_dominant_freq(request):
  template = loader.get_template('pangenome_analyses/plots/variant_dominant_frequency.html')
  species = request.GET['species']
  url = 'https://pankb.blob.core.windows.net/data/PanKB/web_data/species/' + species + '/alleleome/step_line.json'    # the url of the respective json file stored on the Microsoft Azure Blob Storage
  r = requests.get(url)
  json_obj = r.json()
  # Compose a context for the template rendering
  context = {
    'dataset': json.dumps(json_obj)
  }
  return HttpResponse(template.render(context, request))


# Template renderer for the second alleleome plot
def ds_dn_ratio(request):
  template = loader.get_template('pangenome_analyses/plots//dn_ds_ratio.html')
  species = request.GET['species']
  url = 'https://pankb.blob.core.windows.net/data/PanKB/web_data/species/' + species + '/alleleome/final_dn_ds_count_per_gene.csv'    # the url of the respective csv file stored on the Microsoft Azure Blob Storage
  r = requests.get(url)
  dataset_df = pd.read_csv(io.StringIO(r.content.decode('utf-8')))
  dataset_dict = dataset_df.to_dict(orient='records')
  # Compose a context for the template rendering
  context = {
    'dataset': json.dumps(dataset_dict)
  }
  return HttpResponse(template.render(context, request))



################### Gene Annotation Page Templates ###################################

# Template renderer for the Gene Annotation Page
# (data for the info panel on the left is contained in the render context)
def gene_annotation(request):
  template = loader.get_template('pangenome_analyses/Pangenome_analyses_gene_annotation.html')
  species = request.GET['species']

  url1 = 'https://pankb.blob.core.windows.net/data/PanKB/web_data/species/' + species + '/info_panel.json'    # the url of the respective json file stored on the Microsoft Azure Blob Storage
  r1 = requests.get(url1)
  json_obj1 = r1.json()

  url2 = 'https://pankb.blob.core.windows.net/data/PanKB/web_data/species/' + species + '/All.json'    # the url of the respective json file stored on the Microsoft Azure Blob Storage
  r2 = requests.get(url2)
  json_obj2 = r2.json()

  # Compose a context for the template rendering
  context = {
    'speciesData': json.dumps(json_obj1),
    'dataset': json.dumps(json_obj2)
  }
  return HttpResponse(template.render(context, request))



################### Phylogenetic Tree Page Templates ###################################

# Template renderer for the Phylogenetic tree page
# (data for the info panel on the left is contained in the render context)
def phylogenetic_tree(request):
  template = loader.get_template('pangenome_analyses/Pangenome_analyses_phylogetic_tree.html')
  species = request.GET['species']
  url = 'https://pankb.blob.core.windows.net/data/PanKB/web_data/species/' + species + '/info_panel.json'    # the url of the respective json file stored on the Microsoft Azure Blob Storage
  r = requests.get(url)
  json_obj = r.json()
  # Compose a context for the template rendering
  context = {
    'speciesData': json.dumps(json_obj)
  }
  return HttpResponse(template.render(context, request))


# Template renderer for the Phylogenetic Tree plot subtemplate
def phylotree_plot(request):
  template = loader.get_template('pangenome_analyses/plots/phylotree_plot.html')
  species = request.GET['species']
  url = 'https://pankb.blob.core.windows.net/data/PanKB/web_data/species/' + species + '/phylogenetic_tree.newick'    # the url of the respective json file stored on the Microsoft Azure Blob Storage
  r = requests.get(url)
  # Compose a context for the template rendering
  context = {
    'dataset': json.dumps(r.text)
  }
  return HttpResponse(template.render(context, request))