# models.py (user)
from django.db import models


class Users(models.Model):
    id = models.CharField(max_length=30, primary_key=True)
    name = models.CharField(max_length=20)
    # password = models.CharField(max_length=20)
    email = models.EmailField()
    banned = models.BooleanField(default=False)
    id_books = models.IntegerField(null=True, blank=True)
    titlle_book = models.TextField(max_length=50, blank=True)

    def __str__(self):
        return self.name
