from django.urls import path, include
from .views import UserView, UrlView, UrlRetrieveView

urlpatterns = [
    path('users/', UserView.as_view(), name='user_list'),
    path('urls/', UrlView.as_view(), name='urls_list'),
    path('urls/<int:pk>/', UrlRetrieveView.as_view({'get': 'retrieve'}), name='user_list_by_id'),
]