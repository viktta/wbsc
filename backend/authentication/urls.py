from django.urls import path
from rest_framework_simplejwt import views as jwt_views
from .views import UrlsView, User, ObtainTokenPairWithColorView


urlpatterns = [
    path('urls/', UrlsView.as_view(), name="urls_view"),
    path('user/', User.as_view(), name='user_view'),
    path('token/obtain/', ObtainTokenPairWithColorView.as_view(), name='token_create'),
    path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
]
