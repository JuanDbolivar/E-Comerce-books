from django.contrib import admin
from .models import Reviews

# Register your models here.
# admin.site.register(Reviews)


@admin.register(Reviews)
class AdminReviews(admin.ModelAdmin):
    list_display = ['commentations', 'book', 'user']
    list_filter=['book','user']
    search_fields=['book']
