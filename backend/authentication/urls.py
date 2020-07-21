from django.urls import path
from .views import  CustomUserCreate, UrlsView, UserViewSet

urlpatterns = [
    path('urls/', UrlsView.as_view(), name="urls_view"),
    path('user/', CustomUserCreate.as_view(), name="create_user"),
    path('user/<slug:username>/<slug:password>', UserViewSet.as_view(), name="create_user"),

]