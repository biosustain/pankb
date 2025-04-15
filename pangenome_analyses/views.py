from multiprocessing import context
from re import template
from typing import Optional
from urllib import response
from django.http import HttpResponse, Http404, JsonResponse
from django.template import loader
from django.conf import settings

import phylons
from phylons.models import Phylons
from .models import GeneAnnotations
from gene_function.models import GenomeInfo
from organisms.models import Organisms
import json, requests, gzip, time
from common import datatables, csv_export
import sys
from pprint import pprint


################### Overview Page Templates ###################################


# Template renderer for the Pangenome Analyses Overview page
# (data for the info panel on the left is contained in the render context)
def overview(request):
    template = loader.get_template("pangenome_analyses/overview.html")
    species = request.GET["species"]

    try:
        organism_info = Organisms.get_by_pangenome_analysis(
            species,
            ["species", "family", "genomes_num", "gene_class_distribution", "openness"],
        )
    except Organisms.NotFound:
        raise Http404()

    # Compose a context for the template rendering
    context = {"speciesData": organism_info}
    return HttpResponse(template.render(context, request))


# Template renderer for the Heap's Law plot
def heaps_law(request):
    template = loader.get_template("pangenome_analyses/plots/heaps_law.html")
    species = request.GET["species"]
    url = (
        settings.AZURE_WEB_DATA_URL + "species/" + species + "/heaps_law.json"
    )  # the url of the respective json file stored on the Microsoft Azure Blob Storage
    r = requests.get(url)
    json_obj = r.json()
    # Compose a context for the template rendering
    context = {"dataset": json.dumps(json_obj)}
    return HttpResponse(template.render(context, request))


# Template renderer for the Cumulative Gene Frequency plot
def cumulative_freq(request):
    template = loader.get_template("pangenome_analyses/plots/cumulative_freq.html")
    species = request.GET["species"]
    url = (
        settings.AZURE_WEB_DATA_URL + "species/" + species + "/cum_freq.json"
    )  # the url of the respective json file stored on the Microsoft Azure Blob Storage
    r = requests.get(url)
    json_obj = r.json()
    # Compose a context for the template rendering
    context = {"dataset": json.dumps(json_obj)}
    return HttpResponse(template.render(context, request))


# Template renderer for the Gene Annotation Distribution Plot
def gene_annotation_distribution(request):
    template = loader.get_template(
        "pangenome_analyses/plots/gene_annotation_barplot.html"
    )
    species = request.GET["species"]
    url = (
        settings.AZURE_WEB_DATA_URL + "species/" + species + "/COG_distribution.json"
    )  # the url of the respective json file stored on the Microsoft Azure Blob Storage
    r = requests.get(url)
    json_obj = r.json()
    # Compose a context for the template rendering
    context = {"dataset": json.dumps(json_obj)}
    return HttpResponse(template.render(context, request))


# Template renderer for the Gene Frequency Plot
def gene_freq(request):
    template = loader.get_template("pangenome_analyses/plots/gene_freq.html")
    species = request.GET["species"]
    url = (
        settings.AZURE_WEB_DATA_URL + "species/" + species + "/gene_freq.json"
    )  # the url of the respective json file stored on the Microsoft Azure Blob Storage
    r = requests.get(url)
    json_obj = r.json()
    # Compose a context for the template rendering
    context = {"dataset": json.dumps(json_obj)}
    return HttpResponse(template.render(context, request))


# Template renderer for the Presence/Absence Matrix Plot
def hotmap(request):
    template = loader.get_template("pangenome_analyses/plots/hotmap.html")
    species = request.GET["species"]
    gene_class = request.GET["gene_class"]

    genome_info = GenomeInfo.get_genome_and_isolation_info(
        {
            "pangenome_analysis": species,
        }
    )
    source_info = {
        g["genome_id"]: [g["country"], g["isolation_source"], g["strain"]]
        for g in list(genome_info)
    }

    # Compose a context for the template rendering
    context = {
        "dataset": json.dumps(source_info),
        # 'heatmapData': str2
    }
    return HttpResponse(template.render(context, request))


def hotmap_data(request):
    species = request.GET["species"]
    gene_class = request.GET["gene_class"]

    url = (
        settings.AZURE_WEB_DATA_URL
        + "species/"
        + species
        + "/heatmap_"
        + gene_class
        + ".json.gz"
    )
    r = requests.get(url)
    response = HttpResponse(r.content, content_type="application/json")
    response["Content-Encoding"] = "gzip"
    return response


