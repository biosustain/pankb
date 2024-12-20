from common import database


# Model for the Gene Info table content
class GeneInfo:
    objects = database.MongoDBObjects("pankb_gene_info")

    def get_gene_info_and_pangenomic_class_pipeline(gene_match):
        return [
            {"$match": gene_match},
            {
                "$lookup": {
                    "from": "pankb_gene_annotations",
                    "let": {
                        "q_gene": "$gene",
                        "q_pangenome_analysis": "$pangenome_analysis",
                    },
                    "pipeline": [
                        {
                            "$match": {
                                "$expr": {
                                    "$and": [
                                        {"$eq": ["$gene", "$$q_gene"]},
                                        {
                                            "$eq": [
                                                "$pangenome_analysis",
                                                "$$q_pangenome_analysis",
                                            ]
                                        },
                                    ]
                                }
                            }
                        }
                    ],
                    "as": "pangenomic_class",
                }
            },
            {
                "$set": {
                    "pangenomic_class": {
                        "$ifNull": [
                            {"$arrayElemAt": ["$pangenomic_class.pangenomic_class", 0]},
                            "-",
                        ]
                    }
                }
            },
        ]

    def get_gene_info_and_pangenomic_class(genome_match, projection=None):
        pipeline = GeneInfo.get_gene_info_and_pangenomic_class_pipeline(genome_match)
        if isinstance(projection, list):
            projection = {p: 1 for p in projection}
            if not "_id" in projection:
                projection["_id"] = 0
        if projection:
            pipeline.append({"$project": projection})
        return GeneInfo.objects.aggregate(pipeline)


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
