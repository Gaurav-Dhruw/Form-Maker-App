from django.db import models
from formmaker.models import QuestionList
from django.contrib.postgres.fields import ArrayField
import uuid

# Create your models here.


class SubmittedUserInfo(models.Model):
    form_id = models.ForeignKey("formmaker.FormCreated", on_delete=models.CASCADE)
    submitted_user_id = models.UUIDField(primary_key=True, default=uuid.uuid4, auto_created=True, blank=True, unique=True) # , null=True
    name_user = models.CharField(max_length=200)
    phone_no = models.CharField(max_length=10, blank=True)
    email = models.EmailField(blank=True)

    def __str__(self):
        return self.name_user


class SubmittedFormResponse(models.Model):
    form_id = models.ForeignKey("formmaker.FormCreated", on_delete=models.CASCADE)
    submitted_user_f_id = models.ForeignKey("SubmittedUserInfo", on_delete=models.CASCADE)
    question_id = models.ForeignKey("formmaker.QuestionList", on_delete=models.CASCADE)
    answer_given = models.CharField(max_length=20000, null=True, blank=True)
    # option_answer_selected = models.CharField(max_length=1000)       ## Make it a ArrayField
    options_answer_selected =  ArrayField(models.CharField(max_length=10, blank=True), size=9, null=True, blank=True)

    # def __str__(self):
    #     return self.submitted_user_f_id

