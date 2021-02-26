# Generated by Django 3.1.5 on 2021-02-24 16:12

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('formmaker', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='SubmittedUserInfo',
            fields=[
                ('submitted_user_id', models.UUIDField(auto_created=True, blank=True, primary_key=True, serialize=False)),
                ('name_user', models.CharField(max_length=200)),
                ('phone_no', models.CharField(max_length=10)),
                ('email', models.EmailField(blank=True, max_length=254)),
                ('form_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='formmaker.formcreated')),
            ],
        ),
        migrations.CreateModel(
            name='SubmittedFormResponse',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('answer_given', models.CharField(max_length=20000)),
                ('option_answer_selected', models.CharField(max_length=1000)),
                ('form_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='formmaker.formcreated')),
                ('question_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='formmaker.questionlist')),
                ('submitted_user_f_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='formresponse.submitteduserinfo')),
            ],
        ),
    ]