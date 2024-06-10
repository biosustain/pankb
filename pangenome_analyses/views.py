from django.shortcuts import render
from django.http import HttpResponse
from django.http import StreamingHttpResponse
from django.template import loader
from .models import GeneAnnotations
import json, requests, io, gzip, csv
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


# Source: https://docs.djangoproject.com/en/5.0/howto/outputting-csv/
class Echo:
  """ An object that implements just the write method of the file-like
  interface.
  """
  def write(self, value):
    """ Write the value by returning it, instead of storing in a buffer. """
    return value


# A view that streams potentially large presence/absence matrices
def download_matrix_csv(request):
  species = request.GET['species']
  gene_class = request.GET['gene_class']

  url = 'https://pankb.blob.core.windows.net/data/PanKB/web_data/species/' + species + '/heatmap_' + gene_class + '.json.gz'    # the url of the respective json.gz file stored on the Microsoft Azure Blob Storage
  r = requests.get(url)

  # Decompress the gzipped content and transform it to a dictionary string
  matrix_dict_str = str(gzip.decompress(r.content), 'utf-8')

  # Convert the dictionary string to a dictionary: ----
  matrix_dict = json.loads(matrix_dict_str)

  # Obtain a dictionary with the genomes info: ----
  genomes_info = matrix_dict["rows"]
  # Obtain a list with the genome ids: ----
  genome_names = [""] + [d["name"] for d in genomes_info]

  # Obtain a dictionary with the genes info: ----
  genes_info = matrix_dict["cols"]
  # Obtain the gene names: ----
  gene_names = [[d["name"] for d in genes_info]]

  # Obtain the presence/absence matrix: ----
  matrix = matrix_dict["matrix"]
  rows = gene_names + matrix
  rows = list(zip(genome_names, rows))

  # Format the resulting list iof lists
  # (the rows = the concatenated genome_id lists and matrix rows as lists of integers transformed to lists of strings): ----
  res = []
  for row in rows:
    res.append([row[0]] + list(map(str, row[1])))
  rows = res

  pseudo_buffer = Echo()
  writer = csv.writer(pseudo_buffer)

  # User the StreamingHttpResponse instead of HttpResponse to serve potentially large csv files
  # to avoid a load balancer dropping the connection (otherwise we can get the connection timeout): ----
  response = StreamingHttpResponse((writer.writerow(row) for row in rows), content_type="text/csv")
  downloaded_file_name = "Matrix__" + species + "_" + gene_class + ".csv"
  response['Content-Disposition'] = f"attachment; filename=" + downloaded_file_name
  return response


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

  # Set the filter() function parameters: ----
  filter_params = {}
  filter_params['pangenome_analysis'] = species
  gene_annotations = GeneAnnotations.objects.filter(**filter_params).values()

  # Transform the QuerySet with gene annotations into a pandas df: ----
  gene_annotations_pd = pd.DataFrame(list(gene_annotations), index=None)
  # Remove the column with ids: ----
  del  gene_annotations_pd["_id"]
  # Transform the dataframe with gene annotations into a list of lists (imposed by the front-end JS):
  ga_list_of_lists = gene_annotations_pd.values.tolist()
  # Transform the list of lists into a JSON object: ----
  gene_annotations_json = json.dumps(ga_list_of_lists, default=str)

  # Compose a context for the template rendering
  context = {
    'speciesData': json.dumps(json_obj1),
    'dataset': gene_annotations_json
  }
  return HttpResponse(template.render(context, request))


# A view that serves the Gene Annotation table content in the .csv format
def download_gene_annotation_table_csv(request):
  species = request.GET.get('species')
  downloaded_file_name = "Gene_annotations__" + species + ".csv"

  # Adjust filter parameters based on the GET paramater value: ----
  filter_params = {}
  filter_params['pangenome_analysis'] = species
  # Get a table with gene_annotations as a list of dictionaries: ----
  gene_annotations = GeneAnnotations.objects.filter(**filter_params).values('gene', 'pangenomic_class', 'cog_category', 'cog_name', 'description', 'protein', 'pfams', 'frequency').order_by('gene')

  # Transform a list of dictionaries into a list of lists: ----
  rows = list(map(lambda x: list(x.values()), gene_annotations))
  # Add the column names: ----
  rows.insert(0, list(gene_annotations[0].keys()))

  pseudo_buffer = Echo()
  writer = csv.writer(pseudo_buffer)

  # User the StreamingHttpResponse instead of HttpResponse to serve potentially large csv files
  # to avoid a load balancer dropping the connection (otherwise we can get the connection timeout): ----
  response = StreamingHttpResponse((writer.writerow(row) for row in rows), content_type="text/csv")
  response['Content-Disposition'] = f"attachment; filename=" + downloaded_file_name
  return response


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