# views.py (reviews)
from rest_framework import viewsets
from .models import Reviews
from .serializer import ReviewsSerializer


class ReviewsViewSet(viewsets.ModelViewSet):
    queryset = Reviews.objects.all()
    serializer_class = ReviewsSerializer
