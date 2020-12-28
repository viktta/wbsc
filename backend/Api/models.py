from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    pass

class Urls(models.Model):
    url = models.TextField(blank=True)
    name = models.CharField(blank=True, max_length=191)
    user = models.ForeignKey(User, on_delete=models.CASCADE, blank=False)
