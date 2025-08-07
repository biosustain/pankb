from common import database

class GeneAnnotations:
    objects = database.MongoDBObjects("pankb_gene_annotations")

    class NotFound(Exception):
        pass

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


class GeneInfo:
    objects = database.MongoDBObjects("pankb_gene_info")

    def get_by_gene_analysis_genome(query_args):
        """
        Return every GeneInfo document whose (gene, pangenome_analysis, genome_id)
        matches any tuple in *query_args*.
        """
        if not query_args:
            return []

        or_conditions = [
            {
                "gene": t["gene"],
                "pangenome_analysis": t["pangenome_analysis"],
                "genome_id": t["genome_id"],
            }
            for t in query_args
        ]

        return list(
            GeneInfo.objects.find(
                {"$or": or_conditions},
                projection={"_id": 0}
            )
        )

    def get_by_gene_and_analysis(pairs):
        """
        Return every GeneInfo document whose (gene, pangenome_analysis)
        matches any tuple in *pairs*.
        """
        if not pairs:
            return []

        or_conditions = [
            {"gene": g, "pangenome_analysis": a}
            for g, a in pairs
        ]

        return list(
            GeneInfo.objects.find(
                {"$or": or_conditions},
                projection={"_id": 0}
            )
        )