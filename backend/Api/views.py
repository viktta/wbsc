from django.shortcuts import render
from .models import User, Urls
from .serializers import UserSerializer, UrlSerializer, MyTokenObtainPairSerializer
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import permissions, status
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from rest_framework import viewsets
from rest_framework.authentication import TokenAuthentication
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView


class UserView(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()

    def post(self, request, format='json'):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            if user:
                json = serializer.data
                return Response(json, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ObtainTokenView(TokenObtainPairView):
    permission_classes = (permissions.AllowAny,)
    serializer_class = MyTokenObtainPairSerializer


class LogoutAndBlacklistRefreshTokenForUserView(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()

    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class UrlView(generics.ListCreateAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = Urls.objects.all()
    serializer_class = UrlSerializer

    def list(self, request):
        queryset = self.get_queryset()
        serializer = UrlSerializer(queryset, many=True)
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
