from common import utils

# Model for the Gene Info table content
class GeneInfo:
    objects = utils.MongoDBObjects('pankb_gene_info')


# Model for the Genome Info table content
class GenomeInfo:
    objects = utils.MongoDBObjects('pankb_genome_info')

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

    def get_genome_and_isolation_info(genome_match):
        return GenomeInfo.objects.aggregate(
            GenomeInfo.get_genome_and_isolation_info_pipeline(genome_match)
        )


class PathwayInfo:
    objects = utils.MongoDBObjects('pankb_pathway_info')
