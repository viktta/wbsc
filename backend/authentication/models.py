from django.contrib.auth.models import AbstractUser
from django.db import models


class CustomUser(AbstractUser):
    fav_color = models.CharField(blank=True, max_length=120)

class Url(models.Model):
    urls = models.CharField(blank=True, max_length=200,)