from django.urls import path, include
from .views import  CustomUserCreate, UrlsView, UserViewSet, UrlViewSet

urlpatterns = [
    path('urls/', UrlsView.as_view(), name="urls_view"),
    path('user/', CustomUserCreate.as_view(), name="create_user"),
    path('user/<str:username>/', UserViewSet.as_view(), name="see_users"),
    path('rest-auth/', include('rest_auth.urls')),
    path('urls/<int:user_url>/', UrlViewSet.as_view(), name="see_urls"),
]