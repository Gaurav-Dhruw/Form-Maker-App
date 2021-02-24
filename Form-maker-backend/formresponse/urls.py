from django.urls import path
from .views import FormResponse


urlpatterns = [
    path('<uuid:url_id>', FormResponse, name="formresponse"), 
]