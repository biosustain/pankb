# Generated by Django 3.0.8 on 2024-06-03 12:11

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='GeneInfo',
            fields=[
                ('_id', models.CharField(max_length=24, primary_key=True, serialize=False)),
                ('gene', models.CharField(max_length=20)),
                ('locus_tag', models.CharField(max_length=30)),
                ('genome_id', models.CharField(max_length=15)),
                ('protein', models.CharField(max_length=150)),
                ('start_position', models.IntegerField()),
                ('end_position', models.IntegerField()),
                ('nucleotide_seq', models.TextField()),
                ('aminoacid_seq', models.TextField()),
                ('pangenome_analysis', models.CharField(max_length=40)),
                ('species', models.CharField(max_length=40)),
            ],
            options={
                'db_table': 'pankb_gene_info',
                'managed': True,
            },
        ),
        migrations.CreateModel(
            name='GenomeInfo',
            fields=[
                ('_id', models.CharField(max_length=24, primary_key=True, serialize=False)),
                ('genome_id', models.CharField(max_length=15)),
                ('strain', models.CharField(max_length=100)),
                ('isolation_source', models.CharField(max_length=50)),
                ('country', models.CharField(max_length=30)),
                ('geo_loc_name', models.CharField(max_length=100)),
                ('gc_content', models.FloatField()),
                ('genome_len', models.IntegerField()),
                ('gene_class_distribution', models.CharField(max_length=20)),
                ('antismash_url', models.CharField(max_length=150)),
                ('pangenome_analysis', models.CharField(max_length=40)),
                ('species', models.CharField(max_length=40)),
            ],
            options={
                'db_table': 'pankb_genome_info',
                'managed': True,
            },
        ),
        migrations.CreateModel(
            name='PathwayInfo',
            fields=[
                ('_id', models.CharField(max_length=24, primary_key=True, serialize=False)),
                ('pathway_id', models.CharField(max_length=15)),
                ('pathway_name', models.CharField(max_length=100)),
                ('strain', models.CharField(max_length=100)),
                ('species', models.CharField(max_length=40)),
                ('product', models.CharField(max_length=150)),
                ('genome_id', models.CharField(max_length=15)),
                ('gene', models.CharField(max_length=20)),
                ('pangenomic_class', models.CharField(max_length=9)),
                ('pangenome_analysis', models.CharField(max_length=40)),
            ],
            options={
                'db_table': 'pankb_pathway_info',
                'managed': True,
            },
        ),
        migrations.AddIndex(
            model_name='pathwayinfo',
            index=models.Index(fields=['pathway_id', 'pathway_name', 'product'], name='pankb_pathw_pathway_ac2da7_idx'),
        ),
        migrations.AddIndex(
            model_name='pathwayinfo',
            index=models.Index(fields=['pangenome_analysis', 'gene', 'genome_id'], name='pankb_pathw_pangeno_428747_idx'),
        ),
        migrations.AddIndex(
            model_name='pathwayinfo',
            index=models.Index(fields=['pathway_id', 'strain'], name='pankb_pathw_pathway_08444e_idx'),
        ),
        migrations.AddIndex(
            model_name='genomeinfo',
            index=models.Index(fields=['pangenome_analysis', 'genome_id'], name='pankb_genom_pangeno_585b17_idx'),
        ),
        migrations.AddIndex(
            model_name='genomeinfo',
            index=models.Index(fields=['pangenome_analysis', 'strain'], name='pankb_genom_pangeno_3d2b91_idx'),
        ),
        migrations.AddIndex(
            model_name='geneinfo',
            index=models.Index(fields=['pangenome_analysis', 'gene'], name='pankb_gene__pangeno_600595_idx'),
        ),
        migrations.AddIndex(
            model_name='geneinfo',
            index=models.Index(fields=['pangenome_analysis', 'genome_id'], name='pankb_gene__pangeno_b34a63_idx'),
        ),
    ]