from django.contrib import admin
from .models import FormCreated, QuestionList, OptionList

# Register your models here.

admin.site.register(FormCreated)
admin.site.register(QuestionList)
admin.site.register(OptionList)
