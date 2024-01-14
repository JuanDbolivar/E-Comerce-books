# views(books)
from rest_framework import viewsets, filters, pagination
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializer import BooksSerializer
from .serializer import ReviewSerializer
from .models import Books

# Create your views here.


class BooksPagination(pagination.PageNumberPagination):
    page_size = 10
    page_query_param = 'page_size'
    max_page_size = 30


class BooksViewSet(viewsets.ModelViewSet):
    queryset = Books.objects.all()
    serializer_class = BooksSerializer
    pagination_class = BooksPagination
    filter_backends = [filters.SearchFilter]
    search_fields = ['title', 'author', 'year', 'gender']
    ordering_fields = ['price', 'title']
    ordering = ['-price', '-title']

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)

        comments_queryset = instance.book_reviews.all()
        comments_serializer = ReviewSerializer(comments_queryset, many=True)

        data = serializer.data
        data['comments'] = comments_serializer.data

        return Response(data)
