from django.db import models
import uuid
# Create your models here.



class FormCreated(models.Model):
    form_name = models.CharField(max_length=100)
    url_key = models.UUIDField(primary_key=True, default=uuid.uuid4, unique=True, blank=True)
    form_status = models.BooleanField(default=True)

    def __str__(self):
        return self.form_name

class QuestionList(models.Model):

    OPTIONS = (
        ("text","text"),
        ("radio","radio"),
        ("checkbox","checkbox")
    )

    title = models.ForeignKey(FormCreated, on_delete=models.CASCADE)
    question = models.CharField(max_length=2000, unique=False)                              ## Temporarily this is primary key whixh must be shifted to q_uuid
    question_type = models.CharField(max_length=100, choices=OPTIONS, default="ANSWER")
    question_id = models.UUIDField(primary_key=True, default=uuid.uuid4, auto_created=True, blank=True) #  unique=True,

    def __str__(self):
        return str(self.question)

    def __repr__(self):
        return str(self.question_id)


class OptionList(models.Model):
    question = models.ForeignKey(QuestionList, on_delete=models.CASCADE)
    # answer = models.CharField(max_length=20000, blank=True, null=True)
    option1 = models.CharField(max_length=1000, blank=True, null=True)
    option2 = models.CharField(max_length=1000, blank=True, null=True)
    option3 = models.CharField(max_length=1000, blank=True, null=True)
    option4 = models.CharField(max_length=1000, blank=True, null=True)
    option5 = models.CharField(max_length=1000, blank=True, null=True)
    option6 = models.CharField(max_length=1000, blank=True, null=True)
    option7 = models.CharField(max_length=1000, blank=True, null=True)
    option8 = models.CharField(max_length=1000, blank=True, null=True)
    option9 = models.CharField(max_length=1000, blank=True, null=True)
    # option10 = models.CharField(max_length=1000, blank=True)

    # def __str__(self):
    #     return self.question




