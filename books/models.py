# models.py (books)
from django.db import models


class Books(models.Model):
    title = models.CharField(max_length=100)
    author = models.CharField(max_length=100)
    gender = models.CharField(max_length=50)
    image = models.TextField()
    year = models.IntegerField()
    price = models.FloatField()
    pages = models.IntegerField()
    active = models.BooleanField(default=True)
    description = models.TextField()

    def __str__(self):
        return self.title


class Reviews(models.Model):
    book = models.ForeignKey(
        Books, related_name='reviews', on_delete=models.CASCADE)
    commentations = models.TextField()

    def __str__(self):
        return f'Review for{self.book.title}'
