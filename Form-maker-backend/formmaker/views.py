from django.shortcuts import render
from rest_framework import viewsets, permissions
from .serializers import FormCreatedSerializer, OptionListSerializer, QuestionListSerializer
from .models import FormCreated, OptionList, QuestionList
# Create your views here.


class FormCreatedViewset(viewsets.ModelViewSet):
    queryset = FormCreated.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = FormCreatedSerializer

class QuestionListViewset(viewsets.ModelViewSet):
    queryset = QuestionList.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = QuestionListSerializer


class OptionListViewset(viewsets.ModelViewSet):
    queryset = OptionList.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = OptionListSerializer