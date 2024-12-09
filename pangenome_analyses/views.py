from django.shortcuts import render
from django.http import HttpResponse, Http404, StreamingHttpResponse, JsonResponse
from django.template import loader
from django.conf import settings
from .models import GeneAnnotations
from gene_function.models import GenomeInfo
from organisms.models import Organisms
import json, requests, io, gzip, csv, time
import pandas as pd
import re


################### Overview Page Templates ###################################

# Template renderer for the Pangenome Analyses Overview page
# (data for the info panel on the left is contained in the render context)
def overview(request):
  template = loader.get_template('pangenome_analyses/overview.html')
  species = request.GET['species']

  # Set the filter parameters based on the GET paramater value: ----
  filter_params = {}
  filter_params['pangenome_analysis'] = species
  # Get info about the given organisms from the Organisms collection (in a dictionary): ----
  organism_info = Organisms.objects.filter(**filter_params).values('species', 'family', 'genomes_num', 'gene_class_distribution', 'openness')
  if len(organism_info) == 0:
    raise Http404()
  organism_info = organism_info[0]

  # Compose a context for the template rendering
  context = {
    'speciesData': organism_info
  }
  return HttpResponse(template.render(context, request))


# Template renderer for the Heap's Law plot
def heaps_law(request):
  template = loader.get_template('pangenome_analyses/plots/heaps_law.html')
  species = request.GET['species']
  url = settings.AZURE_WEB_DATA_URL + 'species/' + species + '/heaps_law.json'    # the url of the respective json file stored on the Microsoft Azure Blob Storage
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
  url = settings.AZURE_WEB_DATA_URL + 'species/' + species + '/cum_freq.json'    # the url of the respective json file stored on the Microsoft Azure Blob Storage
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
  url = settings.AZURE_WEB_DATA_URL + 'species/' + species + '/COG_distribution.json'    # the url of the respective json file stored on the Microsoft Azure Blob Storage
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
  url = settings.AZURE_WEB_DATA_URL + 'species/' + species + '/gene_freq.json'    # the url of the respective json file stored on the Microsoft Azure Blob Storage
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

  genome_info = GenomeInfo.get_genome_and_isolation_info({
          "pangenome_analysis": species,
        })
  source_info = {g["genome_id"]: [g["country"], g["isolation_source"], g["strain"]] for g in list(genome_info)}

  # url2 = settings.AZURE_WEB_DATA_URL + 'species/' + species + '/heatmap_' + gene_class + '.json.gz'    # the url of the respective json.gz file stored on the Microsoft Azure Blob Storage
  # r2 = requests.get(url2)
  # str2 = str(gzip.decompress(r2.content), 'utf-8')   # decompress the gzipped content and transform it to a string

  # Compose a context for the template rendering
  context = {
    'dataset': json.dumps(source_info),
    # 'heatmapData': str2
  }
  return HttpResponse(template.render(context, request))

def hotmap_data(request):
  species = request.GET['species']
  gene_class = request.GET['gene_class']

  url = settings.AZURE_WEB_DATA_URL + 'species/' + species + '/heatmap_' + gene_class + '.json.gz'
  r = requests.get(url)
  response = HttpResponse(r.content, content_type="application/json")
  response['Content-Encoding'] = 'gzip'
  return response

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

  url = settings.AZURE_WEB_DATA_URL + 'species/' + species + '/heatmap_' + gene_class + '.json.gz'    # the url of the respective json.gz file stored on the Microsoft Azure Blob Storage
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
  downloaded_file_name = "Matrix__" + species + "_" + gene_class + "__" + time.strftime("%Y-%m-%d_%H-%M") + ".csv"
  response['Content-Disposition'] = f"attachment; filename=" + downloaded_file_name
  return response


# Template renderer for the first alleleome plot
def variant_dominant_freq(request):
  template = loader.get_template('pangenome_analyses/plots/variant_dominant_frequency.html')
  species = request.GET['species']
  url = settings.AZURE_WEB_DATA_URL + 'species/' + species + '/panalleleome/step_line.json'    # the url of the respective json file stored on the Microsoft Azure Blob Storage
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
  url = settings.AZURE_WEB_DATA_URL + 'species/' + species + '/panalleleome/dn_ds.json'    # the url of the respective csv file stored on the Microsoft Azure Blob Storage
  r = requests.get(url)
  json_obj = r.json()
  # Compose a context for the template rendering
  context = {
    'dataset': json.dumps(json_obj)
  }
  return HttpResponse(template.render(context, request))



################### Gene Annotation Page Templates ###################################

