# serializer(book)
from rest_framework import serializers
from .models import Books, Reviews
from users.serializer import UsersSerializer


class ReviewSerializer(serializers.ModelSerializer):
    user = UsersSerializer()

    class Meta:
        model = Reviews
        fields = ['commentations', 'user']


class BooksSerializer(serializers.ModelSerializer):
    reviews = ReviewSerializer(many=True, read_only=True)

    class Meta:
        model = Books
        fields = '__all__'
