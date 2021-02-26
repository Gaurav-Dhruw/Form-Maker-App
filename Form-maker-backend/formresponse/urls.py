from django.urls import path, include
from .views import FormResponse
from rest_framework import routers
from .viewsets import SubmittedUserInfoViewset, SubmittedFormResponseViewset
app_name = 'formresponse'


router = routers.DefaultRouter()
router.register(r'submitteduserinfo', SubmittedUserInfoViewset)
router.register(r'submittedformresponse', SubmittedFormResponseViewset)


urlpatterns = [
    path('form_submitted_api/', include(router.urls)), 
    path('<uuid:url_id>', FormResponse, name="formresponse"), 
]