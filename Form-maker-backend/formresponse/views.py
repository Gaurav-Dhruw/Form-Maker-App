import json
from django.shortcuts import redirect, render
from formmaker.models import FormCreated, QuestionList, OptionList
from .forms import SubmittedFormResponseForm, SubmittedUserInfoForm
from django.forms import formset_factory
import requests as requa
from uuid import UUID
import re

# Create your views here.

def FormResponse(request, url_id):          ## here url_id = Form ID
    form_name = FormCreated.objects.get(url_key=url_id)
    question_list = QuestionList.objects.all().filter(title=url_id)
    option_query = OptionList.objects.all()
    option_list = []
    for i in option_query:
        option_list.append([i.question_id, i.option1, i.option2, i.option3, i.option4, i.option5, i.option6, i.option7, i.option8, i.option9])



    if request.method == "POST":

        userinfo_data = {
            "form_id" : str(form_name.url_key),
            "name_user": request.POST['name_user'],
            "phone_no": str(request.POST['phoneno']),
            "email": request.POST['email']
        }
        submitted_user_info = SubmittedUserInfoForm(userinfo_data)
        if submitted_user_info.is_valid():    
            print("This is valid form")
            submitted_user_info.save()


        j=0
        for i in question_list:
            radio_selected = request.POST.get('radio_opt_{}'.format(i.question_id))
            try: 
                radio_selected = radio_selected.split(',')[0]
            except:
                pass

            username = request.POST['name_user']
            userdat = requa.get("http://127.0.0.1:8000/form_submitted_api/submitteduserinfo/{0}".format(username))
            userdat = userdat.json()

            j+=1
            if i.question_type == "ANSWER":
                try:
                    submitted_response_answer = {
                        "answer_given": str(request.POST['answer_t_{}'.format(j)]),
                        "options_answer_selected": None,
                        "form_id": userdat['form_id'],
                        "submitted_user_f_id": str(userdat['name_user']),
                        "question_id": i.question_id
                    }

                    r = requa.post('http://127.0.0.1:8000/form_submitted_api/submittedformresponse/', data = submitted_response_answer)
                    # print(r)
                except:
                    pass

            elif i.question_type == "RADIO":
                try:
                    submitted_response_radio = {
                        "answer_given": None,
                        "options_answer_selected": str(radio_selected),
                        "form_id": userdat['form_id'],
                        "submitted_user_f_id": userdat['name_user'],
                        "question_id": i.question_id
                    }
                    r = requa.post('http://127.0.0.1:8000/form_submitted_api/submittedformresponse/', data = submitted_response_radio)

                except:
                    pass

            elif i.question_type == "CHECKBOX":
                try:
                    arraist = []
                    for iii in range(9):
                        arraist.append(str(request.POST.get('checkbox_opt_{0}_{1}'.format(i.question_id, iii))).split(',')[0])
                    arraist2 = []
                    for kk in arraist:
                        if kk!='None':
                            arraist2.append(kk)

                    submitted_response_checkbox = {
                        "answer_given": None,
                        "options_answer_selected": arraist2,
                        "form_id": str(userdat['form_id']),
                        "submitted_user_f_id": str(userdat['name_user']),
                        "question_id": str(i.question_id)
                    }
                    # print(submitted_response_checkbox)
                    r = requa.post('http://127.0.0.1:8000/form_submitted_api/submittedformresponse/', data=submitted_response_checkbox)
                    # print(r)
                except:
                    pass
            else:
                pass
        if request.POST['name_user']:   
            return redirect('formresponse:form_response_submitted')
            
    return render(request, "formresponse/form_response.html", {'form_name':form_name.form_name, 'question_list':question_list, 'option_list': option_list })


def FormComplete(request):
    return render(request, "formresponse/submitionConfo.html" )