from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ShowViewSet

router = DefaultRouter()
router.register(r'shows', ShowViewSet, basename='show')

urlpatterns = [
    path('', include(router.urls)),
]
