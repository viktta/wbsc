from django.urls import path
from .views import  CustomUserCreate, UrlsView

urlpatterns = [
    path('urls/', UrlsView.as_view(), name="urls_view"),
    path('user/', CustomUserCreate.as_view(), name="create_user"),
]