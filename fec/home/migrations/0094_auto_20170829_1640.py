# -*- coding: utf-8 -*-
# Generated by Django 1.10.7 on 2017-08-29 16:40
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('wagtailredirects', '0005_capitalizeverbose'),
        ('wagtailforms', '0003_capitalizeverbose'),
        ('wagtailsearchpromotions', '0002_capitalizeverbose'),
        ('wagtailcore', '0032_add_bulk_delete_page_permission'),
        ('home', '0093_merge_20170814_2229'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='folder',
            name='page_ptr',
        ),
        migrations.DeleteModel(
            name='Folder',
        ),
    ]
