"""
URL configuration for comedy_shows project.
"""
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('shows.urls')),
]
