from django.db import models

class User(models.Model):
    first_name = models.CharField(max_length=40, blank=False)
    last_name = models.CharField(max_length=40, blank=False)
    email = models.EmailField(blank=False)
    password = models.CharField(max_length=191, blank=False)
    USER_SEX_SELECT = (
        ('M', 'Male'),
        ('F', 'Female'),
    )
    sex = models.CharField(max_length=1, choices=USER_SEX_SELECT)
    date_joined = models.DateTimeField(auto_now_add=True)


class Urls(models.Model):
    url = models.TextField(blank=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, blank=False, related_name='user')