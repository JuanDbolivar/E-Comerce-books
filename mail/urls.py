from django.urls import path
from .views import mail_to_send

urlpatterns = [
    path('', mail_to_send, name='send-email'),
]
