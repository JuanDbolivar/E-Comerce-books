# serializer(book)
from rest_framework import serializers
from .models import Books, Reviews


class ReviewSerializer(serializers.ModelSerializer):
    user_name = serializers.CharField()

    class Meta:
        model = Reviews
        fields = '__all__'


class BooksSerializer(serializers.ModelSerializer):
    reviews = ReviewSerializer(
        many=True, read_only=True, source='book_reviews')

    class Meta:
        model = Books
        fields = '__all__'
