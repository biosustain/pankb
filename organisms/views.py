from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader
from .models import Organisms
import json, requests, csv, time
import pandas as pd


# Template renderer for the Organisms table
def organisms(request):
  template = loader.get_template('organisms/Species_list.html')
  family = request.GET.get('family')
  # Adjust filter parameters based on the GET paramater value: ----
  filter_params = {}
  # We want to show only pangenomes with the number of genomes >=30: ----
  filter_params['genomes_num__gte'] = 30
  if family:  # if the family get parameter is set
    filter_params['family'] = family
  # Get the filtered or full table with organisms: ----
  organisms = Organisms.objects.filter(**filter_params).values()
  # In the Microsoft Azure Blob Storage, we actually store python objects that are dictionaries with the list orientation:
  # {"key_1": [value_1, value_2, ..., value_n], "key_2": [value_1, value_2, ..., value_n], ..., "key_n": [value_1, value_2, ..., value_n]}
  # Transform the data first to a dataframe and then back to a dictionary (so that the front-end js will be able to work with the data as in the v.1.0.0): ----
  organisms_pd = pd.DataFrame(list(organisms), index=None)
  organisms_dict = organisms_pd.to_dict(orient='list')
  organisms_json = json.dumps(organisms_dict, default=str)  # json dumps replaces the single quotes with the double ones
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
  organisms = Organisms.objects.filter(**filter_params).values('family', 'species', 'openness', 'genomes_num', 'gene_class_distribution')

  # Create the HttpResponse object with the appropriate CSV header.
  response = HttpResponse(content_type="text/csv")
  response['Content-Disposition'] = f"attachment; filename=" + downloaded_file_name
  writer = csv.DictWriter(response, fieldnames=['family', 'species', 'openness', 'genomes_num', 'gene_class_distribution'])
  writer.writeheader()
  writer.writerows(organisms)
  return response