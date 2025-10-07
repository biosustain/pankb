from common import database

# Model representing info on the Organisms page: ----
class GeneAnnotations:
    objects = database.MongoDBObjects('pankb_gene_annotations')
    
    @staticmethod
    def get_all_genes(projection=None):
        """
        Return a sorted list of distinct gene names.
        """
        cursor = GeneAnnotations.objects.find(
            {}, projection=projection or ["gene"]
        )

        names = {doc.get("gene") for doc in cursor if "gene" in doc}
        return sorted(n for n in names if n)

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
