from django.urls import path
from . import views

urlpatterns = [
    # Show CRUD operations
    path('shows/', views.ShowListCreateView.as_view(), name='show-list-create'),
    path('shows/<str:record_id>/', views.ShowDetailView.as_view(), name='show-detail'),
]
