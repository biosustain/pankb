from djongo import models

# Model representing info on the Organisms page: ----
class GeneAnnotations(models.Model):
   _id = models.CharField(max_length=24, primary_key=True)
   gene = models.CharField(max_length=15)
   cog_category = models.CharField(max_length=1)
   cog_name = models.CharField(max_length=100)
   description = models.CharField(max_length=255)
   protein = models.CharField(max_length=150)
   pfams = models.CharField(max_length=100)
   frequency = models.IntegerField()
   pangenomic_class = models.CharField(max_length=9)      # Core, Accessory (9 symbols) or Rare
   pangenome_analyses = models.CharField(max_length=40)
   species = models.CharField(max_length=40)

   class Meta:
       managed = True  # tells Django to manage the table’s creation, modification, and deletion
       db_table = 'gene_annotations'
       indexes = [
           models.Index(fields=['gene', 'protein']) # create a compound index on the fields to facilitate the filter() operations
       ]
