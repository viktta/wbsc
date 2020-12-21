from django.db import models


class User(models.Model):
    username = models.CharField(max_length=20, blank=False)
    first_name = models.CharField(max_length=40, blank=False)
    last_name = models.CharField(max_length=40, blank=False)
    email = models.EmailField(blank=False)
    password = models.CharField(max_length=191, blank=False)
    USER_SEX_SELECT = (
        ('M', 'Male'),
        ('F', 'Female'),
    )
    sex = models.CharField(max_length=1, choices=USER_SEX_SELECT, blank=True)
    date_joined = models.DateTimeField(auto_now_add=True)


class Urls(models.Model):
    url = models.TextField(blank=True)
    name = models.CharField(blank=True, max_length=191)
    user = models.ForeignKey(User, on_delete=models.CASCADE, blank=False)
