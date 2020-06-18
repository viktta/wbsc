from rest_framework import serializers
from .models import Url, User



class CustomUrlSerializer(serializers.ModelSerializer):
    user = User.objects.all()
    class Meta:
        model = Url
        fields = ('urls','users',)
   
class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('__all__')

