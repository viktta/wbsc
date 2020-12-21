from django.shortcuts import render
from .models import User, Urls
from .serializers import UserSerializer, UrlSerializer
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import permissions
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from rest_framework import viewsets


class UserView(generics.ListCreateAPIView):
    permission_classes = [permissions.AllowAny]

    queryset = User.objects.all()
    serializer_class = UserSerializer

    def list(self, request):
        queryset = self.get_queryset()
        serializer = UserSerializer(queryset, many=True)
        return Response(serializer.data)


class UrlView(generics.ListCreateAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = Urls.objects.all()
    serializer_class = UrlSerializer

    def list(self, request):
        queryset = self.get_queryset()
        serializer = UrlSerializer(queryset, many=True)
        return Response(serializer.data)


class UrlRetrieveView(viewsets.ModelViewSet):
    permission_classes = [permissions.AllowAny]
    serializer_class = UrlSerializer

    def get_queryset(self):
        urls = Urls.objects.all()
        return urls

    def retrieve(self, request, *args, **kwargs):
        params = kwargs
        user = Urls.objects.filter(user=params['pk'])
        serializer = UrlSerializer(user, many=True)
        return Response(serializer.data)


class UserRetrieveView(viewsets.ModelViewSet):
    permission_classes = [permissions.AllowAny]
    serializer_class = UserSerializer

    def get_queryset(self):
        user = User.objects.all()
        return user

    def retrieve(self, request, *args, **kwargs):
        params = kwargs
        user = User.objects.filter(id=params['pk'])
        serializer = UserSerializer(user, many=True)
        return Response(serializer.data)


class urlEditDelete(generics.RetrieveUpdateDestroyAPIView, viewsets.ModelViewSet):
    queryset = Urls.objects.all()
    serializer_class = UrlSerializer

    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        urls = Urls.objects.all()
        return urls

    def retrieve(self, request, *args, **kwargs):
        params = kwargs
        user = Urls.objects.filter(id=params['pk'])
        serializer = UrlSerializer(user, many=True)
        return Response(serializer.data)