# Template renderer for the Gene Annotation Page
# (data for the info panel on the left is contained in the render context)
def gene_annotation(request):
  template = loader.get_template('pangenome_analyses/genes.html')
  species = request.GET['species']

  # Set the filter() function parameters: ----
  filter_params = {}
  filter_params['pangenome_analysis'] = species

  # Get info about the given organisms from the Organisms collection (in a dictionary): ----
  organism_info = Organisms.objects.filter(**filter_params).values('species', 'family', 'genomes_num', 'gene_class_distribution', 'openness')
  if len(organism_info) == 0:
    raise Http404()
  organism_info = organism_info[0]

  # # Get the gene annotations info form the Gene Annotations collection: ----
  # gene_annotations = GeneAnnotations.objects.filter(**filter_params).values('gene', 'cog_category', 'cog_name', 'description', 'protein', 'pfams', 'frequency', 'pangenomic_class', 'pangenome_analysis')

  # # Transform the QuerySet with gene annotations into a pandas df: ----
  # gene_annotations_pd = pd.DataFrame(list(gene_annotations), index=None)
  # # Transform the dataframe with gene annotations into a list of lists (imposed by the front-end JS):
  # ga_list_of_lists = gene_annotations_pd.values.tolist()
  # Transform the list of lists into a JSON object: ---
  ga_list_of_lists = []
  gene_annotations_json = json.dumps(ga_list_of_lists, default=str)

  # Compose a context for the template rendering
  context = {
    'speciesData': organism_info,
    'dataset': gene_annotations_json,
    'pangenome_analysis': species,
  }
  return HttpResponse(template.render(context, request))


def genome(request):
  template = loader.get_template('pangenome_analyses/genomes.html')
  species = request.GET['species']

  # Set the filter() function parameters: ----
  filter_params = {}
  filter_params['pangenome_analysis'] = species

  # Get info about the given organisms from the Organisms collection (in a dictionary): ----
  organism_info = Organisms.objects.filter(**filter_params).values('species', 'family', 'genomes_num', 'gene_class_distribution', 'openness')
  if len(organism_info) == 0:
    raise Http404()
  organism_info = organism_info[0]

  # Compose a context for the template rendering
  context = {
    'speciesData': organism_info,
    'pangenome_analysis': species,
  }
  return HttpResponse(template.render(context, request))


# A view that serves the Gene Annotation table content in the .csv format
def download_gene_annotation_table_csv(request):
  species = request.GET.get('species')
  downloaded_file_name = "Gene_annotations__" + species + "__" + time.strftime("%Y-%m-%d_%H-%M") + ".csv"

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
  template = loader.get_template('pangenome_analyses/phylogenetic_tree.html')
  species = request.GET['species']

  # Set the filter parameters based on the GET paramater value: ----
  filter_params = {}
  filter_params['pangenome_analysis'] = species
  # Get info about the given organisms from the Organisms collection (in a dictionary): ----
  organism_info = Organisms.objects.filter(**filter_params).values('species', 'family', 'genomes_num', 'gene_class_distribution', 'openness')
  if len(organism_info) == 0:
    raise Http404()
  organism_info = organism_info[0]


  # Compose a context for the template rendering
  context = {
    'speciesData': organism_info
  }
  return HttpResponse(template.render(context, request))

def get_iso_context(iso_cat, i):
  x = "-"
  if iso_cat and len(iso_cat) > 0:
    x = iso_cat[i]
  if x == "Missing":
    x = "-"
  return x

# Template renderer for the Phylogenetic Tree plot subtemplate
def phylotree_plot(request):
  template = loader.get_template('pangenome_analyses/plots/phylotree_plot.html')
  species = request.GET['species']
  
  url = settings.AZURE_WEB_DATA_URL + 'species/' + species + '/phylogenetic_tree.newick'    # the url of the respective json file stored on the Microsoft Azure Blob Storage

  genome_info_dict = GenomeInfo.get_genome_and_isolation_info({
        "pangenome_analysis": species,
      })
  source_info = {
    g["genome_id"].replace('.', ''): {
      "Country": "-" if g["country"] == "?" else g["country"],
      "Broad Context": get_iso_context(g["iso_cat"], 0),
      "Local Context": get_iso_context(g["iso_cat"], 0),
      "Isolation Source": "-" if g["isolation_source"].lower() == "missing" else g["isolation_source"]
      } for g in genome_info_dict}

  r = requests.get(url)
  
  # Compose a context for the template rendering
  context = {
    'tree_dataset': json.dumps(r.text),
    'source_info_dataset': json.dumps(source_info)
  }
  return HttpResponse(template.render(context, request))

def _parse_get_array(req_get, name):
  data = {}
  for k, v in req_get.items():
    if not k.startswith(f"{name}["):
      continue
    i, s = k[(len(name) + 1):].split(']', 1)
    i = int(i)
    if s[0] != '[':
      continue
    s = s[1:]
    prop, s = s.split(']', 1)
    if s:
      if s[0] != '[':
        continue
      subprop, s = s[1:].split(']', 1)
      prop = f"{prop}.{subprop}"
    if not i in data:
      data[i] = {}
    data[i][prop] = v
  data = [data[i] for i in range(len(data))]
  return data

