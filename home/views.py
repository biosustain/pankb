from django.http import HttpResponse
from django.template import loader
from .models import Statistics


def home(request):
    template = loader.get_template("home/index.html")

    stats = Statistics.get_latest()

    # Compose the render context: ----
    context = {
        "dimension_dataset": stats["pankb_dimensions"],
        "organism_genome_dataset": stats["organism_genome_count"],
        "organism_gene_dataset": stats["organism_gene_count"],
        "genome_gene_dataset": stats["species_genome_gene"],
        "treemap_dataset": stats["treemap"],
    }

    return HttpResponse(template.render(context, request))
