# Generated by Django 5.0.4 on 2024-04-18 14:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('practice', '0010_alter_article_published'),
    ]

    operations = [
        migrations.AlterField(
            model_name='article',
            name='content',
            field=models.CharField(max_length=5000),
        ),
    ]
