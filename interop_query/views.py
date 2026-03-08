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
    summary="List all genes (paginated)",
    description=(
        "Return distinct (gene, species) pairs with PanKB URLs. "
        "Supports cursor-based pagination via after/limit query parameters."
    ),
    parameters=[
        OpenApiParameter(name="after", type=str, location="query", description="Cursor from previous page (next_cursor value)"),
        OpenApiParameter(name="limit", type=int, location="query", description="Max records to return (default 50000, max 200000)"),
    ],
    responses={
        200: {
            "description": "Paginated list of genes with PanKB URLs.",
            "type": "object",
            "properties": {
                "genes": {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "properties": {
                            "gene": {"type": "string"},
                            "species": {"type": "string"},
                            "url": {"type": "string", "format": "uri"},
                        },
                    },
                },
                "limit": {"type": "integer"},
                "next_cursor": {"type": "string", "nullable": True},
                "has_more": {"type": "boolean"},
            },
        },
        500: {"description": "Unexpected server error."},
    },
)
@api_view(["GET"])
def genes(request):
    """Return all genes with species and PanKB URLs (cursor-based pagination)."""
    try:
        after = request.GET.get("after")
        limit = min(int(request.GET.get("limit", 50000)), 200000)

        result = GeneAnnotations.get_all_genes_paginated(after=after, limit=limit)
        gene_list = result["genes"]

        for gene_data in gene_list:
            gene = gene_data.get("gene")
            species = gene_data.get("pangenome_analysis")
            if gene and species:
                gene_data["species"] = species
                gene_data["url"] = f"{settings.PANKB_BASE_URL}/gene_function/gene_info/?species={quote(species)}&gene={quote(gene)}"
                gene_data.pop("pangenome_analysis", None)

        return Response({
            "genes": gene_list,
            "limit": limit,
            "next_cursor": result["next_cursor"],
            "has_more": result["next_cursor"] is not None,
        })
    except Exception as e:
        logger.exception("list_all_genes failed")
        return Response({"message": f"Error: {e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@extend_schema(
    tags=["Strains"],
    summary="List all strains (paginated)",
    description=(
        "Return all strains (genome IDs) with PanKB URLs. "
        "Supports cursor-based pagination via after/limit query parameters."
    ),
    parameters=[
        OpenApiParameter(name="after", type=str, location="query", description="Cursor from previous page (next_cursor value)"),
        OpenApiParameter(name="limit", type=int, location="query", description="Max records to return (default 50000, max 200000)"),
    ],
    responses={
        200: {
            "description": "Paginated list of strains with PanKB URLs.",
            "type": "object",
            "properties": {
                "strains": {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "properties": {
                            "strain": {"type": "string"},
                            "url": {"type": "string", "format": "uri"},
                        },
                    },
                },
                "limit": {"type": "integer"},
                "next_cursor": {"type": "string", "nullable": True},
                "has_more": {"type": "boolean"},
            },
        },
        500: {"description": "Unexpected server error."},
    },
)
@api_view(["GET"])
def strains(request):
    """Return all strains (genome IDs) with PanKB URLs (cursor-based pagination)."""
    try:
        after = request.GET.get("after")
        limit = min(int(request.GET.get("limit", 50000)), 200000)

        result = GenomeInfo.get_all_strains_paginated(after=after, limit=limit)
        strain_ids = result["strains"]

        strain_list = []
        for strain_id in strain_ids:
            strain_list.append({
                "strain": strain_id,
                "url": f"{settings.PANKB_BASE_URL}/gene_function/genome_info/?genome_id={quote(strain_id)}",
            })

        return Response({
            "strains": strain_list,
            "limit": limit,
            "next_cursor": result["next_cursor"],
            "has_more": result["next_cursor"] is not None,
        })
    except Exception as e:
        logger.exception("list_all_strains failed")
        return Response({"message": f"Error: {e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@extend_schema(
    tags=["Gene-Strain Pairs"],
    summary="List gene-strain pairs (paginated)",
    description=(
        "Return distinct (gene, strain, locus_tag) pairs with PanKB URLs. "
        "Supports cursor-based pagination via after/limit query parameters."
    ),
    parameters=[
        OpenApiParameter(name="after", type=str, location="query", description="Cursor from previous page (next_cursor value)"),
        OpenApiParameter(name="limit", type=int, location="query", description="Max records to return (default 50000, max 200000)"),
    ],
    responses={
        200: {
            "description": "Paginated list of gene-strain pairs with PanKB URLs.",
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
                "limit": {"type": "integer"},
                "next_cursor": {"type": "string", "nullable": True},
                "has_more": {"type": "boolean"},
            },
        },
        500: {"description": "Unexpected server error."},
    },
)
@api_view(["GET"])
def gene_strain_pairs(request):
    """Return distinct (gene, strain, locus_tag) pairs with PanKB URLs (cursor-based pagination)."""
    try:
        after = request.GET.get("after")  # _id cursor from previous page
        limit = min(int(request.GET.get("limit", 50000)), 200000)

        result = GeneInfo.get_gene_strain_pairs_paginated(after=after, limit=limit)
        pairs = result["pairs"]

        for pair in pairs:
            gene = pair.get("gene")
            strain = pair.get("strain")
            locus_tag = pair.get("locus_tag")
            if gene and strain and locus_tag:
                pair["url"] = f"{settings.PANKB_BASE_URL}/gene_function/genome_gene_info/?genome_id={quote(strain)}&gene={quote(gene)}&locus_tag={quote(locus_tag)}"

        return Response({
            "pairs": pairs,
            "limit": limit,
            "next_cursor": result["next_cursor"],
            "has_more": result["next_cursor"] is not None,
        })
    except Exception as e:
        logger.exception("get_gene_strain_pairs failed")
        return Response({"message": f"Error: {e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@extend_schema(
    tags=["Gene-Strain Pairs"],
    summary="Query by gene-strain pairs",
    description=(
        "Look up detailed gene info for specific gene/strain pair combinations. "
        "Accepts JSON body: {\"pairs\": [{\"gene\": \"...\", \"strain\": \"...\"}]}. "
        "Both 'gene' and 'strain' must be strings (not arrays). Each pair represents one gene-strain combination. "
        "Returns 400 if the pairs list is empty or entries are missing required fields. "
        "IDs not found in the database are silently omitted from the response."
    ),
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
    responses={
        200: {
            "description": "Gene info for matched gene/strain pairs.",
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "gene": {"type": "string"},
                    "locus_tag": {"type": "string"},
                    "genome_id": {"type": "string"},
                    "protein": {"type": "string"},
                    "species": {"type": "string"},
                    "pangenome_analysis": {"type": "string"},
                    "start_position": {"type": "integer"},
                    "end_position": {"type": "integer"},
                    "nucleotide_seq": {"type": "string"},
                    "aminoacid_seq": {"type": "string"},
                    "url": {"type": "string", "format": "uri"},
                },
            },
        },
        400: {"description": "Invalid or empty input."},
        500: {"description": "Unexpected server error."},
    },
    examples=[
        OpenApiExample(
            "Example request",
            value={"pairs": [{"gene": "COQ3_1", "strain": "GCF_948329545.1"}]},
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
            return Response(
                {"message": "pairs must be a non-empty list"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        seen = set()
        clean_pairs = []
        for p in pairs:
            if "gene" in p and "strain" in p:
                key = (p["gene"], p["strain"])
                if key not in seen:
                    seen.add(key)
                    clean_pairs.append({"gene": p["gene"], "genome_id": p["strain"]})
        if not clean_pairs:
            return Response(
                {"message": "Each pair must contain both 'gene' and 'strain'"},
                status=status.HTTP_400_BAD_REQUEST,
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
    summary="Query by gene names",
    description=(
        "Look up detailed gene info by a list of gene names. "
        "Accepts JSON body: {\"ids\": [\"geneA\", \"geneB\"]}. "
        "Returns 400 if the ids list is empty or missing. "
        "IDs not found in the database are silently omitted from the response."
    ),
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
    responses={
        200: {
            "description": "Gene info for matched gene names.",
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "gene": {"type": "string"},
                    "locus_tag": {"type": "string"},
                    "genome_id": {"type": "string"},
                    "protein": {"type": "string"},
                    "species": {"type": "string"},
                    "pangenome_analysis": {"type": "string"},
                    "start_position": {"type": "integer"},
                    "end_position": {"type": "integer"},
                    "nucleotide_seq": {"type": "string"},
                    "aminoacid_seq": {"type": "string"},
                    "url": {"type": "string", "format": "uri"},
                },
            },
        },
        400: {"description": "Invalid or empty input."},
        500: {"description": "Unexpected server error."},
    },
    examples=[
        OpenApiExample(
            "Example request",
            value={"ids": ["AAH1"]},
            request_only=True,
        )
    ],
)
@api_view(["POST"])
def query_by_gene(request):
    """Query gene info by gene names."""
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
    description=(
        "Look up genome info by a list of genome IDs. "
        "Accepts JSON body: {\"ids\": [\"GCF_...\", \"GCF_...\"]}. "
        "Returns 400 if the ids list is empty or missing. "
        "IDs not found in the database are silently omitted from the response."
    ),
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
    responses={
        200: {
            "description": "Genome info for matched strain IDs.",
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "genome_id": {"type": "string"},
                    "strain": {"type": "string"},
                    "species": {"type": "string"},
                    "pangenome_analysis": {"type": "string"},
                    "gc_content": {"type": "number"},
                    "genome_len": {"type": "integer"},
                    "gene_class_distribution": {"type": "array", "items": {"type": "integer"}},
                    "phylo_group": {"type": "string"},
                    "isolation_source": {"type": "string"},
                    "country": {"type": "string"},
                    "geo_loc_name": {"type": "string"},
                    "url": {"type": "string", "format": "uri"},
                },
            },
        },
        400: {"description": "Invalid or empty input."},
        500: {"description": "Unexpected server error."},
    },
    examples=[
        OpenApiExample(
            "Example request",
            value={"ids": ["GCF_948329545.1", "GCF_000286875.2"]},
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
