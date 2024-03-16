from django.contrib import admin
from .models import Reviews

# Register your models here.
# admin.site.register(Reviews)


@admin.register(Reviews)
class AdminReviews(admin.ModelAdmin):
    list_display = ['commentations', 'book', ]
    list_filter=['book']
    search_fields=['book']
