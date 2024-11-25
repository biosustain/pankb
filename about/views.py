from django.shortcuts import render

# Create your views here.

from django.http import HttpResponse
from django.template import loader

def about(request):
  template = loader.get_template('about/about.html')
  return HttpResponse(template.render())
