from django.contrib import admin
from .models import Show


@admin.register(Show)
class ShowAdmin(admin.ModelAdmin):
    list_display = ['title', 'date_time', 'location', 'comedian']
    list_filter = ['date_time', 'location']
    search_fields = ['title', 'comedian', 'location']
    ordering = ['-date_time']
