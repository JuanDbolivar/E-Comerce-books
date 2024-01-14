# models.py (reviews)
from django.db import models
from books.models import Books
from users.models import Users


class Reviews(models.Model):
    commentations = models.TextField()
    book = models.ForeignKey(
        Books, on_delete=models.CASCADE, related_name='book_reviews')
    user = models.ForeignKey(
        Users, on_delete=models.CASCADE, related_name='user_reviews', null=True)

    def __str__(self):
        return self.commentations
