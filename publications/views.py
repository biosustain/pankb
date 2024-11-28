from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader
from django.conf import settings
import json, requests, io
import pandas as pd


# Template renderer for the Publications page
def publications(request):
  template = loader.get_template('publications/publications.html')
  # The script producing the csv file with the list of pulications
  # is contained under /misc subfolder
  # and may not be included under the version control
  # contact liupa@dtu.dk for the questions.
  url = settings.AZURE_WEB_DATA_URL + 'publications_v2_short.csv'
  r = requests.get(url)
  dataset_df = pd.read_csv(io.StringIO(r.content.decode('utf-8')), sep='\t')   # better never use comma as a separator here (as words in titles and authors' names can be separated by commas)
  dataset_dict = dataset_df.to_dict(orient='records')
  # Compose a context for the template rendering
  context = {
    'dataset': json.dumps(dataset_dict)
  }
  return HttpResponse(template.render(context, request))