# A view that streams potentially large presence/absence matrices
def download_matrix_csv(request):
    species = request.GET["species"]
    gene_class = request.GET["gene_class"]

    url = (
        settings.AZURE_WEB_DATA_URL
        + "species/"
        + species
        + "/heatmap_"
        + gene_class
        + ".json.gz"
    )  # the url of the respective json.gz file stored on the Microsoft Azure Blob Storage
    r = requests.get(url)

    # Decompress the gzipped content and transform it to a dictionary string
    matrix_dict_str = str(gzip.decompress(r.content), "utf-8")

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
    rows = ([g] + list(map(str, r)) for g, r in zip(genome_names, rows))

    downloaded_file_name = (
        "Matrix__"
        + species
        + "_"
        + gene_class
        + "__"
        + time.strftime("%Y-%m-%d_%H-%M")
        + ".csv"
    )

    response = csv_export.list_writer_response(downloaded_file_name, rows)
    return response


# Template renderer for the first alleleome plot
def variant_dominant_freq(request):
    template = loader.get_template(
        "pangenome_analyses/plots/variant_dominant_frequency.html"
    )
    species = request.GET["species"]
    url = (
        settings.AZURE_WEB_DATA_URL
        + "species/"
        + species
        + "/panalleleome/step_line.json"
    )  # the url of the respective json file stored on the Microsoft Azure Blob Storage
    r = requests.get(url)
    json_obj = r.json()
    # Compose a context for the template rendering
    context = {"dataset": json.dumps(json_obj)}
    return HttpResponse(template.render(context, request))


# Template renderer for the second alleleome plot
def ds_dn_ratio(request):
    template = loader.get_template("pangenome_analyses/plots//dn_ds_ratio.html")
    species = request.GET["species"]
    url = (
        settings.AZURE_WEB_DATA_URL + "species/" + species + "/panalleleome/dn_ds.json"
    )  # the url of the respective csv file stored on the Microsoft Azure Blob Storage
    r = requests.get(url)
    json_obj = r.json()
    # Compose a context for the template rendering
    context = {"dataset": json.dumps(json_obj)}
    return HttpResponse(template.render(context, request))


################### Gene Annotation Page Templates ###################################


# Template renderer for the Gene Annotation Page
# (data for the info panel on the left is contained in the render context)
def gene_annotation(request):
    template = loader.get_template("pangenome_analyses/genes.html")
    species = request.GET["species"]

    try:
        organism_info = Organisms.get_by_pangenome_analysis(
            species,
            ["species", "family", "genomes_num", "gene_class_distribution", "openness"],
        )
    except Organisms.NotFound:
        raise Http404()

    # Compose a context for the template rendering
    context = {
        "speciesData": organism_info,
        "pangenome_analysis": species,
    }
    return HttpResponse(template.render(context, request))


def genome(request):
    template = loader.get_template("pangenome_analyses/genomes.html")
    species = request.GET["species"]

    try:
        organism_info = Organisms.get_by_pangenome_analysis(
            species,
            ["species", "family", "genomes_num", "gene_class_distribution", "openness"],
        )
    except Organisms.NotFound:
        raise Http404()

    # Compose a context for the template rendering
    context = {
        "speciesData": organism_info,
        "pangenome_analysis": species,
    }
    return HttpResponse(template.render(context, request))


# A view that serves the Gene Annotation table content in the .csv format
def download_gene_annotation_table_csv(request):
    species = request.GET.get("species")
    downloaded_file_name = (
        "Gene_annotations__" + species + "__" + time.strftime("%Y-%m-%d_%H-%M") + ".csv"
    )
    fields = [
        "gene",
        "pangenomic_class",
        "cog_category",
        "cog_name",
        "description",
        "protein",
        "pfams",
        "frequency",
    ]

    # Get a table with gene_annotations as a list of dictionaries: ----
    gene_annotations = GeneAnnotations.objects.find(
        {"pangenome_analysis": species},
        fields,
        sort=[("gene", 1)],
    )

    response = csv_export.dict_writer_response(
        downloaded_file_name, fields, gene_annotations
    )
    return response


