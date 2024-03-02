# Generated by Django 5.0.1 on 2024-03-02 03:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('books', '0006_alter_books_price'),
        ('users', '0007_alter_users_titlle_book'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='users',
            name='purchased_books',
        ),
        migrations.RemoveField(
            model_name='users',
            name='titlle_book',
        ),
        migrations.AddField(
            model_name='users',
            name='books',
            field=models.ManyToManyField(blank=True, to='books.books'),
        ),
        migrations.AlterField(
            model_name='users',
            name='email',
            field=models.EmailField(default='', max_length=254),
        ),
    ]
