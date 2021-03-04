import json
from django.shortcuts import redirect, render
from formmaker.models import FormCreated, QuestionList, OptionList
from .models import SubmittedUserInfo
from .forms import SubmittedFormResponseForm, SubmittedUserInfoForm
from django.forms import formset_factory
import requests as requa
from uuid import UUID
import re
import time

# Create your views here.
def FormResponse(request, url_id):  # here url_id = Form ID
    form_name = FormCreated.objects.get(url_key=url_id)
    question_list = QuestionList.objects.all().filter(title=url_id)
    option_query = OptionList.objects.all()

    form_status = form_name.form_status
    # form_status2 = True             ## For time being




    option_list = []
    for i in option_query:
        option_list.append([i.question_id, i.option1, i.option2, i.option3,
                            i.option4, i.option5, i.option6, i.option7, i.option8, i.option9])
    # for i in form:
    #     print(i.form_status)
    try:
        if request.method == "POST":

            userinfo_data = {
                "form_id": str(form_name.url_key),
                "name_user": request.POST['name_user'],
                "phone_no": request.POST['phoneno'],
                "email": request.POST['email']
            }
            submitted_user_info = SubmittedUserInfoForm(userinfo_data)
            if submitted_user_info.is_valid():
                print("This is valid form")
                submitted_user_info.save()


            time.sleep(1)

            j = 0
            for i in question_list:
                radio_selected = request.POST.get(
                    'radio_opt_{}'.format(i.question_id))
                try:
                    radio_selected = radio_selected.split(',')[0]
                except:
                    pass
                
                username = request.POST['name_user']
                print(username)
                print(form_name.url_key)
                user_data = SubmittedUserInfo.objects.all().filter(form_id=form_name.url_key).filter(name_user=username)
                print(user_data)
                len_user_data = len(user_data) - 1
                # print(user_data[0].submitted_user_id)

                ## I know the following is unecessary as user_id can be directly taken from the output of the models but let it be for now.

                try:
                    # userdat = requa.get(
                    #     "http://127.0.0.1:8000/form_submitted_api/submitteduserinfo/{0}".format(user_data.submitted_user_id))
                    userdat = requa.get(
                        "https://form-maker-backend.herokuapp.com/form_submitted_api/submitteduserinfo/{0}".format(user_data.submitted_user_id))
                except:
                    # userdat = requa.get(
                    #     "http://127.0.0.1:8000/form_submitted_api/submitteduserinfo/{0}".format(user_data[len_user_data].submitted_user_id))
                    userdat = requa.get(
                        "https://form-maker-backend.herokuapp.com/form_submitted_api/submitteduserinfo/{0}".format(user_data[len_user_data].submitted_user_id))

                userdat = userdat.json()
                print(userdat)

                j += 1
                if i.question_type == "text":
                    # try:
                    submitted_response_answer = {
                        "answer_given": request.POST['answer_t_{}'.format(j)],
                        "options_answer_selected": None,
                        "form_id": userdat['form_id'],
                        "submitted_user_f_id": userdat['submitted_user_id'],
                        "question_id": i.question_id
                    }

                    # r = requa.post(
                    #     'http://127.0.0.1:8000/form_submitted_api/submittedformresponse/', data=submitted_response_answer)
                    r = requa.post(
                        'https://form-maker-backend.herokuapp.com/form_submitted_api/submittedformresponse/', data=submitted_response_answer)

                    # print(r)
                    # except:
                    #     pass

                elif i.question_type == "radio":
                    # try:
                    submitted_response_radio = {
                        "answer_given": None,
                        "options_answer_selected": radio_selected,
                        "form_id": userdat['form_id'],
                        "submitted_user_f_id": userdat['submitted_user_id'],
                        "question_id": i.question_id
                    }
                    print(submitted_response_radio)
                    # r = requa.post(
                    #     'http://127.0.0.1:8000/form_submitted_api/submittedformresponse/', data=submitted_response_radio)
                    r = requa.post(
                        'https://form-maker-backend.herokuapp.com/form_submitted_api/submittedformresponse/', data=submitted_response_radio)
                    print("radio", r)
                    # except:
                    #     pass

                elif i.question_type == "checkbox":
                    # print(i.question)
                    # try:
                    arraist = []
                    for iii in range(9):
                        print(str(request.POST.get('checkbox_opt_{0}_{1}'.format(i.question_id, iii))).split(',')[0])
                        arraist.append(str(request.POST.get('checkbox_opt_{0}_{1}'.format(i.question_id, iii))).split(',')[0])
                    arraist2 = []
                    print(arraist)
                    for kk in arraist:
                        if kk != 'None':
                            arraist2.append(kk)
                    print(arraist2)
                        
                    # print(type(arraist2))
                    # print(type(['sdf','asf']))

                    submitted_response_checkbox = {
                        "answer_given": None,
                        "options_answer_selected": arraist2,
                        "form_id": userdat['form_id'],
                        "submitted_user_f_id": userdat['submitted_user_id'],
                        "question_id": str(i.question_id)
                    }
                    # submitted_response_checkbox = json.dumps(submitted_response_checkbox)

                    print(submitted_response_checkbox)
                    # r = requa.post(
                    #     'http://127.0.0.1:8000/form_submitted_api/submittedformresponse/', data=submitted_response_checkbox)

                    r = requa.post(
                        'https://form-maker-backend.herokuapp.com/form_submitted_api/submittedformresponse/', data=submitted_response_checkbox)
                    print(r)
                    # except:
                    #     pass
                else:
                    pass
            if request.POST['name_user']:
                return redirect('formresponse:form_response_submitted')
    except:
        return redirect('formresponse:form_response_error')     ## redirect to the same page 



        
    return render(request, "formresponse/form_response.html", {'form_name': form_name.form_name, 'question_list': question_list, 'option_list': option_list, 'form_status':form_status})


def FormComplete(request):
    return render(request, "formresponse/submitionConfo.html")



def FormError(request):
    return render(request, "formresponse/submitionError.html")