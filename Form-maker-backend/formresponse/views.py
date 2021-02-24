from django.shortcuts import render

# Create your views here.



def FormResponse(request):
    return render(request, "formresponse/form_response.html")


def FormComplete(request):
    return render(request, "formresponse/submitionConfo.html" )