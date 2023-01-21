from django.db import models

# Create your models here.
class Login(models.Model):
    title = models.CharField(max_length=120) # Max Length require when using CharField
    description = models.TextField(blank=True, null=True)
