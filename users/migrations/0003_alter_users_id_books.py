# Generated by Django 5.0.1 on 2024-01-12 03:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0002_users_id_books'),
    ]

    operations = [
        migrations.AlterField(
            model_name='users',
            name='id_books',
            field=models.IntegerField(blank=True, null=True),
        ),
    ]
