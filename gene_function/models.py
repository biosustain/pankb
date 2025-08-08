from common import database

# Model for the Gene Info table content
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


# Model for the Genome Info table content
class GenomeInfo:
    objects = database.MongoDBObjects("pankb_genome_info")

    def get_genome_and_isolation_info_pipeline(genome_match):
        return [
            {"$match": genome_match},
            {
                "$lookup": {
                    "from": "pankb_isolation_info",
                    "localField": "genome_id",
                    "foreignField": "genome_id",
                    "as": "isolation_info",
                }
            },
            {"$unwind": {"path": "$isolation_info"}},
            {
                "$replaceRoot": {
                    "newRoot": {"$mergeObjects": ["$$ROOT", "$isolation_info"]}
                }
            },
            {"$project": {"_id": 0, "isolation_info": 0}},
        ]

    def get_by_genome_ids(genome_ids, projection=None):
        """
        Fetch one or more genomes by ID.

        :param genome_ids: list[str] – genome_id values to look up
        :param include_isolation: bool – whether to perform the $lookup join
        :param projection: list[str] | dict | None – optional projection
        :return: list[dict]
        """
        genome_match = {"genome_id": {"$in": genome_ids}}

        cursor = GenomeInfo.get_genome_and_isolation_info(
            genome_match, projection=projection
        )

        return list(cursor) 

    def get_genome_and_isolation_info(genome_match, projection=None):
        pipeline = GenomeInfo.get_genome_and_isolation_info_pipeline(genome_match)
        if isinstance(projection, list):
            projection = {p: 1 for p in projection}
            if not "_id" in projection:
                projection["_id"] = 0
        if projection:
            pipeline.append({"$project": projection})
        return GenomeInfo.objects.aggregate(pipeline)


class PathwayInfo:
    objects = database.MongoDBObjects("pankb_pathway_info")
