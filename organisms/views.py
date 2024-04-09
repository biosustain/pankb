from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader
from .models import Organisms
import json, requests
import pandas as pd


def organisms(request):
  template = loader.get_template('organisms/Species_list.html')
  family = request.GET.get('family')
  # Adjust filter parameters based on the GET paramater value: ----
  filter_params = {}
  if family: # if the family
    filter_params['family'] = family
  # Get the filtered or full table with organisms: ----
  organisms = Organisms.objects.filter(**filter_params).values()
  # In the Microsoft Azure Blob Storage, we actually store python objects that are dictionaries with the list orientation:
  # {"key_1": [value_1, value_2, ..., value_n], "key_2": [value_1, value_2, ..., value_n], ..., "key_n": [value_1, value_2, ..., value_n]}
  # Transform the data back first to the dataframe and then back to the dictionary (so that the front-end js will be able to work with the data as in the v.1.0.0): ----
  organisms_pd = pd.DataFrame(list(organisms), index=None)
  organisms_dict = organisms_pd.to_dict(orient='list')
  organisms_json = json.dumps(organisms_dict, default=str)  # json dumps replaces the single quotes with the double ones
  # Compose the render context: ----
  context = {
    'dataset': organisms_json
  }
  return HttpResponse(template.render(context, request))