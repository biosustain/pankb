from django.http import HttpResponse
from django.template import loader
import json
from .models import Publication


# Template renderer for the Publications page
def publications(request):
    template = loader.get_template("publications/publications.html")

    publications = Publication.objects.find(projection=["title", "source"])
    publications = list(publications)

    # Compose a context for the template rendering
    context = {"dataset": json.dumps(publications)}
    return HttpResponse(template.render(context, request))
