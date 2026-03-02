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
    def get_gene_strain_pairs_paginated(after: str | None = None, limit: int = 10000):
        """
        Return paginated (gene, genome_id) pairs using cursor-based pagination.
        Uses _id > after to seek directly, so every page is equally fast.

        Args:
            after: The _id of the last document from the previous page (None for first page)
            limit: Max records to return

        Returns:
            {
                "pairs": [...],
                "next_cursor": str | None  (None means no more data)
            }
        """
        filter_query = {"gene": {"$ne": None}, "genome_id": {"$ne": None}, "locus_tag": {"$ne": None}}
        if after is not None:
            from bson import ObjectId
            filter_query["_id"] = {"$gt": ObjectId(after)}

        cursor = GeneInfo.objects.find(
            filter_query,
            projection={"_id": 1, "gene": 1, "genome_id": 1, "locus_tag": 1}
        ).sort("_id", 1).limit(limit)

        pairs = []
        last_id = None
        for doc in cursor:
            pairs.append({"gene": doc["gene"], "strain": doc["genome_id"], "locus_tag": doc["locus_tag"]})
            last_id = str(doc["_id"])

        next_cursor = last_id if len(pairs) == limit else None

        return {"pairs": pairs, "next_cursor": next_cursor}

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

    @staticmethod
    def get_all_strains_paginated(after: str | None = None, limit: int = 10000):
        """
        Return paginated genome_id values using cursor-based pagination.
        Uses _id > after to seek directly, so every page is equally fast.

        Args:
            after: The _id of the last document from the previous page (None for first page)
            limit: Max records to return

        Returns:
            {"strains": [...], "next_cursor": str | None}
        """
        from bson import ObjectId

        filter_query = {"genome_id": {"$ne": None}}
        if after is not None:
            filter_query["_id"] = {"$gt": ObjectId(after)}

        cursor = GenomeInfo.objects.find(
            filter_query,
            projection={"_id": 1, "genome_id": 1}
        ).sort("_id", 1).limit(limit)

        strains = []
        last_id = None
        for doc in cursor:
            strains.append(doc["genome_id"])
            last_id = str(doc["_id"])

        next_cursor = last_id if len(strains) == limit else None

        return {"strains": strains, "next_cursor": next_cursor}


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
