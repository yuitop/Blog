# Generated by Django 5.0.4 on 2024-04-21 12:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('practice', '0016_alter_article_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='article',
            name='image',
            field=models.ImageField(default='', upload_to='images'),
        ),
    ]
