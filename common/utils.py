from pymongo import MongoClient
from django.conf import settings

if "conn_string" in settings.MONGODB:
    MONOGO_CLIENT = MongoClient(settings.MONGODB["conn_string"])
else:
    MONOGO_CLIENT = MongoClient(
        host=settings.MONGODB["host"],
        port=int(settings.MONGODB["port"]),
        username=settings.MONGODB["username"],
        password=settings.MONGODB["password"],
        authSource=settings.MONGODB["auth_source"],
        authMechanism=settings.MONGODB["auth_mechanism"],
    )
DB = MONOGO_CLIENT[settings.MONGODB["db_name"]]

class MongoDBObjects:
    def __init__(self, collection_name):
        self.collection = DB[collection_name]
    
    def aggregate(self, pipeline, **kwargs):
        return self.collection.aggregate(pipeline, **kwargs)

    def find(self, filter=None, projection=None, **kwargs):
        if isinstance(projection, list):
            projection = {p: 1 for p in projection}
            if not "_id" in projection:
                projection["_id"] = 0
        return self.collection.find(filter=filter, projection=projection, **kwargs)
    def find_one(self, *args, **kwargs):
        return self.collection.find_one(*args, **kwargs)
