from django.urls import path
from .views import FormResponse


urlpatterns = [
    path('', FormResponse, name="formresponse"), 
]