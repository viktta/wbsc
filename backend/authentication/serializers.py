from rest_framework import serializers
from .models import CustomUser,Url

class CustomUserSerializer(serializers.ModelSerializer):
    """
    Currently unused in preference of the below.
    """
    email = serializers.EmailField(
        required=True
    )
    username = serializers.CharField()
    password = serializers.CharField(min_length=8)

    class Meta:
        model = CustomUser
        fields = ('email', 'username', 'password')

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)  # as long as the fields are the same, we can just use this
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

class CustomUrlSerializer(serializers.ModelSerializer):
    user = CustomUser.objects.all()
    class Meta:
        model = Url
        fields = ('urls','user_url')
        extra_kwargs = {'user_url': {'read_only': True}}