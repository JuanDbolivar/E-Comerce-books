from django.urls import path
from .views import save_stripe_info

urlpatterns = [
    path('save-stripe-info/', save_stripe_info, name='save_stripe_info')
]
