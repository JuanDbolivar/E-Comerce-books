# Generated by Django 5.0.1 on 2024-01-12 04:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('books', '0002_alter_books_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='books',
            name='active',
            field=models.BooleanField(default=True),
        ),
    ]
