# Generated by Django 3.1.5 on 2021-02-18 14:58

from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='FormCreated',
            fields=[
                ('form_name', models.CharField(max_length=100)),
                ('url_key', models.UUIDField(blank=True, default=uuid.uuid4, primary_key=True, serialize=False, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='QuestionList',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('question', models.CharField(max_length=2000)),
                ('title', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='formmaker.formcreated')),
            ],
        ),
        migrations.CreateModel(
            name='OptionList',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('answer', models.CharField(blank=True, max_length=10000)),
                ('option1', models.CharField(blank=True, max_length=100)),
                ('option2', models.CharField(blank=True, max_length=100)),
                ('option3', models.CharField(blank=True, max_length=100)),
                ('option4', models.CharField(blank=True, max_length=100)),
                ('option5', models.CharField(blank=True, max_length=100)),
                ('question', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='formmaker.questionlist')),
            ],
        ),
    ]
