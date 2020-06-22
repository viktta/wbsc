from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Url
from .serializers import MyTokenObtainPairSerializer, CustomUserSerializer, CustomUrlSerializer

class ObtainTokenPairWithColorView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class CustomUserCreate(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format='json'):
        serializer = CustomUserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            if user:
                json = serializer.data
                return Response(json, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class HelloWorldView(APIView):

    def get(self, request):
        return Response(data={"hello":"world"}, status=status.HTTP_200_OK)


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
