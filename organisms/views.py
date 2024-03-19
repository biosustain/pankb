from django.shortcuts import render

# Create your views here.

from django.http import HttpResponse
from django.template import loader
import json, requests

def organisms(request):
  template = loader.get_template('organisms/Species_list.html')
  url = "https://pankb.blob.core.windows.net/data/PanKB/web_data/species_list.json"    # the url of the respective json file stored on the Microsoft Azure Blob Storage
  r = requests.get(url)
  json_obj = r.json()
  # Compose a context for the template rendering
  context = {
    'dataset': json.dumps(json_obj)
  }
  return HttpResponse(template.render(context, request))

