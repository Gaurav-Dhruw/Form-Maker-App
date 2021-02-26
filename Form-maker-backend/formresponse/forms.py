from django.db import models
from django.db.models import fields
from .models import SubmittedUserInfo, SubmittedFormResponse
from django import forms

class SubmittedUserInfoForm(forms.ModelForm):
    class Meta:
        model = SubmittedUserInfo
        fields = ['form_id', 'name_user', 'phone_no', 'email']


class SubmittedFormResponseForm(forms.ModelForm):
    class Meta:
        model = SubmittedFormResponse
        fields = '__all__'


