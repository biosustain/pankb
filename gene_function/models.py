from djongo import models

# Model for the Gene Info table content
class GeneInfo(models.Model):
    _id = models.CharField(max_length=24, primary_key=True)
    gene = models.CharField(max_length=15)
    locus_tag = models.CharField(max_length=30)
    genome_id = models.CharField(max_length=15)
    protein = models.CharField(max_length=150)
    start_position = models.IntegerField()
    end_position = models.IntegerField()
    nucleotide_seq = models.TextField()
    aminoacid_seq = models.TextField()
    pangenome_analyses = models.CharField(max_length=40)
    species = models.CharField(max_length=40)
    class Meta:
        managed = True  # tells Django to manage the table’s creation, modification, and deletion
        db_table = 'gene_info'
        indexes = [
            models.Index(fields=['gene'])
        ]

# Model for the Genome Info table content
class GenomeInfo(models.Model):
   _id = models.CharField(max_length=24, primary_key=True)
   genome_id = models.CharField(max_length=15)
   strain = models.CharField(max_length=100)
   isolation_source = models.CharField(max_length=50)
   country = models.CharField(max_length=30)
   geo_loc_name = models.CharField(max_length=100)
   gc_content = models.FloatField()
   genome_len = models.IntegerField()
   gene_class_distribution = models.CharField(max_length=20)
   antismash_url = models.CharField(max_length=150)
   pangenome_analyses = models.CharField(max_length=40)
   species = models.CharField(max_length=40)
   class Meta:
       managed = True  # tells Django to manage the table’s creation, modification, and deletion
       db_table = 'genome_info'
       indexes = [
           models.Index(fields=['genome_id']),
           models.Index(fields=['strain'])
       ]


class PathwayInfo(models.Model):
   _id = models.CharField(max_length=24, primary_key=True)
   pathway_id = models.CharField(max_length=15)
   pathway_name = models.CharField(max_length=100)
   strain = models.CharField(max_length=100)
   species = models.CharField(max_length=40)
   product = models.CharField(max_length=150)
   genome_id = models.CharField(max_length=15)
   gene = models.CharField(max_length=500)
   pangenome_analyses = models.CharField(max_length=40)
   class Meta:
       managed = True  # tells Django to manage the table’s creation, modification, and deletion
       db_table = 'pathway_info'
       indexes = [
           models.Index(fields=['pathway_id']),
           models.Index(fields=['pathway_name']),
           models.Index(fields=['strain', 'species']),
           models.Index(fields=['gene']),
           models.Index(fields=['product'])
       ]