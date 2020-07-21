from rest_framework import status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Url,CustomUser
from .serializers import  CustomUserSerializer, CustomUrlSerializer, RetrieveUserInfo
from rest_framework import viewsets, generics
from django.shortcuts import get_object_or_404

class CustomUserCreate(APIView):
    permission_classes = (permissions.AllowAny,)
    def get(self, request, format=None):
        user = CustomUser.objects.all()
        serializer = CustomUserSerializer(user, many=True)
        return Response(serializer.data)
    def post(self, request, format='json'):
        serializer = CustomUserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            if user:
                json = serializer.data
                return Response(json, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class MultipleFieldLookupMixin(object):
    """
    Apply this mixin to any view or viewset to get multiple field filtering
    based on a `lookup_fields` attribute, instead of the default single field filtering.
    """
    def get_object(self):
        queryset = self.get_queryset()             # Get the base queryset
        queryset = self.filter_queryset(queryset)  # Apply any filter backends
        filter = {}
        for field in self.lookup_fields:
            if self.kwargs[field]: # Ignore empty fields.
                filter[field] = self.kwargs[field]
        obj = get_object_or_404(queryset, **filter)  # Lookup the object
        self.check_object_permissions(self.request, obj)
        return objv

class UserViewSet(MultipleFieldLookupMixin,generics.RetrieveAPIView):
    permission_classes = (permissions.AllowAny,)
    queryset = CustomUser.objects.all()
    serializer_class = RetrieveUserInfo
    lookup_fields = ['username', 'password']
    

class UrlsView(APIView):
   permission_classes = [permissions.IsAuthenticatedOrReadOnly]
   def get(self, request, format=None):
        urls = Url.objects.all()
        serializer = CustomUrlSerializer(urls, many=True)
        return Response(serializer.data)
   def post(self, request):
        serializer = CustomUrlSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(user_url=request.user)
        return Response(status=status.HTTP_201_CREATED)
