from common import database

# Model representing info on the Organisms page: ----
class GeneAnnotations:
    class NotFound(Exception):
        pass

    objects = database.MongoDBObjects('pankb_gene_annotations')

    @staticmethod
    def get_all_genes():
        """
        Return a sorted list of dicts with gene and pangenome_analysis.
        Each unique (gene, pangenome_analysis) pair is returned once.
        """
        cursor = GeneAnnotations.objects.find(
            {}, projection=["gene", "pangenome_analysis"]
        )

        pairs = {
            (doc["gene"], doc["pangenome_analysis"])
            for doc in cursor
            if doc.get("gene") and doc.get("pangenome_analysis")
        }

        result = [
            {"gene": gene, "pangenome_analysis": species}
            for gene, species in sorted(pairs)
        ]
        return result

    @staticmethod
    def get_all_genes_paginated(skip=0, limit=10000):
        """
        Return paginated (gene, pangenome_analysis) pairs.
        Uses indexed find+sort+skip+limit for performance on large collections.
        """
        col = GeneAnnotations.objects.collection
        cursor = col.find(
            {"gene": {"$ne": None}, "pangenome_analysis": {"$ne": None}},
            {"_id": 0, "gene": 1, "pangenome_analysis": 1},
        ).sort([("pangenome_analysis", 1), ("gene", 1)]).skip(skip).limit(limit)
        genes = list(cursor)

        total = col.estimated_document_count()

        return {"genes": genes, "total": total}

    def get_gene_analysis_pairs(genes):
        """
        Return all distinct (gene, pangenome_analysis) tuples
        for the provided list of gene names.
        """
        cursor = GeneAnnotations.objects.find(
            {"gene": {"$in": genes}},
            projection=["gene", "pangenome_analysis"]
        )
        pairs = {(doc["gene"], doc["pangenome_analysis"]) for doc in cursor}
        if not pairs:
            raise GeneAnnotations.NotFound("No matching gene annotations found")
        return list(pairs)
