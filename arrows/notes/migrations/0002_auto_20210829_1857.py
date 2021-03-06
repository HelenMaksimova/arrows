# Generated by Django 3.1 on 2021-08-29 18:57

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('notes', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='project',
            name='users',
            field=models.ManyToManyField(related_name='projects', related_query_name='project', to=settings.AUTH_USER_MODEL, verbose_name='project staff'),
        ),
    ]
