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
    def get_all_genes_paginated(after: str | None = None, limit: int = 10000):
        """
        Return paginated (gene, pangenome_analysis) pairs using cursor-based pagination.
        Uses _id > after to seek directly, so every page is equally fast.

        Args:
            after: The _id of the last document from the previous page (None for first page)
            limit: Max records to return

        Returns:
            {"genes": [...], "next_cursor": str | None}
        """
        from bson import ObjectId

        filter_query = {"gene": {"$ne": None}, "pangenome_analysis": {"$ne": None}}
        if after is not None:
            filter_query["_id"] = {"$gt": ObjectId(after)}

        col = GeneAnnotations.objects.collection
        cursor = col.find(
            filter_query,
            {"_id": 1, "gene": 1, "pangenome_analysis": 1},
        ).sort("_id", 1).limit(limit)

        genes = []
        last_id = None
        for doc in cursor:
            genes.append({"gene": doc["gene"], "pangenome_analysis": doc["pangenome_analysis"]})
            last_id = str(doc["_id"])

        next_cursor = last_id if len(genes) == limit else None

        return {"genes": genes, "next_cursor": next_cursor}

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
