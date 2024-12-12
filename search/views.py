from django.http import HttpResponse, JsonResponse
from django.template import loader
from organisms.models import Organisms
from pangenome_analyses.models import GeneAnnotations
from gene_function.models import PathwayInfo
from common import csv_export
import json, time, re


def build_multi_search_aggregation(expression, fields):
    facets = {
        f"{field}_match": [
            {"$match": {field: {"$regex": expression, "$options": "i"}}},
            {"$addFields": {"priority": i}},
        ]
        for i, field in enumerate(fields)
    }
    return [
        {"$facet": facets},
        {
            "$project": {
                "results": {"$setUnion": [f"${field}_match" for field in fields]}
            }
        },
        {"$unwind": {"path": "$results"}},
        {"$replaceRoot": {"newRoot": "$results"}},
        {"$sort": {"priority": 1}},
    ]


def clean_query(q):
    q = re.sub(
        r"[^A-Za-z0-9-_\s]+", "", q
    )  # remove all symbols except letters, digits, underscores, dashes, whitespaces
    q = q.strip()  # remove the leading and trailing spaces from the query string
    q = " ".join(q.split())  # remove duplicated whitespaces from the query string
    return q


# View: Search Results Page
def search_results(request):
    template = loader.get_template("search/search_results.html")
    # Get the query string from the URL: ----
    q_orig = request.GET.get("q")
    q = clean_query(q_orig)

    if (
        len(q) >= 2
    ):  # only if the cleaned query string length > 2 symbols, perform the DB searches: ----
        # Get the filtered organism families from the DB: ----
        families = list(
            Organisms.objects.find(
                {"family": {"$regex": q, "$options": "i"}}, {"_id": 0, "family": 1}
            ).distinct("family")
        )

        # Get the filtered species from the DB: ----
        species = list(
            Organisms.objects.find(
                {"species": {"$regex": q, "$options": "i"}},
                {"_id": 0, "species": 1, "family": 1, "pangenome_analysis": 1},
            )
        )

        # Get the filtered pathways from the DB: ----
        pathways = list(
            PathwayInfo.objects.aggregate(
                build_multi_search_aggregation(q, ["pathway_id", "pathway_name"])
                + [{"$project": {"_id": 0, "pathway_id": 1, "pathway_name": 1}}]
            )
        )
        genes = []

    else:  # if the cleaned query string is too short or not set, just return the empty DFs: ----
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

    # Compose the render context: ----
    context = {
        "families_results": families,
        "species_results": species,
        "pathways_results": pathways,
        "genes_results": json.dumps(genes),
        "no_results_list": no_results_list,
        "q": q,
    }
    return HttpResponse(template.render(context, request))


def download_search_family_csv(request):
    q_orig = request.GET.get("q")
    q = clean_query(q_orig)
    if (
        len(q) >= 2
    ):  # only if the cleaned query string length > 2 symbols, perform the DB searches: ----
        # Get the filtered organism families from the DB: ----
        families = Organisms.objects.find(
            {"family": {"$regex": q, "$options": "i"}}, ["family"]
        ).distinct("family")
        families = [[f] for f in families]
    else:
        families = []
    downloaded_file_name = (
        "Search__families__" + time.strftime("%Y-%m-%d_%H-%M") + ".csv"
    )
    response = csv_export.list_writer_response(
        downloaded_file_name, [["family"]] + families
    )
    return response


def download_search_species_csv(request):
    q_orig = request.GET.get("q")
    q = clean_query(q_orig)
    fields = ["species", "family"]
    if (
        len(q) >= 2
    ):  # only if the cleaned query string length > 2 symbols, perform the DB searches: ----
        # Get the filtered organism families from the DB: ----
        species = Organisms.objects.find(
            {"species": {"$regex": q, "$options": "i"}},
            fields,
        )
    else:
        species = []
    downloaded_file_name = (
        "Search__species__" + time.strftime("%Y-%m-%d_%H-%M") + ".csv"
    )
    response = csv_export.dict_writer_response(downloaded_file_name, fields, species)
    return response


def download_search_pathway_csv(request):
    q_orig = request.GET.get("q")
    q = clean_query(q_orig)
    fields = ["pathway_id", "pathway_name"]
    if len(q) >= 2:
        projection = {f: 1 for f in fields}
        projection["_id"] = 0
        pathways = PathwayInfo.objects.aggregate(
            build_multi_search_aggregation(q, ["pathway_id", "pathway_name"])
            + [{"$project": projection}]
        )
    else:
        pathways = []
    downloaded_file_name = (
        "Search__pathways__" + time.strftime("%Y-%m-%d_%H-%M") + ".csv"
    )
    response = csv_export.dict_writer_response(downloaded_file_name, fields, pathways)
    return response


def download_search_genes_csv(request):
    q_orig = request.GET.get("q")
    q = clean_query(q_orig)
    gene_keys = [
        "gene",
        "species",
        "family",
        "cog_category",
        "cog_name",
        "description",
        "protein",
        "pfams",
        "frequency",
        "pangenomic_class",
    ]
    if len(q) >= 2:
        genes = GeneAnnotations.objects.aggregate(
            build_multi_search_aggregation(q, ["gene", "protein", "pfams"])
            + [{"$project": {gk: int(gk != "_id") for gk in ["_id"] + gene_keys}}]
        )
    else:
        genes = []
    downloaded_file_name = "Search__genes__" + time.strftime("%Y-%m-%d_%H-%M") + ".csv"
    response = csv_export.dict_writer_response(downloaded_file_name, gene_keys, genes)
    return response


# JSON data for gene datatable
def gene_annotation_json(request):
    q_orig = str(request.GET["q"])
    q = clean_query(q_orig)

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
    if len(q) >= 2:
        genes = list(
            GeneAnnotations.objects.aggregate(
                build_multi_search_aggregation(q, ["gene", "protein", "pfams"])
                + [{"$project": {gk: int(gk != "_id") for gk in ["_id"] + gene_keys}}]
            )
        )
        genes = [[g.get(gk, None) for gk in gene_keys] for g in genes]
    else:
        genes = []
    return JsonResponse({"results": genes})
