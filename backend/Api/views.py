from django.shortcuts import render
from .models import User, Urls 
from .serializers import UserSerializer
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import permissions


class UserView(generics.ListCreateAPIView):
    permission_classes = [permissions.AllowAny]

    queryset = User.objects.all()
    serializer_class = UserSerializer

    def list(self, request):
        queryset = self.get_queryset()
        serializer = UserSerializer(queryset, many=True)
        return Response(serializer.data)