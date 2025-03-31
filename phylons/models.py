from common import database
from functools import cache

# Model representing Phylons info ----
class Phylons:
    objects = database.MongoDBObjects('pankb_phylons')
    
    class NotFound(Exception):
        pass

    class DuplicateEntry(Exception):
        pass

    @cache
    def get_by_pangenome_analysis(pangenome_analysis: str):
        phylon_documents = list(
            Phylons.objects.find(
                {"pangenome_analysis": pangenome_analysis},
            )
        )

        if len(phylon_documents) == 0:
            raise Phylons.NotFound()
        elif len(phylon_documents) > 1:
            raise Phylons.DuplicateEntry(f"Duplicate entries for pangenome analysis {pangenome_analysis}")
        
        phylon_document = phylon_documents[0]
        return phylon_document
