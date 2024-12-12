from common import database

class Statistics:
    objects = database.MongoDBObjects('pankb_stats')

    def get_latest():
        return Statistics.objects.find().sort("date", -1).limit(1).next()