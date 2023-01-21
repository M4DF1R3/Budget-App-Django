from django.db import models
from django.contrib.auth.models import User
from datetime import date

class Budget(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, default=1)
    amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    month = models.DateField(default=date.today)
    
class Expense(models.Model):
    budget = models.ForeignKey(Budget, on_delete=models.CASCADE, default=0)
    amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    description = models.CharField(max_length=255)
    date = models.DateField()
