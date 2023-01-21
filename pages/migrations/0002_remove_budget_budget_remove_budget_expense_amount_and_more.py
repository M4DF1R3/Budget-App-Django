# Generated by Django 4.1.4 on 2023-01-21 00:48

import datetime
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('pages', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='budget',
            name='budget',
        ),
        migrations.RemoveField(
            model_name='budget',
            name='expense_amount',
        ),
        migrations.RemoveField(
            model_name='budget',
            name='expense_description',
        ),
        migrations.AddField(
            model_name='budget',
            name='amount',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=10),
        ),
        migrations.AddField(
            model_name='budget',
            name='month',
            field=models.DateField(default=datetime.date.today),
        ),
        migrations.AddField(
            model_name='budget',
            name='user',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.CreateModel(
            name='Expense',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('amount', models.DecimalField(decimal_places=2, default=0, max_digits=10)),
                ('description', models.CharField(max_length=255)),
                ('date', models.DateField()),
                ('budget', models.ForeignKey(default=0, on_delete=django.db.models.deletion.CASCADE, to='pages.budget')),
            ],
        ),
    ]
