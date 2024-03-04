# models.py (user)
from django.db import models
from books.models import Books



class Users(models.Model):
    id = models.CharField(max_length=30, primary_key=True)
    name = models.CharField(max_length=20)
    # password = models.CharField(max_length=20)
    email = models.EmailField(default='')
    banned = models.BooleanField(default=False)
    purchased_books = models.ManyToManyField(Books, blank=True)

    def __str__(self):
        return self.name
    
