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

from django.urls import path
from django.views.generic import TemplateView

from home import views as home_views
from about import views as about_views
from publications import views as publications_views
from organisms import views as organisms_views
from pangenome_analyses import views as pangenome_analyses_views
from gene_function import views as gene_function_views
from search import views as search_views
from ai_assistant import views as ai_assistant_views
from interop_query import views as interop_views


urlpatterns = [
    path(
        "robots.txt",
        TemplateView.as_view(template_name="robots.txt", content_type="text/plain"),
    ),
    path("", home_views.home, name="home"),
    path("about/", about_views.about, name="about"),
    path("publications/", publications_views.publications, name="publications"),
    path("organisms/", organisms_views.organisms, name="organisms"),
    path(
        "pangenome_analyses/overview/",
        pangenome_analyses_views.overview,
        name="pangenome_analyses_overview",
    ),
    path(
        "pangenome_analyses/overview/csv/",
        organisms_views.download_organisms_table_csv,
        name="download_organisms_table_csv",
    ),
    path("heaps_law/", pangenome_analyses_views.heaps_law, name="heaps_law"),
    path(
        "cumulative_freq/",
        pangenome_analyses_views.cumulative_freq,
        name="cumulative_freq",
    ),
    path(
        "gene_annotation_distribution/",
        pangenome_analyses_views.gene_annotation_distribution,
        name="gene_annotation_distribution",
    ),
    path("gene_freq/", pangenome_analyses_views.gene_freq, name="gene_freq"),
    path("hotmap/", pangenome_analyses_views.hotmap, name="hotmap"),
    path("hotmap/data/", pangenome_analyses_views.hotmap_data, name="hotmap_data"),
    path(
        "hotmap/csv/",
        pangenome_analyses_views.download_matrix_csv,
        name="download_matrix_csv",
    ),
    path(
        "variant_dominant_freq/",
        pangenome_analyses_views.variant_dominant_freq,
        name="variant_dominant_freq",
    ),
    path("ds_dn_ratio/", pangenome_analyses_views.ds_dn_ratio, name="ds_dn_ratio"),
    path(
        "pangenome_analyses/gene_annotation/",
        pangenome_analyses_views.gene_annotation,
        name="pangenome_analyses_gene_annotation",
    ),
    path(
        "pangenome_analyses/gene_annotation/json/",
        pangenome_analyses_views.gene_annotation_json,
        name="pangenome_analyses_gene_annotation_json",
    ),
    path(
        "pangenome_analyses/gene_annotation/csv/",
        pangenome_analyses_views.download_gene_annotation_table_csv,
        name="download_gene_annotation_table_csv",
    ),
    path(
        "pangenome_analyses/genome/",
        pangenome_analyses_views.genome,
        name="pangenome_analyses_genome",
    ),
    path(
        "pangenome_analyses/genome/csv/",
        pangenome_analyses_views.download_genome_info_table_csv,
        name="download_genome_info_table_csv",
    ),
    path(
        "pangenome_analyses/genome/json/",
        pangenome_analyses_views.genome_json,
        name="pangenome_analyses_genome_json",
    ),
    path(
        "pangenome_analyses/phylogenetic_tree/",
        pangenome_analyses_views.phylogenetic_tree,
        name="pangenome_analyses_phylogenetic_tree",
    ),
    path(
        "phylotree_plot/",
        pangenome_analyses_views.phylotree_plot,
        name="phylotree_plot",
    ),
    path("gene_function/gene_info/", gene_function_views.gene_info, name="gene_info"),
    path(
        "gene_function/gene_info/csv/",
        gene_function_views.download_gene_info_table_csv,
        name="download_gene_info_table_csv",
    ),
    path(
        "aa_pos_overview/", gene_function_views.aa_pos_overview, name="aa_pos_overview"
    ),
    path("msa/", gene_function_views.msa, name="msa"),
    path(
        "gene_function/genome_info/",
        gene_function_views.genome_info,
        name="genome_info",
    ),
    path(
        "gene_function/genome_info/genes/csv/",
        gene_function_views.download_genome_info_gene_table_csv,
        name="download_genome_info_gene_table_csv",
    ),
    path("genome_barplot/", gene_function_views.genome_barplot, name="genome_barplot"),
    path(
        "gene_function/genome_gene_info/",
        gene_function_views.genome_gene_info,
        name="genome_gene_info",
    ),
    path(
        "gene_function/pathway_info/",
        gene_function_views.pathway_info,
        name="pathway_info",
    ),
    path(
        "gene_function/pathway_info/genes/json/",
        gene_function_views.pathway_gene_annotation_json,
        name="pathway_info_genes_json",
    ),
    path("search/", search_views.search_results, name="search_results"),
    path(
        "search/genomes_json/",
        search_views.genomes_json,
        name="search_genomes_json",
    ),
    path(
        "search/genes_json/",
        search_views.gene_annotation_json,
        name="search_genes_json",
    ),
    path(
        "search/family/csv/",
        search_views.download_search_family_csv,
        name="download_search_family_csv",
    ),
    path(
        "search/species/csv/",
        search_views.download_search_species_csv,
        name="download_search_species_csv",
    ),
    path(
        "search/pathway/csv/",
        search_views.download_search_pathway_csv,
        name="download_search_pathway_csv",
    ),
    path(
        "search/genomes/csv/",
        search_views.download_search_genomes_csv,
        name="download_search_genomes_csv",
    ),
    path(
        "search/genes/csv/",
        search_views.download_search_genes_csv,
        name="download_search_genes_csv",
    ),
    path("ai_assistant/", ai_assistant_views.ai_assistant, name="ai_assistant"),
    path("interop-query/query-by-strain", interop_views.query_by_strain, name="query_by_strain"),
    path("interop-query/query-by-gene", interop_views.query_by_gene, name="query_by_gene"),
    path("interop-query/query-by-pair", interop_views.query_by_pair, name="query_by_pair"),

    # path('admin/', admin.site.urls)   # make the amdin panel inaccessible via its utl (the admin admin is preserved for the potential future needs)
]
