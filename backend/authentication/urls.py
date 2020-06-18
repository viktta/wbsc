from django.urls import path
from rest_framework_simplejwt import views as jwt_views
from .views import UrlsView, User


urlpatterns = [
    path('urls/', UrlsView.as_view(), name="urls_view"),
    path('user/', User.as_view(), name='user_view'),
]