# A view that serves the Gene Annotation table content in the .csv format
def download_genome_info_table_csv(request):
    species = request.GET.get("species")
    downloaded_file_name = (
        "Genomes__" + species + "__" + time.strftime("%Y-%m-%d_%H-%M") + ".csv"
    )
    genome_keys = [
        "pangenome_analysis",
        "genome_id",
        "strain",
        "phylo_group",
        "genome_len",
        "gc_content",
        "country",
        "isolation_source",
        "iso_cat",
    ]

    genomes = GenomeInfo.get_genome_and_isolation_info(
        {"pangenome_analysis": species}, genome_keys
    )

    response = csv_export.dict_writer_response(
        downloaded_file_name, genome_keys, genomes
    )
    return response

######################### Phylons Pages Templates #######################################

# Template renderer for the Phylons Page (all phylons for a specific pangenome)
def phylons_page(request) -> HttpResponse:
    template = loader.get_template("pangenome_analyses/phylons.html")
    pangenome_analysis = request.GET["species"]

    phylon_ids = Phylons.get_phylon_ids(pangenome_analysis)

    try:
        organism_info = Organisms.get_by_pangenome_analysis(
            pangenome_analysis,
            ["species", "family", "genomes_num", "gene_class_distribution", "openness"],
        )
    except Organisms.NotFound:
        raise Http404()

    # Compose a context for the template rendering
    context = {
        "phylon_ids": phylon_ids, 
        "pangenome_analysis": pangenome_analysis, 
        "speciesData": organism_info
    }
    return HttpResponse(template.render(context, request))

# Template renderer for the Phylon Page (a specific phylon of a pangenome)
def phylon_page(request, phylon_id: str) -> HttpResponse:
    template = loader.get_template("pangenome_analyses/phylon.html")
    pangenome_analysis = request.GET["species"]

    phylon_id = int(phylon_id)

    print(type(request), file=sys.stderr)
    pprint(request, stream=sys.stderr)

    try:
        organism_info = Organisms.get_by_pangenome_analysis(
            pangenome_analysis,
            ["species", "family", "genomes_num", "gene_class_distribution", "openness"],
        )
    except Organisms.NotFound:
        raise Http404()
    
    context = {
        "pangenome_analysis": pangenome_analysis,
        "speciesData": organism_info,
        "phylon_id": phylon_id,
    }
    return HttpResponse(template.render(context, request))

def phylon_weights_matrix_json(request, pangenome_analysis: str, matrix: str) -> JsonResponse:
    if matrix not in ("gene", "genome"):
        raise Http404("Invalid matrix type. Must be 'gene' or 'genome'.")
    
    id_column = "gene" if matrix == "gene" else "genome_id"
    
    start, length = request.GET["start"], request.GET["length"]
    start, length = int(start), int(length)
    
    phylon_weights = Phylons.get_item_to_phylon_weights(pangenome_analysis, matrix)

    columns = [
        {
            "data": 0,
            "name": id_column,
            "search.value": '',
            "searchable": 'true',
        }
    ]

    phylon_ids = phylon_weights[list(phylon_weights.keys())[0]]
    phylon_ids = sorted(list(phylon_ids))

    # i and phylon should be equal in all cases
    for i, phylon in enumerate(phylon_ids):
        columns.append({
            "data": i + 1,
            "name": f'phylon_{phylon}',
            "searchable": False,
        })

    data = []
    for id, phylon_weights in phylon_weights.items():
        entry = [id]
        for phylon_id in phylon_ids:
            entry.append(phylon_weights[phylon_id])
        data.append(entry)
    
    n_entries = len(data)

    if 'order[0][column]' in request.GET.keys() and 'order[0][dir]' in request.GET.keys(): 
        sort_column = int(request.GET['order[0][column]'])
        sort_direction = request.GET['order[0][dir]']
    else:
        sort_column, sort_direction = 0, 'asc'

    data.sort(key=lambda entry: entry[sort_column], reverse=sort_direction == "desc")

    response = {
        "draw": int(request.GET["draw"]) + 1,
        "recordsFiltered": n_entries,
        "recordsTotal": n_entries,
        "columns": columns,
        "data": data[start : start + length],
        "order": [{"column": sort_column, "dir": sort_direction}]
    }

    return JsonResponse(response)
    

