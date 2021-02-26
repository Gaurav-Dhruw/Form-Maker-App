from rest_framework import serializers
from .models import SubmittedFormResponse, SubmittedUserInfo

class SubmittedFormResponseSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubmittedFormResponse
        fields = "__all__"


class SubmittedUserInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubmittedUserInfo
        fields = "__all__"

