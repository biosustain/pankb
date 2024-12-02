from django.shortcuts import render
from django.http import HttpResponse, Http404
from django.template import loader
from django.urls import reverse
from django.conf import settings
import json, requests, io, csv, time
import pandas as pd
import numpy as np
from .models import GeneInfo, GenomeInfo, PathwayInfo
from organisms.models import Organisms
from pangenome_analyses.models import GeneAnnotations
from django.db.models import Q
from functools import reduce
from django.forms.models import model_to_dict


################################## Gene Info Page Templates ###################################

# Template renderer for the Gene Info Page
def gene_info(request):
  template = loader.get_template('gene_function/gene_info.html')
  species = request.GET['species']
  gene = request.GET['gene']

  pw_agg = GeneAnnotations.objects.mongo_aggregate([
    {
      "$match": {"gene" : gene, "pangenome_analysis": species}
    },
    {
      "$lookup":
        {
          "from": "pankb_pathway_info",
          "localField": "kegg_pathway",
          "foreignField": "pathway_id",
          "as": "pathway_info"
        }
   },
   {
    "$project": {"_id": 0, "pathway_info.genes": 0, "pathway_info._id": 0}
   }
  ])
  pw_agg = list(pw_agg)
  if len(pw_agg) == 0:
    raise Http404()
  pw_agg = pw_agg[0]

  if pw_agg.get("kegg_ko", False):
    pw_agg["kegg_ko_link"] = '/' + '/'.join(pw_agg["kegg_ko"])
  else:
    pw_agg["kegg_ko_link"] = ''

  # Set the filter() function parameters: ----
  filter_params = {}
  filter_params['pangenome_analysis'] = species
  filter_params['gene'] = gene
  # Obtain the gene info: ----
  gene_info = GeneInfo.objects.filter(**filter_params).values()
  gene_info = list(gene_info)

  imodulon_info = []

  for g in gene_info:
    del g["_id"]
    if "imodulon_data" in g and not g["imodulon_data"] is None:
      im_data = g["imodulon_data"]
      for m in im_data:
        m["genome_id"] = g["genome_id"]
      imodulon_info.extend(im_data)
    del g["imodulon_data"]

  # # Transform the df to a list of dictionaries: ----
  # gene_info_dict = gene_info_pd.to_dict(orient = "records")
  gene_info_json = json.dumps(gene_info, default = str)  # json dumps replaces the single quotes with the double ones

  deferred_msa_load = pw_agg["frequency"] > 200

  # Compose a context for the template rendering: ----
  context = {
    'dataset': gene_info_json,
    # 'pangene_info': pangene_info_dict,
    'imodulon_info': imodulon_info,
    'pangene_info': pw_agg,
    'deferred_msa_load': deferred_msa_load,
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

  organism_info = Organisms.objects.get(pangenome_analysis=species)
  num_genomes = organism_info.genomes_num

  url2 = settings.AZURE_WEB_DATA_URL + 'species/' + species + '/panalleleome/gene_data/' + gene + '/' + gene + '_pan_aa_thresh_core_dom_var_pos.csv'    # the url of the respective csv file stored on the Microsoft Azure Blob Storage
  r2 = requests.get(url2)
  if r2.status_code == requests.codes.ok:
    dataset_df2 = pd.read_csv(io.StringIO(r2.content.decode('utf-8')))
    dataset_dict2 = dataset_df2.to_dict(orient='records')
  else:
    dataset_dict2 = []

  # Compose a context for the template rendering: ----
  context = {
    'num_genomes': num_genomes,
    'dataset': json.dumps(dataset_dict2)
  }
  return HttpResponse(template.render(context, request))


# Template renderer for the MSA plot
def msa(request):
  template = loader.get_template('gene_function/plots/MSA.html')
  species = request.GET['species']
  gene = request.GET['gene']

  url1 = settings.AZURE_WEB_DATA_URL + 'species/' + species + '/panalleleome/gene_data/' + gene + '/AA_freq.json'    # the url of the respective json file stored on the Microsoft Azure Blob Storage
  r1 = requests.get(url1)
  if r1.status_code == requests.codes.ok:
    json_obj1 = r1.json()
  else:
    json_obj1 = {}

  url2 = settings.AZURE_WEB_DATA_URL + 'species/' + species + '/panalleleome/gene_data/' + gene +'/MSA.fasta'    # the url of the respective json file stored on the Microsoft Azure Blob Storage
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

def _get_genome_and_isolation_info(pangenome_analysis, genome_id):
  genome_info_dict = GenomeInfo.get_genome_and_isolation_info({
          "pangenome_analysis": pangenome_analysis,
          "genome_id": genome_id
        })
  genome_info_dict = list(genome_info_dict)
  if len(genome_info_dict) == 0:
    raise Http404()
  genome_info_dict = genome_info_dict[0]

  genome_info_dict["num_genes"] = sum(genome_info_dict["gene_class_distribution"])
  return genome_info_dict

############################## Genome Info Page Templates ###################################
# Template renderer for the Genome Info Page
def genome_info(request):
  template = loader.get_template('gene_function/genome_info.html')
  species = request.GET['species']
  genome_id = request.GET['genome_id']

  genome_info_dict = _get_genome_and_isolation_info(species, genome_id)

  # Obtain the gene info: ----
  gene_info = GeneInfo.objects.filter(pangenome_analysis=species, genome_id=genome_id).values('gene', 'locus_tag', 'pangenome_analysis', 'genome_id', 'original_locus_tag', 'original_gene', 'original_exact_match', 'protein', 'start_position', 'end_position', 'nucleotide_seq', 'aminoacid_seq')
  gene_info = list(gene_info)

  # Compose a context for the template rendering: ----
  context = {
    'dataset': json.dumps(gene_info),
    'dataGenome': genome_info_dict,
    'antismash_url': '' if not genome_info_dict.get("antismash_url", False) else genome_info_dict["antismash_url"]
  }
  return HttpResponse(template.render(context, request))


# Template renderer for the Gene Annotation Distribution barplot of genes in a genome
def genome_barplot(request):
  template = loader.get_template('gene_function/plots/genome_barplot.html')
  species = request.GET['species']
  genome_id = request.GET['genome_id']
  url = settings.AZURE_WEB_DATA_URL + 'species/' + species + '/genome_page/' + genome_id + '/COG_distribution.json'    # the url of the respective json file stored on the Microsoft Azure Blob Storage
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
  gene = request.GET['gene']

  genome_info_dict = _get_genome_and_isolation_info(species, genome_id)

  gene_info = GeneInfo.objects.filter(pangenome_analysis=species, genome_id=genome_id, gene=gene).values('locus_tag', 'genome_id', 'gene', 'protein', 'start_position', 'end_position', 'nucleotide_seq', 'aminoacid_seq', 'species', 'pangenome_analysis', 'original_locus_tag', 'original_gene', 'original_exact_match')
  if len(gene_info) == 0:
    raise Http404()
  gene_info = list(gene_info)

  # Compose a context for the template rendering: ----
  context = {
    'dataGenome': genome_info_dict,
    'dataGene': gene_info,
    'gene_id': gene,
  }
  return HttpResponse(template.render(context, request))


################################ Pathway Info Page Templates ###################################
def pathway_info(request):
  template = loader.get_template('gene_function/pathway_info.html')
  pathway_id = request.GET['pathway_id']

  try:
    pathway_info = PathwayInfo.objects.get(pathway_id=pathway_id)
  except PathwayInfo.DoesNotExist:
    raise Http404()
  pathway_info_dict = model_to_dict(pathway_info, exclude=["_id"])
  pathway_kegg_link = f"https://www.kegg.jp/pathway/{pathway_info.pathway_id}"

  # Obtain info about the pathway genes: ----
  pa_genes = pathway_info_dict["genes"]
  genes_info = []
  for i in range(0, len(pa_genes), 5000):
    g = GeneAnnotations.objects.mongo_find({"pa_gene": {"$in": pa_genes[i:min((i+1)*5000, len(pa_genes))]}}, {"_id": 0, "pa_gene": 0, "brite": 0, "ec": 0, "kegg_reaction": 0, "kegg_module": 0, "kegg_tc": 0, "pfams": 0, "kegg_pathway": 0, "eggnog_ogs": 0, "cazy": 0, "cog_category": 0, "cog_name": 0, "description": 0, "frequency": 0})
    genes_info.extend(g)

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