from rest_framework import serializers
from .models import Users
from books.serializer import BooksSerializer


class UsersSerializer(serializers.ModelSerializer):
    purchased_books = BooksSerializer(many=True, read_only=True)

    class Meta:
        model = Users
        fields = ['id', 'name', "email", "purchased_books", "banned"]
