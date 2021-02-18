from django.db import models
import uuid
# Create your models here.

class FormCreated(models.Model):
    form_name = models.CharField(max_length=100)
    url_key = models.UUIDField(primary_key=True, default=uuid.uuid4, unique=True, blank=True)

class QuestionList(models.Model):
    title = models.ForeignKey(FormCreated, on_delete=models.CASCADE)
    question = models.CharField(max_length=2000)

class OptionList(models.Model):
    question = models.ForeignKey(QuestionList, on_delete=models.CASCADE)
    answer = models.CharField(max_length=10000, blank=True)
    option1 = models.CharField(max_length=100, blank=True)
    option2 = models.CharField(max_length=100, blank=True)
    option3 = models.CharField(max_length=100, blank=True)
    option4 = models.CharField(max_length=100, blank=True)
    option5 = models.CharField(max_length=100, blank=True)

