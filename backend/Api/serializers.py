from rest_framework import serializers
from .models import User, Urls

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'email', 'password', 'sex', 'date_joined']

class UrlSerializer(serializers.ModelSerializer):

    class Meta:
        model = Urls
        fields = ['url', 'user', 'id', 'name']