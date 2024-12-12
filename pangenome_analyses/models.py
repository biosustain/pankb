from common import database

# Model representing info on the Organisms page: ----
class GeneAnnotations:
    objects = database.MongoDBObjects('pankb_gene_annotations')
    
    class NotFound(Exception):
        pass
    
