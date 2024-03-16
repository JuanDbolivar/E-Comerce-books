# serializers.py (reviews)
from rest_framework import serializers
from .models import Reviews
from books.models import Books


class ReviewsSerializer(serializers.ModelSerializer):
    book_id = serializers.PrimaryKeyRelatedField(
        queryset=Books.objects.all(), source='book', write_only=True)
    user_name = serializers.CharField( read_only=True)

    class Meta:
        model = Reviews
        fields = ['id', 'commentations', 'book_id', 'user_name', 'book']
