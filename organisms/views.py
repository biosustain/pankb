from django.http import HttpResponse
from django.template import loader
from .models import Organisms
import json, csv, time

HIGHLIGHTED_SPECIES = ["Bacillus_subtilis", "Escherichia_coli", "Limosilactobacillus_reuteri", "Pseudomonas_E_putida", "Streptomyces_albidoflavus", "Vibrio_natriegens"]

# Template renderer for the Organisms table
def organisms(request):
  template = loader.get_template('organisms/species.html')
  family = request.GET.get('family')
  # Adjust filter parameters based on the GET paramater value: ----
  filter_params = {}
  if family:  # if the family get parameter is set
    filter_params['family'] = family
  # Get the filtered or full table with organisms: ----
  org_keys = ['family', 'species', 'pangenome_analysis', 'openness', 'genomes_num', 'gene_class_distribution']
  organisms = Organisms.objects.find(filter_params, org_keys)

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
  # Adjust filter parameters based on the GET paramater value: ----
  filter_params = {}
  downloaded_file_name = "Organisms" + "__" + time.strftime("%Y-%m-%d_%H-%M") + ".csv"
  if family:  # if the family get parameter is set
    filter_params['family'] = family
    downloaded_file_name = "Organisms__" + family + "__" + time.strftime("%Y-%m-%d_%H-%M") + ".csv"

  # Get the filtered or full table with organisms as a list of dictionaries: ----
  organisms = list(Organisms.objects.find(filter_params, ['family', 'species', 'openness', 'genomes_num', 'gene_class_distribution']))

  # Create the HttpResponse object with the appropriate CSV header.
  response = HttpResponse(content_type="text/csv")
  response['Content-Disposition'] = f"attachment; filename=" + downloaded_file_name
  writer = csv.DictWriter(response, fieldnames=['family', 'species', 'openness', 'genomes_num', 'gene_class_distribution'])
  writer.writeheader()
  writer.writerows(organisms)
  return response