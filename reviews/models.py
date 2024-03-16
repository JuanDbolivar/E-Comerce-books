# models.py (reviews)
from django.db import models
from books.models import Books


class Reviews(models.Model):
    commentations = models.TextField()
    user_name = models.CharField(max_length=50)

    book = models.ForeignKey(
        Books, on_delete=models.CASCADE, related_name='book_reviews')

    def __str__(self):
        return self.commentations
