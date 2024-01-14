from rest_framework import viewsets, filters
from .models import Users
from .serializer import UsersSerializer


class UserViewset(viewsets.ModelViewSet):
    queryset = Users.objects.all()
    serializer_class = UsersSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['name', 'banned', 'id_books']
