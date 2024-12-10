from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.template import loader
from organisms.models import Organisms
from pangenome_analyses.models import GeneAnnotations
from gene_function.models import PathwayInfo
import json
import re


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


# View: Search Results Page
def search_results(request):
    template = loader.get_template("search/search_results.html")
    # Get the query string from the URL: ----
    q_orig = request.GET.get("q")
    # Clean the query string: ----
    q = re.sub(
        r"[^A-Za-z0-9-_\s]+", "", q_orig
    )  # remove all symbols except letters, digits, underscores, dashes, whitespaces
    q = q.strip()  # remove the leading and trailing spaces from the query string
    q = " ".join(q.split())  # remove duplicated whitespaces from the query string

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
    # if not genes:
    #     no_results_list.append("genes")

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

# JSON data for gene datatable
def gene_annotation_json(request):
    q = str(request.GET["q"])

    q = re.sub(
        r"[^A-Za-z0-9-_\s]+", "", q
    )  # remove all symbols except letters, digits, underscores, dashes, whitespaces
    q = q.strip()  # remove the leading and trailing spaces from the query string
    q = " ".join(q.split())  # remove duplicated whitespaces from the query string

    # Get the filtered genes from the DB: ----
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
    genes = list(
        GeneAnnotations.objects.aggregate(
            build_multi_search_aggregation(q, ["gene", "protein", "pfams"])
            + [{"$project": {gk: int(gk != "_id") for gk in ["_id"] + gene_keys}}]
        )
    )
    genes = [[g.get(gk, None) for gk in gene_keys] for g in genes]
    return JsonResponse({"results": genes})