"""django_project URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.urls import path
from django.views.generic import TemplateView

from home import views as home_views
from about import views as about_views
from publications import views as publications_views
from organisms import views as organisms_views
from pangenome_analyses import views as pangenome_analyses_views
from gene_function import views as gene_function_views
from search import views as search_views

import json, requests


urlpatterns = [
    path('robots.txt', TemplateView.as_view(template_name='robots.txt', content_type="text/plain")),
    path('', home_views.home, name='home'),
    path('plots/dimension.html', TemplateView.as_view(template_name="home/plots/dimension.html",
                                                      extra_context={'dataset': json.dumps(requests.get('https://pankb.blob.core.windows.net/data/PanKB/web_data/pankb_dimension.json').json())}),
         name="dimension"),
    path('plots/organism_genome_number.html', TemplateView.as_view(template_name="home/plots/organism_genome_number.html",
                                                                   extra_context={'dataset': json.dumps(requests.get('https://pankb.blob.core.windows.net/data/PanKB/web_data/organism_genome_count.json').json())}),
         name="organism_genome_number"),
    path('plots/organism_gene_number.html', TemplateView.as_view(template_name="home/plots/organism_gene_number.html",
                                                                 extra_context={'dataset': json.dumps(requests.get('https://pankb.blob.core.windows.net/data/PanKB/web_data/organism_gene_count.json').json())}),
         name="organism_gene_number"),
    path('plots/genome_gene.html', TemplateView.as_view(template_name="home/plots/genome_gene.html",
                                                        extra_context={'dataset': json.dumps(requests.get('https://pankb.blob.core.windows.net/data/PanKB/web_data/species_genome_gene.json').json())}),
         name="genome_gene"),
    path('plots/treemap.html', TemplateView.as_view(template_name="home/plots/treemap.html",
                                                    extra_context={'dataset': json.dumps(requests.get('https://pankb.blob.core.windows.net/data/PanKB/web_data/treemap_data.json').json())}),
         name="treemap"),
    path('about/', about_views.about, name='about'),
    path('publications/', publications_views.publications, name='publications'),
    path('organisms/', organisms_views.organisms, name='organisms'),
    path('pangenome_analyses/overview/', pangenome_analyses_views.overview, name='pangenome_analyses_overview'),
    path('heaps_law/', pangenome_analyses_views.heaps_law, name='heaps_law'),
    path('cumulative_freq/', pangenome_analyses_views.cumulative_freq, name='cumulative_freq'),
    path('gene_annotation_distribution/', pangenome_analyses_views.gene_annotation_distribution, name='gene_annotation_distribution'),
    path('gene_freq/', pangenome_analyses_views.gene_freq, name='gene_freq'),
    path('hotmap/', pangenome_analyses_views.hotmap, name='hotmap'),
    path('variant_dominant_freq/', pangenome_analyses_views.variant_dominant_freq, name='variant_dominant_freq'),
    path('ds_dn_ratio/', pangenome_analyses_views.ds_dn_ratio, name='ds_dn_ratio'),
    path('pangenome_analyses/gene_annotation/', pangenome_analyses_views.gene_annotation, name='pangenome_analyses_gene_annotation'),
    path('pangenome_analyses/phylogenetic_tree/', pangenome_analyses_views.phylogenetic_tree, name='pangenome_analyses_phylogenetic_tree'),
    path('phylotree_plot/', pangenome_analyses_views.phylotree_plot, name='phylotree_plot'),
    path('gene_function/gene_info/', gene_function_views.gene_info, name='gene_info'),
    path('aa_pos_overview/', gene_function_views.aa_pos_overview, name='aa_pos_overview'),
    path('msa/', gene_function_views.msa, name='msa'),
    path('gene_function/genome_info/', gene_function_views.genome_info, name='genome_info'),
    path('genome_barplot/', gene_function_views.genome_barplot, name='genome_barplot'),
    path('gene_function/genome_gene_info/', gene_function_views.genome_gene_info, name='genome_gene_info'),
    path("search/", search_views.search_results, name="search_results")
    #path('admin/', admin.site.urls)   # make the amdin panel inaccessible via its utl (the admin admin is preserved for the potential future needs)
]