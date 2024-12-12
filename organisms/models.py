from common import database


# Model representing info on the Organisms page: ----
class Organisms:
    objects = database.MongoDBObjects("pankb_organisms")

    class NotFound(Exception):
        pass

    def get_by_pangenome_analysis(pangenome_analysis, projection=None):
        organism_info = list(
            Organisms.objects.find(
                {"pangenome_analysis": pangenome_analysis},
                projection,
            )
        )
        if len(organism_info) != 1:
            raise Organisms.NotFound()
        organism_info = organism_info[0]
        return organism_info

    def list(family=None, projection=None):
        filter_params = {}
        if family:  # if the family get parameter is set
            filter_params["family"] = family
        organisms = Organisms.objects.find(filter_params, projection)
        return list(organisms)
