from django.http import HttpResponse, JsonResponse
from django.template import loader
from organisms.models import Organisms
from pangenome_analyses.models import GeneAnnotations
from gene_function.models import PathwayInfo, GenomeInfo
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
    q_orig = request.GET.get("q", "")
    q = clean_query(q_orig) if q_orig else ""
    
    country_code = request.GET.get("country_code", "")  # ISO2 code from map
    # if country_code is provided (from map click), only query genomes
    if country_code:
        families = []
        species = []
        pathways = []
        genes = []
    elif len(q) >= 2:
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
        
    if country_code:
        no_results_list.append("genes")

    # Compose the render context: ----
    context = {
        "families_results": families,
        "species_results": species,
        "pathways_results": pathways,
        "genes_results": json.dumps(genes),
        "no_results_list": no_results_list,
        "q": q,
        "country_code": country_code,
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


def download_search_genomes_csv(request):
    q_orig = request.GET.get("q")
    q = clean_query(q_orig)
    genome_keys = [
        "pangenome_analysis",
        "genome_id",
        "species",
        "strain",
        "phylo_group",
        "gc_content",
        "country",
        "broad_context",
        "local_context",
        "extra_context",
        "isolation_source",
    ]
    if len(q) >= 2 and not re.search(
        q, "Missing", flags=re.IGNORECASE
    ):  # Prevent too many results:
        genomes = GenomeInfo.objects.aggregate(
            GenomeInfo.get_genome_and_isolation_info_pipeline({})
            + build_multi_search_aggregation(
                q, ["genome_id", "strain", "country", "iso_cat", "isolation_source"]
            )
            + [
                {
                    "$addFields": {
                        "broad_context": {"$arrayElemAt": ["$iso_cat", 0]},
                        "local_context": {"$arrayElemAt": ["$iso_cat", 1]},
                        "extra_context": {"$slice": ["$iso_cat", 2, 10]},
                    }
                },
                {"$project": {gk: int(gk != "_id") for gk in ["_id"] + genome_keys}},
            ]
        )
    else:
        genomes = []
    downloaded_file_name = (
        "Search__genomes__" + time.strftime("%Y-%m-%d_%H-%M") + ".csv"
    )
    response = csv_export.dict_writer_response(
        downloaded_file_name, genome_keys, genomes
    )
    return response


# JSON data for gene datatable
def gene_annotation_json(request):
    q_orig = str(request.GET["q"])
    q = clean_query(q_orig)

    gene_keys = [
        "gene",
        "species",
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

# JSON data for genome datatable
def genomes_json(request):
    q_orig = str(request.GET.get("q", ""))
    q = clean_query(q_orig)
    country_code = request.GET.get("country_code", "")  # ISO2 code from map

    genome_keys = [
        "pangenome_analysis",
        "genome_id",
        "species",
        "strain",
        "phylo_group",
        "gc_content",
        "country",
        "broad_context",
        "local_context",
        "extra_context",
        "isolation_source",
    ]

    # if country_code, use country_iso2 to conduct exact match
    if country_code:
        genomes = GenomeInfo.objects.aggregate(
            GenomeInfo.get_genome_and_isolation_info_pipeline({})
            + [
                {"$match": {"country_iso2": {"$regex": f"^{country_code}$", "$options": "i"}}},
                {
                    "$addFields": {
                        "broad_context": {"$arrayElemAt": ["$iso_cat", 0]},
                        "local_context": {"$arrayElemAt": ["$iso_cat", 1]},
                        "extra_context": {"$slice": ["$iso_cat", 2, 10]},
                    }
                },
                {"$project": {gk: int(gk != "_id") for gk in ["_id"] + genome_keys}},
            ]
        )
        genomes = [
            [
                (str(g.get(gk, None)) if gk == "strain" else g.get(gk, None))
                for gk in genome_keys
            ]
            for g in genomes
        ]
    elif len(q) >= 2 and not re.search(
        q, "Missing", flags=re.IGNORECASE
    ):  # Prevent too many results
        genomes = GenomeInfo.objects.aggregate(
            GenomeInfo.get_genome_and_isolation_info_pipeline({})
            + build_multi_search_aggregation(
                q, ["genome_id", "strain", "country", "iso_cat", "isolation_source"]
            )
            + [
                {
                    "$addFields": {
                        "broad_context": {"$arrayElemAt": ["$iso_cat", 0]},
                        "local_context": {"$arrayElemAt": ["$iso_cat", 1]},
                        "extra_context": {"$slice": ["$iso_cat", 2, 10]},
                    }
                },
                {"$project": {gk: int(gk != "_id") for gk in ["_id"] + genome_keys}},
            ]
        )
        genomes = [
            [
                (str(g.get(gk, None)) if gk == "strain" else g.get(gk, None))
                for gk in genome_keys
            ]
            for g in genomes
        ]
    else:
        genomes = []

    return JsonResponse({"results": genomes})
