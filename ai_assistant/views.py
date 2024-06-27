from django.shortcuts import render

# Create your views here.

from django.http import HttpResponse
from django.template import loader
import os

def ai_assistant(request):
  template = loader.get_template('ai_assistant/ai_assistant.html')
  # The url of the separately deployed AI Assistant web application is included into the render context
  # as a env variable: ----
  return HttpResponse(template.render(context={'AI_ASSISTANT_APP_URL': os.environ.get('AI_ASSISTANT_APP_URL')}))
