from common import database

class Publication:
    objects = database.MongoDBObjects('pankb_publications')
