# Generated by Django 5.0.4 on 2024-04-18 14:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('practice', '0009_alter_article_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='article',
            name='published',
            field=models.DateTimeField(auto_now_add=True),
        ),
    ]