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

    @staticmethod
    def get_all_gene_strain_pairs():
        """
        Return all distinct (gene, genome_id) pairs.
        """
        pipeline = [
            {"$group": {"_id": {"gene": "$gene", "genome_id": "$genome_id"}}},
            {"$sort": {"_id.gene": 1, "_id.genome_id": 1}},
            {"$project": {"_id": 0, "gene": "$_id.gene", "strain": "$_id.genome_id"}},
        ]

        cursor = GeneInfo.objects.aggregate(pipeline)
        return [doc for doc in cursor if doc.get("gene") and doc.get("strain")]

    @staticmethod
    def get_gene_strain_pairs_paginated(skip: int = 0, limit: int = 10000):
        """
        Return paginated distinct (gene, genome_id) pairs.

        Args:
            skip: Number of records to skip
            limit: Max records to return

        Returns:
            {
                "pairs": [...],
                "total": int
            }
        """
        # Get total count first (cached if possible)
        count_pipeline = [
            {"$group": {"_id": {"gene": "$gene", "genome_id": "$genome_id"}}},
            {"$count": "total"}
        ]
        count_result = list(GeneInfo.objects.aggregate(count_pipeline))
        total = count_result[0]["total"] if count_result else 0

        # Get paginated results
        pipeline = [
            {"$group": {"_id": {"gene": "$gene", "genome_id": "$genome_id"}}},
            {"$sort": {"_id.gene": 1, "_id.genome_id": 1}},
            {"$skip": skip},
            {"$limit": limit},
            {"$project": {"_id": 0, "gene": "$_id.gene", "strain": "$_id.genome_id"}},
        ]

        cursor = GeneInfo.objects.aggregate(pipeline)
        pairs = [doc for doc in cursor if doc.get("gene") and doc.get("strain")]

        return {"pairs": pairs, "total": total}    
      
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

    @staticmethod
    def get_all_strains():
        """
        Return a sorted list of distinct genome_id values.
        """
        pipeline = [
            {"$group": {"_id": "$genome_id"}},
            {"$sort": {"_id": 1}},
            {"$project": {"_id": 0, "genome_id": "$_id"}},
        ]

        cursor = GenomeInfo.objects.aggregate(pipeline)
        return [doc["genome_id"] for doc in cursor if doc.get("genome_id")]


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
