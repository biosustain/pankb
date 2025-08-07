from common import database

class GeneAnnotations:
    objects = database.MongoDBObjects('pankb_gene_annotations')
    
    class NotFound(Exception):
        pass
    


# Model for the Gene Info table content
class GeneInfo:
    objects = database.MongoDBObjects("pankb_gene_info")


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
