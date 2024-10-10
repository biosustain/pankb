from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader
from .models import Statistics
import json

def home(request):
  template = loader.get_template('home/index.html')

  stats = Statistics.objects.latest("date")

  # Compose the render context: ----
  context = {
    'dimension_dataset': json.dumps(stats.pankb_dimensions),
    'organism_genome_dataset': json.dumps(stats.organism_genome_count),
    'organism_gene_dataset': json.dumps(stats.organism_gene_count),
    'genome_gene_dataset': json.dumps(stats.species_genome_gene),
    'treemap_dataset': json.dumps(stats.treemap)
  }

  return HttpResponse(template.render(context, request))
  