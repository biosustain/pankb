import json
import logging

from django.conf import settings
from django.db.models import Q
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from gene_function.models import GeneInfo, GenomeInfo
from pangenome_analyses.models import GeneAnnotations

logger = logging.getLogger(__name__)

@csrf_exempt
@require_http_methods(["GET"])
def genes(request):
    """Return all genes with URLs for InteropDB bulk ingest."""
    try:
        gene_list = GeneAnnotations.get_all_genes()
        # Return list of dicts with gene name and URL
        result = []
        for gene_data in gene_list:
            gene = gene_data.get("gene")
            species = gene_data.get("pangenome_analysis")
            if gene and species:
                result.append({
                    "gene": gene,
                    "species": species,
                    "url": f"{settings.PANKB_BASE_URL}/gene_function/gene_info/?species={species}&gene={gene}"
                })
        return JsonResponse(result, safe=False)
    except Exception as e:
        logger.exception("list_all_genes failed")
        return JsonResponse({"message": f"Error: {e}"}, status=500)


@csrf_exempt
@require_http_methods(["GET"])
def strains(request):
    """Return all strains (genomes) with URLs for InteropDB bulk ingest."""
    try:
        strain_ids = GenomeInfo.get_all_strains()
        # Return list of dicts with strain ID and URL
        result = []
        for strain_id in strain_ids:
            result.append({
                "strain": strain_id,
                "url": f"{settings.PANKB_BASE_URL}/gene_function/genome_info/?genome_id={strain_id}"
            })
        return JsonResponse(result, safe=False)
    except Exception as e:
        logger.exception("list_all_strains failed")
        return JsonResponse({"message": f"Error: {e}"}, status=500)


@csrf_exempt
@require_http_methods(["GET"])
def gene_strain_pairs(request):
    """
    Return distinct (gene, strain) pairs with URLs for InteropDB.

    Query params:
        skip: number of records to skip (default 0)
        limit: max records to return (default 10000, max 50000)

    Response:
        {
            "pairs": [...],
            "total": 22000000,
            "skip": 0,
            "limit": 10000,
            "has_more": true
        }
    """
    try:
        skip = int(request.GET.get("skip", 0))
        limit = min(int(request.GET.get("limit", 10000)), 50000)  # Max 50k per request

        result = GeneInfo.get_gene_strain_pairs_paginated(skip=skip, limit=limit)
        pairs = result["pairs"]

        # Add URLs to pairs (use locus_tag for unique identification)
        for pair in pairs:
            gene = pair.get("gene")
            strain = pair.get("strain")
            locus_tag = pair.get("locus_tag")
            if gene and strain and locus_tag:
                pair["url"] = f"{settings.PANKB_BASE_URL}/gene_function/genome_gene_info/?genome_id={strain}&gene={gene}&locus_tag={locus_tag}"

        return JsonResponse({
            "pairs": pairs,
            "total": result["total"],
            "skip": skip,
            "limit": limit,
            "has_more": skip + len(pairs) < result["total"]
        })
    except Exception as e:
        logger.exception("get_gene_strain_pairs failed")
        return JsonResponse({"message": f"Error: {e}"}, status=500)


@csrf_exempt
@require_http_methods(["POST"])
def query_by_pair(request):
    logger.info("query by pair")
    try:
        data = json.loads(request.body or "{}")
        pairs = data.get("pairs", [])
        if isinstance(pairs, dict):
            pairs = [pairs]

        if not pairs:
            return JsonResponse({
                "count": 0,
                "message": "No gene/strain pairs provided"
            })

        clean_pairs = [
            {"gene": p["gene"], "genome_id": p["strain"]}
            for p in pairs
            if "gene" in p and "strain" in p
        ]
        if not clean_pairs:
            return JsonResponse({
                "count": 0,
                "message": "Each pair must contain both 'gene' and 'strain'"
            })

        genes = {p["gene"] for p in clean_pairs}

        try:
            ga_pairs = GeneAnnotations.get_gene_analysis_pairs(list(genes))
            # make a quick lookup: gene ➜ set(pangenome_analysis)
            gene_to_analyses = {}
            for g, a in ga_pairs:
                gene_to_analyses.setdefault(g, set()).add(a)
        except GeneAnnotations.NotFound:
            return JsonResponse([], safe=False)

        query = []
        for p in clean_pairs:
            analyses = gene_to_analyses.get(p["gene"])
            if analyses:
                for analysis in analyses:
                    query.append({
                        "gene": p["gene"],
                        "pangenome_analysis": analysis,
                        "genome_id": p["genome_id"]
                    })

        if not query:
            return JsonResponse([], safe=False)

        results = GeneInfo.get_by_gene_analysis_genome(query)
        for item in results:
            genome_id = item.get("genome_id")
            gene = item.get("gene")
            locus_tag = item.get("locus_tag")
            if genome_id and gene and locus_tag:
                item["url"] = f"{settings.PANKB_BASE_URL}/gene_function/genome_gene_info/?genome_id={genome_id}&gene={gene}&locus_tag={locus_tag}"
        return JsonResponse(results, safe=False)

    except json.JSONDecodeError:
        return JsonResponse({"message": "Invalid JSON"}, status=400)
    except Exception as e:
        logger.exception("search error")
        return JsonResponse({"message": f"Error: {e}"}, status=500)


@csrf_exempt
@require_http_methods(["POST"])
def query_by_gene(request):
    logger.info("query by gene")
    try:
        genes = _parse_ids(request, "ids")
        if not genes:
            return JsonResponse(
                {"message": "ids must be a non-empty list"}, status=400
            )

        try:
            pairs = GeneAnnotations.get_gene_analysis_pairs(genes)
        except GeneAnnotations.NotFound:
            return JsonResponse([], safe=False)

        gene_infos = GeneInfo.get_by_gene_and_analysis(pairs)

        # Add URLs to each record (use locus_tag + genome_id for unique identification)
        for item in gene_infos:
            genome_id = item.get("genome_id")
            gene = item.get("gene")
            locus_tag = item.get("locus_tag")
            if genome_id and gene and locus_tag:
                item["url"] = f"{settings.PANKB_BASE_URL}/gene_function/genome_gene_info/?genome_id={genome_id}&gene={gene}&locus_tag={locus_tag}"

        return JsonResponse(gene_infos, safe=False)

    except json.JSONDecodeError:
        return JsonResponse({'message': 'Invalid JSON'}, status=400)
    except Exception as e:
        logger.exception("search broke")
        return JsonResponse({'message': f'Error: {e}'}, status=500)
    

@csrf_exempt
@require_http_methods(["POST"])
def query_by_strain(request):
    logger.info("query by strain")
    try:
        genome_ids = _parse_ids(request, "ids")
        if not genome_ids:
            return JsonResponse(
                {"message": "ids must be a non-empty list"}, status=400
            )

        genomes = GenomeInfo.get_by_genome_ids(genome_ids)
        for genome in genomes:
            if genome.get("genome_id"):
                genome["url"] = f"{settings.PANKB_BASE_URL}/gene_function/genome_info/?genome_id={genome['genome_id']}"
        return JsonResponse(genomes, safe=False)

    except json.JSONDecodeError:
        return JsonResponse({'message': 'Invalid JSON'}, status=400)
    except Exception as e:
        logger.exception("search broke")
        return JsonResponse({'message': f'Error: {e}'}, status=500)


def _parse_ids(request, key):
    """Return list of IDs from request JSON body."""
    data = json.loads(request.body)
    ids = data.get(key, [])
    return [ids] if isinstance(ids, str) else ids