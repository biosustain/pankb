# Generated by Django 3.0.8 on 2024-06-03 12:11

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='GeneAnnotations',
            fields=[
                ('_id', models.CharField(max_length=24, primary_key=True, serialize=False)),
                ('gene', models.CharField(max_length=15)),
                ('cog_category', models.CharField(max_length=1)),
                ('cog_name', models.CharField(max_length=100)),
                ('description', models.TextField()),
                ('protein', models.CharField(max_length=150)),
                ('pfams', models.CharField(max_length=100)),
                ('frequency', models.IntegerField()),
                ('pangenomic_class', models.CharField(max_length=9)),
                ('pangenome_analysis', models.CharField(max_length=40)),
                ('species', models.CharField(max_length=40)),
            ],
            options={
                'db_table': 'pankb_gene_annotations',
                'managed': True,
            },
        ),
        migrations.AddIndex(
            model_name='geneannotations',
            index=models.Index(fields=['pangenome_analysis'], name='pankb_gene__pangeno_8d4593_idx'),
        ),
        migrations.AddIndex(
            model_name='geneannotations',
            index=models.Index(fields=['gene', 'protein'], name='pankb_gene__gene_36d7ba_idx'),
        ),
    ]
