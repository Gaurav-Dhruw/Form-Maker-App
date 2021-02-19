from rest_framework import serializers
from .models import FormCreated, QuestionList, OptionList

class FormCreatedSerializer(serializers.ModelSerializer):
    class Meta:
        model = FormCreated
        fields = "__all__"

class QuestionListSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuestionList
        fields = "__all__"

class OptionListSerializer(serializers.ModelSerializer):
    class Meta:
        model = OptionList
        fields = "__all__"