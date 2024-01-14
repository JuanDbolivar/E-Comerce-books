# serializers.py (reviews)
from rest_framework import serializers
from .models import Reviews
from users.serializer import UsersSerializer


class ReviewsSerializer(serializers.ModelSerializer):
    user_name = serializers.SerializerMethodField()

    def get_user_name(self, obj):
        return obj.user.name if obj.user else None

    class Meta:
        model = Reviews
        fields = ['id', 'commentations', 'book', 'user_name']
