# Generated by Django 5.0.1 on 2024-02-16 00:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0004_users_titlle_book'),
    ]

    operations = [
        migrations.AlterField(
            model_name='users',
            name='banned',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='users',
            name='id',
            field=models.CharField(max_length=30, primary_key=True, serialize=False),
        ),
    ]
