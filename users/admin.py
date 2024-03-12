from django.contrib import admin
from .models import Users

# Register your models here.
# admin.site.register(Users)


@admin.register(Users)
class AdminUsers(admin.ModelAdmin):
    list_display = ['id', 'name', 'email', 'banned']
    list_filter = ['banned']
    search_fields = ['id', 'name',]
    ordering = ['id', 'name',]
