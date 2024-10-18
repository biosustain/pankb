from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader
from django.urls import reverse
import json, requests, io, csv, time
import pandas as pd
import numpy as np
from .models import GeneInfo, GenomeInfo, PathwayInfo
from pangenome_analyses.models import GeneAnnotations
from django.db.models import Q
from functools import reduce
from django.forms.models import model_to_dict
import operator


################################## Gene Info Page Templates ###################################

# Template renderer for the Gene Info Page
def gene_info(request):
  template = loader.get_template('gene_function/gene_info.html')
  species = request.GET['species']
  gene = request.GET['gene']

  pangene_info = GeneAnnotations.objects.get(gene=gene, pangenome_analysis=species)
  pangene_info_dict = model_to_dict(pangene_info, exclude=["_id"])

  pathways_string = []
  for pathway in pangene_info_dict.get("kegg_pathway", []):
    kegg_link = f"https://www.kegg.jp/kegg-bin/show_pathway?{pathway}"
    if pangene_info_dict.get("kegg_ko", False):
      kegg_link = kegg_link  + '/' + '/'.join(pangene_info_dict["kegg_ko"])
    pathways_string.append(f'<a href="{reverse('pathway_info')}?pathway_id={pathway}">{pathway}</a> <a href="{kegg_link}" target="_blank">(KEGG)</a>')
  pathways_string = ', '.join(pathways_string)
  if len(pathways_string) > 0:
    pathways_string = f'<p style="font-size: 0.9rem"><b>KEGG Pathways:</b><br />{pathways_string}</p>'
  pangene_info_dict["pathways_string"] = pathways_string

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

  # Leave only the columns of interest in the output: ----
  gene_info_pd = gene_info_pd[["locus_tag", "genome_id", "protein", "start_position", "end_position", "nucleotide_seq", "aminoacid_seq"]] #, "pathways"

  # Transform positions of the gene in the genome from float (as the start and end position are stored in the MongoDB) to int: ----
  gene_info_pd["start_position"] = gene_info_pd["start_position"].astype(np.int64)
  gene_info_pd["end_position"] = gene_info_pd["end_position"].astype(np.int64)
  # ... and sort by the positions: ----
  gene_info_pd = gene_info_pd.sort_values(by=['start_position', 'end_position'])

  # Transform the df to a list of dictionaries: ----
  gene_info_dict = gene_info_pd.to_dict(orient = "records")
  gene_info_json = json.dumps(gene_info_dict, default = str)  # json dumps replaces the single quotes with the double ones

  # Compose a context for the template rendering: ----
  context = {
    'dataset': gene_info_json,
    'pangene_info': pangene_info_dict,
  }
  return HttpResponse(template.render(context, request))



# A view that serves the Gene Info table content in the .csv format
def download_gene_info_table_csv(request):
  species = request.GET.get('species')
  gene = request.GET.get('gene')
  downloaded_file_name = "Gene_Info__" + species + "__" + gene + "__" + time.strftime("%Y-%m-%d_%H-%M") + ".csv"

  # Set the filter() function parameters: ----
  filter_params = {}
  filter_params['pangenome_analysis'] = species
  filter_params['gene'] = gene
  # Obtain the gene info: ----
  gene_info = GeneInfo.objects.filter(**filter_params).values()
  # Transform the data to the dataframe first and remove a columns with ids (not needed in the output): ----
  gene_info_pd = pd.DataFrame(list(gene_info), index=None)
  del gene_info_pd['_id']

  # Obtain the list of all genomes containing the given gene: ----
  genome_ids_list = list(set(gene_info_pd["genome_id"]))

  # Leave only the columns of interest in the output: ----
  gene_info_pd = gene_info_pd[["locus_tag", "genome_id", "protein", "start_position", "end_position", "nucleotide_seq", "aminoacid_seq"]]

  # Transform positions of the gene in the genome from float (as the start and end position are stored in the MongoDB) to int: ----
  gene_info_pd["start_position"] = gene_info_pd["start_position"].astype(np.int64)
  gene_info_pd["end_position"] = gene_info_pd["end_position"].astype(np.int64)
  # ... and sort by the positions: ----
  gene_info_pd = gene_info_pd.sort_values(by=['start_position', 'end_position'])

  # Transform the df to a list of dictionaries
  # (the list of dictionaries will serve as the input to csv.DictWriter): ----
  gene_info_dict = gene_info_pd.to_dict(orient = "records")

  # Create the HttpResponse object with the appropriate CSV header.
  response = HttpResponse(content_type="text/csv")
  response['Content-Disposition'] = f"attachment; filename=" + downloaded_file_name
  writer = csv.DictWriter(response, fieldnames=["locus_tag", "genome_id", "protein", "start_position", "end_position", "nucleotide_seq", "aminoacid_seq"])
  writer.writeheader()
  writer.writerows(gene_info_dict)
  return response



