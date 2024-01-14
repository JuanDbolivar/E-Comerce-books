# books/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import BooksViewSet

router = DefaultRouter()
router.register(r'', BooksViewSet)


urlpatterns = [
    path('', include(router.urls)),
]
