from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader
import json, requests, io
import pandas as pd


# Template renderer for the Publications page
def publications(request):
  template = loader.get_template('publications/Publications.html')
  url = 'https://pankb.blob.core.windows.net/data/PanKB/web_data/publications.csv'    # the url of the respective json file stored on the Microsoft Azure Blob Storage
  r = requests.get(url)
  dataset_df = pd.read_csv(io.StringIO(r.content.decode('utf-8')))
  dataset_dict = dataset_df.to_dict(orient='records')
  # Compose a context for the template rendering
  context = {
    'dataset': json.dumps(dataset_dict)
  }
  return HttpResponse(template.render(context, request))