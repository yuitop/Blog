# Generated by Django 5.0.4 on 2024-04-21 15:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('practice', '0018_alter_article_image'),
    ]

    operations = [
        migrations.AddField(
            model_name='article',
            name='hidden',
            field=models.BooleanField(default=False),
        ),
    ]
