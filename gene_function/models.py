from common import database


# Model for the Gene Info table content
class GeneInfo:
    objects = database.MongoDBObjects("pankb_gene_info")

    def get_gene_info_and_pangenomic_class_pipeline(gene_match): # This is an ugly workaround to make it compatible with Azure Cosmos DB
        return [
            {"$match": gene_match},
            {
                "$unionWith": {
                    "coll": "pankb_gene_annotations",
                    "pipeline": [
                        {
                            "$match": {
                                "pangenome_analysis": gene_match["pangenome_analysis"]
                            }
                        },
                        {"$project": {"_id": 1, "gene": 1, "pangenomic_class": 1}},
                    ],
                }
            },
            {"$group": {"_id": "$gene", "doc": {"$mergeObjects": "$$ROOT"}}},
            {"$replaceRoot": {"newRoot": "$doc"}},
            {"$match": {"locus_tag": {"$exists": True}}},
            {"$fill": {"output": {"pangenomic_class": {"value": "-"}}}}
        ]

    def get_gene_info_and_pangenomic_class_pipeline_mongodb_only(gene_match):
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

    def get_genome_and_isolation_info_pipeline(genome_match, include_phylons: bool = False):
        pipeline = [
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
        ]

        if include_phylons:
            pipeline += [
                {'$lookup': {
                    "from": "pankb_genome_phylons",
                    "localField": "genome_id",
                    "foreignField": "genome_id",
                    "pipeline": [
                        {'$match': genome_match}
                    ],
                    "as": "phylons_data"
                }},
                {'$unwind': {'path': '$phylons_data', 'preserveNullAndEmptyArrays': True}},
                {'$addFields': {
                    "genome_phylons": {"$ifNull": ["$phylons_data.phylons", []]}
                }},
            ]
        else:
            pipeline += {"$project": {"_id": 0, "isolation_info": 0}},

        return pipeline

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
