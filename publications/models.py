from django.db import models

class Publication(models.Model):
    _id = models.CharField(max_length=24, primary_key=True)
    source = models.CharField(max_length=100)
    title = models.CharField(max_length=400)

    class Meta:
        managed = False  # tells Django to manage the table’s creation, modification, and deletion
        db_table = 'pankb_publications'
