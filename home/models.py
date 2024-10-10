from django.db import models

# Model representing info on the Organisms page: ----
class Statistics(models.Model):
   _id = models.CharField(max_length=24, primary_key=True)
   date = models.DateTimeField()
   pankb_dimensions = models.JSONField()
   species_genome_gene = models.JSONField()
   organism_genome_count = models.JSONField()
   organism_gene_count = models.JSONField()
   treemap = models.JSONField()

   class Meta:
       managed = True  # tells Django not to manage the table’s creation, modification, and deletion
       db_table = 'pankb_stats'
