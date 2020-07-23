from rest_framework import status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Url,CustomUser
from .serializers import  CustomUserSerializer, CustomUrlSerializer, RetrieveUserInfo, CustomUrlSerializerRetrieve
from rest_framework import viewsets, generics


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


class UserViewSet(generics.RetrieveAPIView):
    permission_classes = (permissions.AllowAny,)
    lookup_field = 'username'
    queryset = CustomUser.objects.all()
    serializer_class = RetrieveUserInfo


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


class UrlViewSet(generics.RetrieveAPIView):
    permission_classes = (permissions.AllowAny,)
    lookup_field = 'user_url'
    queryset = Url.objects.all()
    serializer_class = CustomUrlSerializerRetrieve