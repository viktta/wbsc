from django.urls import path, include
from .views import (UserView, UrlView, UrlRetrieveView, UserRetrieveView, urlEditDelete, LogoutAndBlacklistRefreshTokenForUserView)
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework_simplejwt import views as jwt_views
urlpatterns = [
    path('users/', UserView.as_view(), name='user_list'),
    path('urls/', UrlView.as_view(), name='urls_list'),
    path('urls/<int:pk>/', UrlRetrieveView.as_view({'get': 'retrieve'}), name='urls_list_by_id'),
    path('users/<int:pk>/', UserRetrieveView.as_view({'get': 'retrieve'}), name='user_list_by_id'),
    path('urls/edit/<int:pk>/', urlEditDelete.as_view({'get': 'retrieve'}), name='urls-edit-list-by-id'),
    path('token/obtain/', TokenObtainPairView.as_view(), name='token_create'),
    path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('blacklist/', LogoutAndBlacklistRefreshTokenForUserView.as_view(), name='blacklist'),
]