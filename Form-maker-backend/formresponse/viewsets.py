from rest_framework import viewsets, permissions
from .serializers import SubmittedUserInfoSerializer, SubmittedFormResponseSerializer
from .models import SubmittedUserInfo, SubmittedFormResponse
# Create your views here.


class SubmittedUserInfoViewset(viewsets.ModelViewSet):
    queryset = SubmittedUserInfo.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = SubmittedUserInfoSerializer


class SubmittedFormResponseViewset(viewsets.ModelViewSet):
    queryset = SubmittedFormResponse.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = SubmittedFormResponseSerializer
