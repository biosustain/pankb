from django.shortcuts import render

# Create your views here.

from django.http import HttpResponse
from django.template import loader

def ai_assistant(request):
  template = loader.get_template('ai_assistant/ai_assistant.html')
  return HttpResponse(template.render())
