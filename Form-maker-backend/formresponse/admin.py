from django.contrib import admin
from .models import SubmittedUserInfo, SubmittedFormResponse
# Register your models here.

admin.site.register(SubmittedFormResponse)
admin.site.register(SubmittedUserInfo)