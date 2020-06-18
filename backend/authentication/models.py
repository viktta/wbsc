from django.db import models
from django.contrib.auth.models import User
from django.contrib.auth.models import AbstractUser
class Url(models.Model):
    urls = models.CharField(blank=True, max_length=191)

class User(AbstractUser):
    fav_color = models.CharField(blank=True, max_length=120)
