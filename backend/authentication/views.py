from rest_framework import status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import viewsets
from .models import Url
from .models import User as UserModel
from rest_framework.authentication import BasicAuthentication

from .serializers import CustomUrlSerializer, CustomUserSerializer





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


class User(APIView):
    def get(self, request, format=None):
        user = UserModel.objects.all()
        serializer = CustomUserSerializer(user, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = CustomUserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
