from common import utils

class Statistics:
    objects = utils.MongoDBObjects('pankb_stats')

    def get_latest():
        return Statistics.objects.find().sort("date", -1).limit(1).next()