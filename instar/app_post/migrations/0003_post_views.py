# Generated by Django 3.0.7 on 2020-06-28 07:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app_post', '0002_auto_20200626_1410'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='views',
            field=models.IntegerField(default=0),
        ),
    ]
