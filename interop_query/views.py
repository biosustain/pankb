from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from django.db.models import Q
from gene_function.models import GenomeInfo, GeneInfo
from pangenome_analyses.models import GeneAnnotations

import json
import logging

logger = logging.getLogger(__name__)

@csrf_exempt
@require_http_methods(["GET"])
def genes(request):
    """Return a flat list of all gene names."""
    try:
        genes = GeneAnnotations.get_all_genes()
        return JsonResponse(genes, safe=False)
    except Exception as e:
        logger.exception("list_all_genes failed")
        return JsonResponse({"message": f"Error: {e}"}, status=500)


@csrf_exempt
@require_http_methods(["GET"])
def strains(request):
    """Return all strains (genomes) with isolation info merged."""
    try:
        data = GenomeInfo.get_all_strains()
        return JsonResponse(data, safe=False)
    except Exception as e:
        logger.exception("list_all_strains failed")
        return JsonResponse({"message": f"Error: {e}"}, status=500)


@csrf_exempt
@require_http_methods(["GET"])
def gene_strain_pairs(request):
    """Return all distinct (gene, strain) pairs for InteropDB."""
    try:
        pairs = GeneInfo.get_all_gene_strain_pairs()
        return JsonResponse(pairs, safe=False)
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