# Generated by Django 3.0.8 on 2024-06-03 12:11

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Organisms',
            fields=[
                ('_id', models.CharField(max_length=24, primary_key=True, serialize=False)),
                ('family', models.CharField(max_length=30)),
                ('species', models.CharField(max_length=40)),
                ('openness', models.CharField(max_length=6)),
                ('gene_class_distribution', models.CharField(max_length=20)),
                ('genomes_num', models.IntegerField()),
                ('pangenome_analysis', models.CharField(max_length=40)),
            ],
            options={
                'db_table': 'pankb_organisms',
                'managed': True,
            },
        ),
    ]
