from django.shortcuts import render
from formmaker.models import FormCreated, QuestionList, OptionList
from uuid import UUID
# Create your views here.



def FormResponse(request, url_id):          ## here url_id = Form ID
    form_name = FormCreated.objects.get(url_key=url_id)
    question_list = QuestionList.objects.all().filter(title=url_id)
    option_query = OptionList.objects.all()
    option_list = []
    for i in option_query:
        # print(i)
        option_list.append([UUID(str(i.question)), i.option1, i.option2, i.option3, i.option4, i.option5, i.option6])
    print(option_list)
    print("uuid : ",option_list[0][0])
    print("uuid : ",option_list[0])
    print(question_list[0].question_id)
    if option_list[0][0] == question_list[0].question_id:
        print("TREY")
    else:
        print("Fuck")

    print(type(option_list[0][0]))
    # print(type(option_list[0]))
    # print(type(option_list))

    print(type(question_list[0].question_id))



    print(question_list)
    print(question_list[0].question_type)
    print("Form Name: ", form_name.form_name)
    return render(request, "formresponse/form_response.html", {'form_name':form_name.form_name, 'question_list':question_list, 'option_list': option_list })


def FormComplete(request):
    return render(request, "formresponse/submitionConfo.html" )