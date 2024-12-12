from django.http import HttpResponse
from django.template import loader
from .models import Organisms
from common import csv_export
import json, time

HIGHLIGHTED_SPECIES = ["Bacillus_subtilis", "Escherichia_coli", "Limosilactobacillus_reuteri", "Pseudomonas_E_putida", "Streptomyces_albidoflavus", "Vibrio_natriegens"]

# Template renderer for the Organisms table
def organisms(request):
  template = loader.get_template('organisms/species.html')
  family = request.GET.get('family')

  org_keys = ['family', 'species', 'pangenome_analysis', 'openness', 'genomes_num', 'gene_class_distribution']
  organisms = Organisms.list(family=family, projection=org_keys)

  organisms = [([org[k] for k in org_keys] + [int(org["pangenome_analysis"] in HIGHLIGHTED_SPECIES)]) for org in organisms]
  organisms_json = json.dumps(organisms, default=str)  # json dumps replaces the single quotes with the double ones
  # Compose the render context: ----
  context = {
    'dataset': organisms_json
  }
  return HttpResponse(template.render(context, request))


# A view that serves the Organisms table content in the .csv format
def download_organisms_table_csv(request):
  family = request.GET.get('family')

  org_keys = ['family', 'species', 'openness', 'genomes_num', 'gene_class_distribution']
  organisms = Organisms.list(family=family, projection=org_keys)

  # Adjust filter parameters based on the GET paramater value: ----
  downloaded_file_name = "Organisms__" + (f"{family}__" if family else "") + time.strftime("%Y-%m-%d_%H-%M") + ".csv"

  response = csv_export.dict_writer_response(downloaded_file_name, org_keys, organisms)
  return response