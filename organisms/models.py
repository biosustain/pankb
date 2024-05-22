from djongo import models

# Model representing info on the Organisms page: ----
class Organisms(models.Model):
   _id = models.CharField(max_length=24, primary_key=True)
   family = models.CharField(max_length=30)
   species = models.CharField(max_length=40)
   openness = models.CharField(max_length=6)   # ('Open' or 'Closed'), used CharField here instead of boolean to facilitate the parsing
   gene_class_distribution = models.CharField(max_length=20)
   genomes_num = models.IntegerField()
   pangenome_analysis = models.CharField(max_length=40)

   class Meta:
       managed = True  # tells Django not to manage the table’s creation, modification, and deletion
       db_table = 'pankb_organisms'
