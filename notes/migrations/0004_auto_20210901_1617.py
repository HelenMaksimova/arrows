# Generated by Django 3.1 on 2021-09-01 16:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('notes', '0003_note_is_active'),
    ]

    operations = [
        migrations.AlterField(
            model_name='project',
            name='repository',
            field=models.URLField(blank=True, default='', verbose_name='link to repository'),
            preserve_default=False,
        ),
    ]
