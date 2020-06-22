from django.contrib.auth.models import AbstractUser
from django.db import models
from django.conf import settings
class CustomUser(AbstractUser):
    fav_color = models.CharField(blank=True, max_length=120)

class Url(models.Model):
    urls = models.CharField(blank=True, max_length=191)
    user_url = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)