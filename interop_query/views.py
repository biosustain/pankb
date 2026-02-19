import logging
from urllib.parse import quote

from django.conf import settings
from drf_spectacular.utils import OpenApiExample, OpenApiParameter, extend_schema
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from gene_function.models import GeneInfo, GenomeInfo
from pangenome_analyses.models import GeneAnnotations

logger = logging.getLogger(__name__)


@extend_schema(
    tags=["Genes"],
    summary="List all genes",
    description="Return all genes with species and PanKB URLs for InteropDB bulk ingest.",
    responses={
        200: {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "gene": {"type": "string"},
                    "species": {"type": "string"},
                    "url": {"type": "string", "format": "uri"},
                },
            },
        }
    },
)
@api_view(["GET"])
def genes(request):
    """Return all genes with URLs for InteropDB bulk ingest."""
    try:
        gene_list = GeneAnnotations.get_all_genes()
        result = []
        for gene_data in gene_list:
            gene = gene_data.get("gene")
            species = gene_data.get("pangenome_analysis")
            if gene and species:
                result.append({
                    "gene": gene,
                    "species": species,
                    "url": f"{settings.PANKB_BASE_URL}/gene_function/gene_info/?species={quote(species)}&gene={quote(gene)}",
                })
        return Response(result)
    except Exception as e:
        logger.exception("list_all_genes failed")
        return Response({"message": f"Error: {e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@extend_schema(
    tags=["Strains"],
    summary="List all strains",
    description="Return all strains (genome IDs) with PanKB URLs for InteropDB bulk ingest.",
    responses={
        200: {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "strain": {"type": "string"},
                    "url": {"type": "string", "format": "uri"},
                },
            },
        }
    },
)
@api_view(["GET"])
def strains(request):
    """Return all strains (genomes) with URLs for InteropDB bulk ingest."""
    try:
        strain_ids = GenomeInfo.get_all_strains()
        result = []
        for strain_id in strain_ids:
            result.append({
                "strain": strain_id,
                "url": f"{settings.PANKB_BASE_URL}/gene_function/genome_info/?genome_id={quote(strain_id)}",
            })
        return Response(result)
    except Exception as e:
        logger.exception("list_all_strains failed")
        return Response({"message": f"Error: {e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@extend_schema(
    tags=["Gene-Strain Pairs"],
    summary="List gene-strain pairs (paginated)",
    description=(
        "Return distinct (gene, strain, locus_tag) pairs with URLs for InteropDB. "
        "Supports cursor-based pagination via skip/limit query parameters."
    ),
    parameters=[
        OpenApiParameter(name="skip", type=int, location="query", description="Number of records to skip (default 0)"),
        OpenApiParameter(name="limit", type=int, location="query", description="Max records to return (default 10000, max 50000)"),
    ],
    responses={
        200: {
            "type": "object",
            "properties": {
                "pairs": {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "properties": {
                            "gene": {"type": "string"},
                            "strain": {"type": "string"},
                            "locus_tag": {"type": "string"},
                            "url": {"type": "string", "format": "uri"},
                        },
                    },
                },
                "total": {"type": "integer"},
                "skip": {"type": "integer"},
                "limit": {"type": "integer"},
                "has_more": {"type": "boolean"},
            },
        }
    },
)
@api_view(["GET"])
def gene_strain_pairs(request):
    """Return distinct (gene, strain) pairs with URLs for InteropDB."""
    try:
        skip = int(request.GET.get("skip", 0))
        limit = min(int(request.GET.get("limit", 10000)), 50000)

        result = GeneInfo.get_gene_strain_pairs_paginated(skip=skip, limit=limit)
        pairs = result["pairs"]

        for pair in pairs:
            gene = pair.get("gene")
            strain = pair.get("strain")
            locus_tag = pair.get("locus_tag")
            if gene and strain and locus_tag:
                pair["url"] = f"{settings.PANKB_BASE_URL}/gene_function/genome_gene_info/?genome_id={quote(strain)}&gene={quote(gene)}&locus_tag={quote(locus_tag)}"

        return Response({
            "pairs": pairs,
            "total": result["total"],
            "skip": skip,
            "limit": limit,
            "has_more": skip + len(pairs) < result["total"],
        })
    except Exception as e:
        logger.exception("get_gene_strain_pairs failed")
        return Response({"message": f"Error: {e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@extend_schema(
    tags=["Gene-Strain Pairs"],
    summary="Query by gene-strain pairs",
    description="Look up detailed gene info for specific gene/strain pair combinations.",
    request={
        "application/json": {
            "type": "object",
            "properties": {
                "pairs": {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "properties": {
                            "gene": {"type": "string"},
                            "strain": {"type": "string"},
                        },
                        "required": ["gene", "strain"],
                    },
                }
            },
            "required": ["pairs"],
        }
    },
    responses={200: {"type": "array", "items": {"type": "object"}}},
    examples=[
        OpenApiExample(
            "Example request",
            value={"pairs": [{"gene": "adeJ", "strain": "GCF_000015425.1"}]},
            request_only=True,
        )
    ],
)
@api_view(["POST"])
def query_by_pair(request):
    """Query gene info by gene/strain pairs."""
    logger.info("query by pair")
    try:
        pairs = request.data.get("pairs", [])
        if isinstance(pairs, dict):
            pairs = [pairs]

        if not pairs:
            return Response({
                "count": 0,
                "message": "No gene/strain pairs provided",
            })

        clean_pairs = [
            {"gene": p["gene"], "genome_id": p["strain"]}
            for p in pairs
            if "gene" in p and "strain" in p
        ]
        if not clean_pairs:
            return Response({
                "count": 0,
                "message": "Each pair must contain both 'gene' and 'strain'",
            })

        genes = {p["gene"] for p in clean_pairs}

        try:
            ga_pairs = GeneAnnotations.get_gene_analysis_pairs(list(genes))
            gene_to_analyses = {}
            for g, a in ga_pairs:
                gene_to_analyses.setdefault(g, set()).add(a)
        except GeneAnnotations.NotFound:
            return Response([])

        query = []
        for p in clean_pairs:
            analyses = gene_to_analyses.get(p["gene"])
            if analyses:
                for analysis in analyses:
                    query.append({
                        "gene": p["gene"],
                        "pangenome_analysis": analysis,
                        "genome_id": p["genome_id"],
                    })

        if not query:
            return Response([])

        results = GeneInfo.get_by_gene_analysis_genome(query)
        for item in results:
            genome_id = item.get("genome_id")
            gene = item.get("gene")
            locus_tag = item.get("locus_tag")
            if genome_id and gene and locus_tag:
                item["url"] = f"{settings.PANKB_BASE_URL}/gene_function/genome_gene_info/?genome_id={quote(genome_id)}&gene={quote(gene)}&locus_tag={quote(locus_tag)}"
        return Response(results)

    except Exception as e:
        logger.exception("search error")
        return Response({"message": f"Error: {e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@extend_schema(
    tags=["Genes"],
    summary="Query by gene IDs",
    description="Look up detailed gene info by a list of gene names.",
    request={
        "application/json": {
            "type": "object",
            "properties": {
                "ids": {
                    "type": "array",
                    "items": {"type": "string"},
                }
            },
            "required": ["ids"],
        }
    },
    responses={200: {"type": "array", "items": {"type": "object"}}},
    examples=[
        OpenApiExample(
            "Example request",
            value={"ids": ["adeJ", "adeK"]},
            request_only=True,
        )
    ],
)
@api_view(["POST"])
def query_by_gene(request):
    """Query gene info by gene IDs."""
    logger.info("query by gene")
    try:
        genes = _parse_ids(request, "ids")
        if not genes:
            return Response(
                {"message": "ids must be a non-empty list"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            pairs = GeneAnnotations.get_gene_analysis_pairs(genes)
        except GeneAnnotations.NotFound:
            return Response([])

        gene_infos = GeneInfo.get_by_gene_and_analysis(pairs)
        for item in gene_infos:
            genome_id = item.get("genome_id")
            gene = item.get("gene")
            locus_tag = item.get("locus_tag")
            if genome_id and gene and locus_tag:
                item["url"] = f"{settings.PANKB_BASE_URL}/gene_function/genome_gene_info/?genome_id={quote(genome_id)}&gene={quote(gene)}&locus_tag={quote(locus_tag)}"
        return Response(gene_infos)

    except Exception as e:
        logger.exception("search broke")
        return Response({"message": f"Error: {e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@extend_schema(
    tags=["Strains"],
    summary="Query by strain IDs",
    description="Look up genome info (with isolation data) by a list of genome IDs.",
    request={
        "application/json": {
            "type": "object",
            "properties": {
                "ids": {
                    "type": "array",
                    "items": {"type": "string"},
                }
            },
            "required": ["ids"],
        }
    },
    responses={200: {"type": "array", "items": {"type": "object"}}},
    examples=[
        OpenApiExample(
            "Example request",
            value={"ids": ["GCF_000015425.1"]},
            request_only=True,
        )
    ],
)
@api_view(["POST"])
def query_by_strain(request):
    """Query genome info by strain IDs."""
    logger.info("query by strain")
    try:
        genome_ids = _parse_ids(request, "ids")
        if not genome_ids:
            return Response(
                {"message": "ids must be a non-empty list"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        genomes = GenomeInfo.get_by_genome_ids(genome_ids)
        for genome in genomes:
            if genome.get("genome_id"):
                genome["url"] = f"{settings.PANKB_BASE_URL}/gene_function/genome_info/?genome_id={quote(genome['genome_id'])}"
        return Response(genomes)

    except Exception as e:
        logger.exception("search broke")
        return Response({"message": f"Error: {e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


def _parse_ids(request, key):
    """Return list of IDs from request data."""
    ids = request.data.get(key, [])
    return [ids] if isinstance(ids, str) else ids