# Template renderer for the Dominant and Variant Amino Acid Position Overview of a gene
def aa_pos_overview(request):
  template = loader.get_template('gene_function/plots/gene_AA_pos_overview.html')
  species = request.GET['species']
  gene = request.GET['gene']

  url1 = 'https://pankb.blob.core.windows.net/data/PanKB/web_data/species/' + species + '/info_panel.json'    # the url of the respective json file stored on the Microsoft Azure Blob Storage
  r1 = requests.get(url1)
  json_obj1 = r1.json()

  url2 = 'https://pankb.blob.core.windows.net/data/PanKB/web_data/species/' + species + '/panalleleome/gene_data/' + gene + '/' + gene + '_pan_aa_thresh_core_dom_var_pos.csv'    # the url of the respective csv file stored on the Microsoft Azure Blob Storage
  r2 = requests.get(url2)
  if r2.status_code == requests.codes.ok:
    dataset_df2 = pd.read_csv(io.StringIO(r2.content.decode('utf-8')))
    dataset_dict2 = dataset_df2.to_dict(orient='records')
  else:
    dataset_dict2 = []

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

  url1 = 'https://pankb.blob.core.windows.net/data/PanKB/web_data/species/' + species + '/panalleleome/gene_data/' + gene + '/AA_freq.json'    # the url of the respective json file stored on the Microsoft Azure Blob Storage
  r1 = requests.get(url1)
  if r1.status_code == requests.codes.ok:
    json_obj1 = r1.json()
  else:
    json_obj1 = {}

  url2 = 'https://pankb.blob.core.windows.net/data/PanKB/web_data/species/' + species + '/panalleleome/gene_data/' + gene +'/MSA.fasta'    # the url of the respective json file stored on the Microsoft Azure Blob Storage
  r2 = requests.get(url2)
  if r2.status_code == requests.codes.ok:
    r2_text = r2.text
  else:
    r2_text = ""
  # Compose a context for the template rendering: ----
  context = {
    'AAData': json.dumps(json_obj1),
    'msaData': json.dumps(r2_text)
  }
  return HttpResponse(template.render(context, request))


############################## Genome Info Page Templates ###################################
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



################################## Genome & Gene Info Page Templates ###################################

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
      ", ".join(list("<a href='/gene_function/pathway_info/?pathway_id=" + pathway_info_pd["pathway_id"] + "'>" + pathway_info_pd["pathway_name"] + "</a>")))
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


################################ Pathway Info Page Templates ###################################
def pathway_info(request):

  template = loader.get_template('gene_function/pathway_info.html')
  pathway_id = request.GET['pathway_id']

  pathway_info = PathwayInfo.objects.get(pathway_id=pathway_id)
  pathway_info_dict = model_to_dict(pathway_info, exclude=["_id", "genes"])
  pathway_kegg_link = f"https://www.kegg.jp/pathway/{pathway_info.pathway_id}"

  filter_params = (Q(pangenome_analysis=g["pangenome_analysis"], gene=g["gene"]) for g in pathway_info.genes)
  filter_params = reduce(operator.or_, filter_params)

  # Obtain info about the pathway genes: ----
  genes_info = GeneAnnotations.objects.filter(filter_params).values('gene', "pangenome_analysis", 'species', 'family', "protein", "pangenomic_class", "kegg_ko").order_by('gene')
  genes_info = list(genes_info)
  for d in genes_info:
    kegg_link = f"https://www.kegg.jp/kegg-bin/show_pathway?{pathway_id}"
    if d["kegg_ko"]:
      kegg_link = kegg_link  + '/' + '/'.join(d["kegg_ko"])
    d["kegg_link"] = kegg_link

  # Substitute the index with our own: ----
  pathway_info_json = json.dumps(pathway_info_dict, default=str)  # json dumps replaces the single quotes with the double ones
  genes_info_json = json.dumps(genes_info, default=str)

  # Compose a context for the template rendering: ----
  context = {
    'pathway_name': pathway_info.pathway_name,
    'pathway_id': pathway_info.pathway_id,
    'pathway_kegg_link': pathway_kegg_link,
    'dataGenes': genes_info_json
  }
  return HttpResponse(template.render(context, request))