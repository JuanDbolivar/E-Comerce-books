from django.contrib import admin
from .models import Books

# Register your models here.
# admin.site.register(Books)


@admin.register(Books)
class AdminBooks(admin.ModelAdmin):
    list_display = ["title", "author", "gender", "active"]
    list_filter = ["author", "gender", "active"]
    search_fields = ["title", "author"]
    ordering = ['price']