def phylon_genome_weights_json(request, pangenome_analysis: str, phylon_id: str) -> JsonResponse:
    # TODO: merge this and with the gene_weights function
    start, length = request.GET["start"], request.GET["length"]
    start, length = int(start), int(length)
    end = start + length
    phylon_id = int(phylon_id)

    # TODO: make datatables API in datatables module
    columns = [
        {
            "data": 0,
            "name": "genome_id",
            "search.value": '',
            "searchable": 'true',
        },
        {
            "data": 1,
            "name": "A_weight",
            "search.value": '',
            "searchable": 'false',
        },
    ]

    weights_by_phylon = Phylons.get_phylon_to_item_weights(pangenome_analysis, "genome")
    genome_weights = weights_by_phylon[phylon_id]

    pprint(genome_weights, stream=sys.stderr)

    table_data = [(genome, weight) for genome, weight in genome_weights.items()]
    table_data.sort(key=lambda tup: tup[1], reverse=True)
    table_data = table_data[start:end]

    datatables_response = {
        "columns": columns,
        "data": table_data,
        "draw": int(request.GET["draw"]) + 1,
        "recordsFiltered": len(genome_weights),
        "recordsTotal": len(genome_weights),
    }

    return JsonResponse(datatables_response)


def phylon_gene_weights_json(request, pangenome_analysis: str, phylon_id: str) -> JsonResponse:
    start, length = request.GET["start"], request.GET["length"]
    start, length = int(start), int(length)
    end = start + length
    phylon_id = int(phylon_id)

    columns = [
        {
            "data": 0,
            "name": "gene",
            "search.value": '',
            "searchable": 'true',
        },
        {
            "data": 1,
            "name": "L_weight",
            "search.value": '',
            "searchable": 'false',
        },
    ]

    weights_by_phylon = Phylons.get_phylon_to_item_weights(pangenome_analysis, "gene")
    gene_weights = weights_by_phylon[phylon_id]

    pprint(gene_weights, stream=sys.stderr)

    table_data = [(gene, weight) for gene, weight in gene_weights.items()]
    table_data.sort(key=lambda tup: tup[1], reverse=True)
    table_data = table_data[start:end]

    datatables_response = {
        "columns": columns,
        "data": table_data,
        "draw": int(request.GET["draw"]) + 1,
        "recordsFiltered": len(gene_weights),
        "recordsTotal": len(gene_weights),
    }

    return JsonResponse(datatables_response)

################### Phylogenetic Tree Page Templates ###################################


# Template renderer for the Phylogenetic tree page
# (data for the info panel on the left is contained in the render context)
def phylogenetic_tree(request):
    template = loader.get_template("pangenome_analyses/phylogenetic_tree.html")
    species = request.GET["species"]

    try:
        organism_info = Organisms.get_by_pangenome_analysis(
            species,
            ["species", "family", "genomes_num", "gene_class_distribution", "openness"],
        )
    except Organisms.NotFound:
        raise Http404()

    # Compose a context for the template rendering
    context = {"speciesData": organism_info}
    return HttpResponse(template.render(context, request))


def get_iso_context(iso_cat, i):
    x = "-"
    if iso_cat and len(iso_cat) > 0:
        x = iso_cat[i]
    if x == "Missing":
        x = "-"
    return x


def make_phylons_strings(genome_phylons_mapping: dict[str, Optional[list[int]]]) -> dict[str, str]:
    def make_phylons_string(phylons_list: Optional[list[int]]) -> str:
        if not phylons_list:
            return "-"
        
        return ", ".join(str(phylon) for phylon in phylons_list)
    
    return {
        genome_id: make_phylons_string(phylons)
        for genome_id, phylons in genome_phylons_mapping.items()
    }


# Template renderer for the Phylogenetic Tree plot subtemplate
def phylotree_plot(request):
    template = loader.get_template("pangenome_analyses/plots/phylotree_plot.html")
    pangenome_analysis = request.GET["species"]

    # the url of the respective json file stored on the Microsoft Azure Blob Storage
    url = settings.AZURE_WEB_DATA_URL + "species/" + pangenome_analysis + "/phylogenetic_tree.newick"

    genome_info_dict = GenomeInfo.get_genome_and_isolation_info(
        {
            "pangenome_analysis": pangenome_analysis,
        }
    )

    genome_phylons_mapping = Phylons.get_genome_phylons(pangenome_analysis)

    genome_phylons_mapping = make_phylons_strings(genome_phylons_mapping)
    
    source_info = {
        g["genome_id"].replace(".", ""): {
            "Country": "-" if g["country"] == "?" else g["country"],
            "Broad Context": get_iso_context(g["iso_cat"], 0),
            "Local Context": get_iso_context(g["iso_cat"], 1),
            "Isolation Source": (
                "-"
                if str(g["isolation_source"]).lower() == "missing"
                else str(g["isolation_source"])
            ),
            "Phylons": genome_phylons_mapping.get(g["genome_id"], "-"),
        }
        for g in genome_info_dict
    }

    r = requests.get(url)

    # Compose a context for the template rendering
    context = {
        "tree_dataset": json.dumps(r.text),
        "source_info_dataset": json.dumps(source_info),
    }
    return HttpResponse(template.render(context, request))


