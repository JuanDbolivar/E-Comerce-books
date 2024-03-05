from rest_framework import serializers
from .models import Users
from books.models import Books


class UsersSerializer(serializers.ModelSerializer):
    purchased_books = serializers.PrimaryKeyRelatedField(
        many=True,
        queryset=Books.objects.all(),
        required=False
    )

    class Meta:
        model = Users
        fields = ['id', 'name', "email", "purchased_books", "banned"]
