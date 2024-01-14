from django.urls import path
from .views import ListAuthorsYearsGendersViews

urlpatterns = [
    path('list/', ListAuthorsYearsGendersViews.as_view(),
         name='list_authors_years_genders'),
]
