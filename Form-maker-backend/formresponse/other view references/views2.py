import json
from django.shortcuts import render
from formmaker.models import FormCreated, QuestionList, OptionList
from .forms import SubmittedFormResponseForm, SubmittedUserInfoForm
from django.forms import formset_factory
import requests as requa
from uuid import UUID
import re
import numpy

# Create your views here.



def FormResponse(request, url_id):          ## here url_id = Form ID
    form_name = FormCreated.objects.get(url_key=url_id)
    question_list = QuestionList.objects.all().filter(title=url_id)
    option_query = OptionList.objects.all()
    option_list = []
    for i in option_query:
        # print(i.question_id)
        # option_list.append([UUID(str(i.question)), i.option1, i.option2, i.option3, i.option4, i.option5, i.option6, i.option7, i.option8, i.option9])
        option_list.append([i.question_id, i.option1, i.option2, i.option3, i.option4, i.option5, i.option6, i.option7, i.option8, i.option9])

    # print(option_list)
    # print("uuid : ",option_list[0][0])
    # print("uuid : ",option_list[0])
    # print(question_list[0].question_id)
    # if option_list[0][0] == question_list[0].question_id:
    #     print("TREY")
    # else:
    #     print("Fuck")

    # print(type(option_list[0][0]))
    # print(type(option_list[0]))
    # print(type(option_list))

    # print(type(question_list[0].question_id))



    # print(question_list)
    # print(question_list[0].question_type)
    # print("Form Name: ", form_name.form_name)


    if request.method == "POST":
        # print("POSTED", request.POST['name_user'])
        # print("POSTED", request.POST['phoneno'])
        # print("POSTED", request.POST['email'])
        # j=0
        # for i in question_list:
        #     # print(i.question_type)
        #     # if i.question_type == 'ANSWER':
        #         # print("hee")
        #     try:
        #         j+=1
        #         print(i.question_id)
        #         print("POSTED", request.POST['answer_t_{}'.format(j)])
        #     except:
        #         pass
            

            # else:
            #     print("PASS")
        # print("POSTED", request.POST[re.match(r'answer_t_')])

        print("")

        # for i in question_list:
        #     try:

        #         print("POSTED er", request.POST.get('radio_opt_{}'.format(i.question_id)))
        #     except:
        #         pass

            


        # ____________________________________________
        
        
        # print("")
        # print("Checkbox")


            


        # for i in question_list:
        #     # if i.question_type == 'CHECKBOX' or i.question_type == 'RADIO':
        #     if i.question_type == 'CHECKBOX':

        #         print("")
        #         for j in range(9):
        #             try:
        #                 # print("POSTED", request.POST.get('checkbox_opt_{}'.format(i+1)))

        #                 print("POSTED", request.POST.get('checkbox_opt_{0}_{1}'.format(i.question_id, j)))
        #                 # print("POSTED", request.POST.get('checkbox_opt'))
        #             except:
        #                 print("Pass")
        #                 pass
        #     else:
        #         print("Pass")


        # ____________________________________________
                

        # print("POSTED", request.POST.get('radio_opt'))
        # print("POSTED", request.POST['checkbox_opt'])

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

        # submitted_form_response = formset_factory(SubmittedFormResponseForm)
        # for i in range(1, len(question_list)+1):
        #     try:
        #         # print("POSTED", request.POST['answer_t_{}'.format(i)])

        #         submitted_response_answer = {
        #             "answer_given": request.POST['answer_t_{}'.format(i)],
        #             # "options_answer_selected": null,
        #             # "form_id": null,
        #             # "submitted_user_f_id": null,
        #             # "question_id": null
        #         }
        #         submitted_form_response_answer = SubmittedFormResponseForm()
        #     except:
        #         pass

        j=0
        for i in question_list:
            # try:
            # print("POSTED er", request.POST.get('radio_opt_{}'.format(i.question_id)))
            radio_selected = request.POST.get('radio_opt_{}'.format(i.question_id))
            try: 
                radio_selected = radio_selected.split(',')[0]
            except:
                pass
            # print(radio_selected)
            print("")

            username = request.POST['name_user']
            userdat = requa.get("http://127.0.0.1:8000/form_submitted_api/submitteduserinfo/{0}".format(username))
            userdat = userdat.json()
            print(userdat)


            print(i.question_type)
            j+=1
            if i.question_type == "ANSWER":
                # try:
                #     print(i.question_id)
                #     print("POSTED", request.POST['answer_t_{}'.format(j)])

                #     # try:
                    
                #     print(userdat['form_id'])
                #     print(username)
                    
                #     # except: 
                #     #     print("Error uin userdata")
                #     print("hey there")
                submitted_response_answer = {
                    "answer_given": str(request.POST['answer_t_{}'.format(j)]),
                    "options_answer_selected": None,
                    "form_id": userdat['form_id'],
                    "submitted_user_f_id": str(userdat['name_user']),
                    "question_id": i.question_id
                }
                #     # submitted_form_response_answer = SubmittedFormResponseForm(submitted_response_answer)
                #     # print("before valid")
                #     # if submitted_form_response_answer.is_valid():    
                #     #     print("This is valid form")
                #     # submitted_form_response_answer.save()


                r = requa.post('http://127.0.0.1:8000/form_submitted_api/submittedformresponse/', data = submitted_response_answer)
                print(r)
                #     print("After valid")
                # except:
                #     pass
                pass

            elif i.question_type == "RADIO":
            #     # try:
                print(str(radio_selected))
                print(userdat['form_id'])
                print(str(userdat['name_user']))
                print(i.question_id)

                submitted_response_radio = {
                    "answer_given": None,
                    "options_answer_selected": str(radio_selected),
                    "form_id": userdat['form_id'],
                    "submitted_user_f_id": userdat['name_user'],
                    "question_id": i.question_id
                }
                r = requa.post('http://127.0.0.1:8000/form_submitted_api/submittedformresponse/', data = submitted_response_radio)

            #     print("POSTED er", request.POST.get('radio_opt_{}'.format(i.question_id)))
                # except:
                #     pass

            elif i.question_type == "CHECKBOX":
            #     # try:
                arraist = []
                for iii in range(9):
                    arraist.append(str(request.POST.get('checkbox_opt_{0}_{1}'.format(i.question_id, iii))).split(',')[0])
                print(arraist)
                arraist2 = []
                for kk in arraist:
                    if kk!='None':
                        arraist2.append(kk)
                # arraist2 = json.dumps(arraist2)
                # arraist2 = numpy.array(arraist2)
                # arraist3 = []
                # for ik in range((arraist2)):
                #     arraist3.append('"{0}"'.format(arraist2[ik]))



                print([arraist2])
                
                print(type(arraist2))
                # print(type(arraist2))
                submitted_response_checkbox = {
                    "answer_given": None,
                    "options_answer_selected": arraist2,
                    "form_id": str(userdat['form_id']),
                    "submitted_user_f_id": str(userdat['name_user']),
                    "question_id": str(i.question_id)
                }
                # submitted_response_checkbox = json.dumps(submitted_response_checkbox)
                print(submitted_response_checkbox)
                r = requa.post('http://127.0.0.1:8000/form_submitted_api/submittedformresponse/', data=submitted_response_checkbox)
                print(r)
                                        
                # except:
                #     pass
            else:
                pass

            


        



    return render(request, "formresponse/form_response.html", {'form_name':form_name.form_name, 'question_list':question_list, 'option_list': option_list })


def FormComplete(request):
    return render(request, "formresponse/submitionConfo.html" )