from django.http import HttpResponse, Http404, JsonResponse
from django.template import loader
from django.conf import settings
from .models import GeneAnnotations
from gene_function.models import GenomeInfo
from organisms.models import Organisms
import json, requests, gzip, time
from common import datatables, csv_export


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

    response = csv_export.dict_writer_response(downloaded_file_name, fields, gene_annotations)
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

    response = csv_export.dict_writer_response(downloaded_file_name, genome_keys, genomes)
    return response


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


# Template renderer for the Phylogenetic Tree plot subtemplate
def phylotree_plot(request):
    template = loader.get_template("pangenome_analyses/plots/phylotree_plot.html")
    species = request.GET["species"]

    url = (
        settings.AZURE_WEB_DATA_URL + "species/" + species + "/phylogenetic_tree.newick"
    )  # the url of the respective json file stored on the Microsoft Azure Blob Storage

    genome_info_dict = GenomeInfo.get_genome_and_isolation_info(
        {
            "pangenome_analysis": species,
        }
    )
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
        "cog_category",
        "cog_name",
        "description",
        "protein",
        "pfams",
        "frequency",
        "pangenomic_class",
        "pangenome_analysis",
    ]
    select_pipeline = [{"$match": {"pangenome_analysis": pangenome_analysis}}]

    response = datatables.create_datatables_api(
        GeneAnnotations.objects.aggregate, request.GET, select_pipeline, gene_keys
    )

    return JsonResponse(response)


def genome_json(request):
    pangenome_analysis = str(request.GET["pangenome_analysis"])
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
    select_pipeline = GenomeInfo.get_genome_and_isolation_info_pipeline(
        {"pangenome_analysis": pangenome_analysis}
    )

    response = datatables.create_datatables_api(
        GenomeInfo.objects.aggregate, request.GET, select_pipeline, genome_keys
    )

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