# API for datatables
def gene_annotation_json(request):
    pangenome_analysis = str(request.GET["pangenome_analysis"])
    gene_keys = [
        "gene",
        "pangenomic_class",
        "cog_category",
        "cog_name",
        "description",
        "protein",
        "pfams",
        "gene_phylons",
        "frequency",
    ]        

    db_match = {"$match": {"pangenome_analysis": pangenome_analysis}}

    join_phylons_pipeline = [
       {'$lookup': {'as': 'phylons_data',
                    'from': 'pankb_gene_phylons',
                    'let': {'q_gene': '$gene'},
                    'pipeline': [{'$match': {'$expr': {'$and': [{'$eq': ['$pangenome_analysis',
                                                                         pangenome_analysis]},
                                                                {'$eq': ['$gene',
                                                                         '$$q_gene']}]}}},
                                 {'$project': {'_id': 0, 'phylons': 1}}]}},
    ]

    phylons_field_pipeline = [
        {"$unwind": {"path": "$phylons_data", "preserveNullAndEmptyArrays": True}},
        {"$addFields": {"gene_phylons": "$phylons_data.phylons"}},
        {'$project': {"_id": 0, "phylons_data": 0}},
    ]

    response = datatables.create_datatables_api(
        GeneAnnotations.objects.aggregate,
        request.GET,
        db_match=db_match,
        pre_filter_pipeline=join_phylons_pipeline,
        post_filter_pipeline=phylons_field_pipeline,
        out_keys=gene_keys,
        total_count_only_db_match=True,
    )

    pprint(response, stream=sys.stderr)

    return JsonResponse(response)


def genome_json(request):
    pangenome_analysis = str(request.GET["pangenome_analysis"])
    genome_keys = [
        "genome_id",
        "strain",
        "phylo_group",
        "genome_phylons",
        "genome_len",
        "gc_content",
        "country",
        "isolation_source",
        "iso_cat", # must be last due to the "unwinding" at the end of this function
    ]
    select_pipeline = GenomeInfo.get_genome_and_isolation_info_pipeline(
        {"pangenome_analysis": pangenome_analysis}
    )

    db_match = select_pipeline[0]

    select_pipeline = select_pipeline[1:]

    join_phylons_pipeline = [
       {'$lookup': {'as': 'phylons_data',
                    'from': 'pankb_genome_phylons',
                    'let': {'q_genome_id': '$genome_id'},
                    'pipeline': [{'$match': {'$expr': {'$and': [{'$eq': ['$pangenome_analysis',
                                                                         pangenome_analysis]},
                                                                {'$eq': ['$genome_id',
                                                                         '$$q_genome_id']}]}}},
                                 {'$project': {'_id': 0, 'phylons': 1}}]}},
    ]

    phylons_field_pipeline = [
        {"$unwind": {"path": "$phylons_data", "preserveNullAndEmptyArrays": True}},
        {"$addFields": {"genome_phylons": "$phylons_data.phylons"}},
        {'$project': {"_id": 0, "phylons_data": 0}},
    ]

    response = datatables.create_datatables_api(
        GenomeInfo.objects.aggregate,
        request.GET,
        db_match=db_match,
        out_keys=genome_keys,
        post_filter_pipeline=select_pipeline + join_phylons_pipeline + phylons_field_pipeline,
        total_count_only_db_match=True,
    )

    for d in response["data"]:
        x = d.pop(-1)
        isolation_categories = []
        if len(x) > 0:
            isolation_categories.append(x[0])
        else:
            isolation_categories.append("-")
        if len(x) > 1:
            isolation_categories.append(x[1])
        else:
            isolation_categories.append("-")
        if len(x) > 2:
            isolation_categories.append(x[2])
        else:
            isolation_categories.append("-")
        d.extend(isolation_categories)

    return JsonResponse(data=response)