def create_datatables_api(mongo_aggregate, request_get, select_pipeline, out_keys, as_list=True):
  draw = int(request_get["draw"])
  start = int(request_get["start"])
  length = int(request_get["length"])

  columns = _parse_get_array(request_get, "columns")
  order = _parse_get_array(request_get, "order")
  search = {"value": request_get.get("search[value]", ""), "regex": request_get.get("search[regex]", "false")}

  projection = {f"results.{gk}": 1 for gk in out_keys}
  projection["info.total"] = 1
  projection["info.filtered"] = 1

  filter_pipeline = []
  results_pipeline = []

  if start > 0:
    results_pipeline.append({"$skip": start})
  if length != -1:
    results_pipeline.append({"$limit": length})

  col_search = {}
  for column in columns:
    # if column.get("searchable", "false") != "true":
    #   continue
    if column.get("search.value", "") == "":
      continue
    q = re.sub(r"[^A-Za-z0-9-_\s]+", "", column["search.value"])
    q = q.strip()
    q = " ".join(q.split())
    col_search[column["name"]] = {"$regex": q, "$options": 'i'}

  glob_search = []
  if search.get("value", "") != "":
    q = re.sub(r"[^A-Za-z0-9-_\s]+", "", search["value"])
    q = q.strip()
    q = " ".join(q.split())
    for column in columns:
      if column.get("searchable", "false") != "true":
        continue
      glob_search.append({column["name"]: {"$regex": q, "$options": 'i'}})

  if col_search and not glob_search:
    filter_pipeline.append({
      "$match": col_search,
    })
  elif glob_search and not col_search:
    filter_pipeline.append({
      "$match": {"$or": glob_search},
    })
  elif col_search and glob_search:
    filter_pipeline.append({
      "$match": {"$and": [col_search, {"$or": glob_search}]},
    })


  if len(order) > 0:
    filter_pipeline.append(
      {"$sort":
        {
          x["name"]: (-1 if x["dir"] == "desc" else 1) for x in order
        }
      }
    )

  pipeline = (select_pipeline + [
    {"$facet": {
      "total_info": [{"$count": "total"}],
      "filter": filter_pipeline,
    }},
    {"$unwind": "$total_info"},
    {"$unwind": "$filter"},
    {"$addFields": {"filter.total": "$total_info.total"}},
    {"$replaceRoot": { "newRoot": "$filter" }},
    {"$facet": {
      "info": [{"$count": "filtered"}],
      "results": results_pipeline,
    }},
    {"$unwind": "$info"},
    {"$addFields": {"first_doc": { "$first": "$results" } } },
    {"$addFields": {"info.total": "$first_doc.total" } },
    {"$project": projection},
    ])

  results = list(mongo_aggregate(pipeline))

  if not results:
    data = []
    recordsTotal = 0 # TODO: this is not really correct
    recordsFiltered = 0
  else:
    data = list(results[0]["results"])
    recordsTotal = results[0]["info"]["total"]
    recordsFiltered = results[0]["info"]["filtered"]
    if as_list:
      data = [[g.get(gk, None) for gk in out_keys] for g in data]

  draw = draw + 1

  response = {
    "draw": draw,
    "recordsTotal": recordsTotal,
    "recordsFiltered": recordsFiltered,
    "data": data,
    "columns": columns,
    "order": order,
    }
  return response

# API for datatables
def gene_annotation_json(request):
  pangenome_analysis = str(request.GET["pangenome_analysis"])
  gene_keys = ['gene', 'cog_category', 'cog_name', 'description', 'protein', 'pfams', 'frequency', 'pangenomic_class', 'pangenome_analysis']
  select_pipeline = [{"$match": {"pangenome_analysis": pangenome_analysis}}]

  response = create_datatables_api(GeneAnnotations.objects.mongo_aggregate, request.GET, select_pipeline, gene_keys)

  return JsonResponse(response)

def genome_json(request):
  pangenome_analysis = str(request.GET["pangenome_analysis"])
  genome_keys = ['pangenome_analysis', 'genome_id', 'strain', 'phylo_group', 'genome_len', 'gc_content', 'country', 'isolation_source', 'iso_cat']
  select_pipeline = GenomeInfo.get_genome_and_isolation_info_pipeline({"pangenome_analysis": pangenome_analysis})

  response = create_datatables_api(GenomeInfo.objects.mongo_aggregate, request.GET, select_pipeline, genome_keys)

  for d in response["data"]:
    x = d.pop(-1)
    cats = []
    if len(x) > 0:
      cats.append(x[0])
    else:
      cats.append("-")
    if len(x) > 1:
      cats.append(x[1])
    else:
      cats.append("-")
    if len(x) > 2:
      cats.append(x[2])
    else:
      cats.append("-")
    d.extend(cats)
  return JsonResponse(response)