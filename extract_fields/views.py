from rest_framework.response import Response
from rest_framework.views import APIView
from .serializer import AuthorYearGenderSerialiezer
from books.models import Books

# Create your views here.


class ListAuthorsYearsGendersViews(APIView):
    def get(self, request):
        authors = Books.objects.values_list('author', flat=True).distinct()
        years = Books.objects.values_list('year', flat=True).distinct()
        genders = Books.objects.values_list('gender', flat=True).distinct()

        serializer = AuthorYearGenderSerialiezer({
            'authors': authors,
            'years': years,
            'genders': genders,
        })

        return Response(serializer.data)
