# Generated by Django 5.0.4 on 2024-04-18 13:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('practice', '0008_alter_article_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='article',
            name='image',
            field=models.ImageField(default='/images/placeholder.jpg', upload_to='images'),
        ),
    ]