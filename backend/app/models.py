from django.db import models

# Create your models here.
class React(models.Model):
    item = models.CharField(max_length=30)
    description = models.CharField(max_length=200)