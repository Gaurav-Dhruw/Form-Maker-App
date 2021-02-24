from django.urls import path, include
from rest_framework import routers
from .views import FormCreatedViewset, QuestionListViewset, OptionListViewset

app_name = 'formmaker'

router = routers.DefaultRouter()
router.register(r'formcreated', FormCreatedViewset)
router.register(r'questionlist', QuestionListViewset)
router.register(r'optionlist', OptionListViewset)


urlpatterns = [
    path('', include(router.urls)), 
]