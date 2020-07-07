from django.contrib import admin
from .models import CustomUser

class Admin(admin.ModelAdmin):
    pass
admin.site.register(CustomUser, Admin)
