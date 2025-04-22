from common import database
from functools import lru_cache
from collections import defaultdict

# Model representing Phylons info ----
class Phylons:
    collections = {
        "genome": database.MongoDBObjects('pankb_genome_phylons'),
        "gene": database.MongoDBObjects('pankb_gene_phylons'),
    }


    @lru_cache(maxsize=50)
    def get_phylon_to_item_weights(pangenome_analysis: str, collection: str) -> dict[int, dict[str, float]]:
        assert collection in Phylons.collections.keys(), f"Invalid collection: {collection}. Must be one of {list(Phylons.collections.keys())}"

        phylon_documents = Phylons.collections[collection].find(
            {"pangenome_analysis": pangenome_analysis},
        )

        id_key = "genome_id" if collection == "genome" else "gene"

        phylon_weights = defaultdict(dict)
        for document in phylon_documents:
            id = document[id_key]
            weights = document["phylon_weights"]
            for phylon, weight in weights.items():
                phylon_weights[int(phylon)][id] = weight
        
        return phylon_weights
    

    @lru_cache(maxsize=50)
    def get_item_to_phylon_weights(pangenome_analysis: str, collection: str) -> dict[str, dict[int, float]]:
        assert collection in Phylons.collections.keys(), f"Invalid collection: {collection}. Must be one of {list(Phylons.collections.keys())}"

        phylon_documents = Phylons.collections[collection].find(
            {"pangenome_analysis": pangenome_analysis},
        )

        id_key = "genome_id" if collection == "genome" else "gene"

        collection_weights = {}
        for document in phylon_documents:
            id = document[id_key]
            weights = document["phylon_weights"]
            collection_weights[id] = {
                int(phylon): weight for phylon, weight in weights.items()
            }
        
        return collection_weights


    @lru_cache(maxsize=500)
    def get_phylon_ids(pangenome_analysis: str) -> list[int]:
        phylon_document = Phylons.collections["genome"].find_one(
                {"pangenome_analysis": pangenome_analysis},
            )

        return sorted(int(n) for n in phylon_document["phylon_weights"].keys())


    @lru_cache(maxsize=100)
    def get_genome_phylons(pangenome_analysis: str) -> dict[str, list[int]]:
        phylon_documents = Phylons.collections["genome"].find(
            {"pangenome_analysis": pangenome_analysis},
        )

        return {doc["genome_id"]: doc["phylons"] for doc in phylon_documents}
