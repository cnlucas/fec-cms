# Generated by Django 2.2.19 on 2021-03-16 16:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0112_auto_20210112_1100'),
    ]

    operations = [
        migrations.AlterField(
            model_name='custompage',
            name='conditional_js',
            field=models.CharField(blank=True, choices=[('statistical_summary', 'statistical-summary.js'), ('statistical_summary-archive', 'statistical-summary-archive.js')], help_text='Choose a JS script to add only to this page', max_length=255, null=True),
        ),
    ]
