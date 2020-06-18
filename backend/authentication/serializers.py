from rest_framework import serializers
from .models import Url, User



class CustomUrlSerializer(serializers.ModelSerializer):
    user = User.objects.all()
    class Meta:
        model = Url
        fields = ('urls','user_url')
        extra_kwargs = {'user_url': {'read_only': True}}
   
class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('__all__')

