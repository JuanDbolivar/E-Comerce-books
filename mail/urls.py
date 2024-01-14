from django.urls import path, include
from rest_framework import routers
from .views import MailViewSet


router = routers.DefaultRouter()
router.register(r'', MailViewSet, basename='send-email')

urlpatterns = [
    path('', include(router.urls))
]
