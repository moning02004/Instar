# Generated by Django 3.0.7 on 2020-06-26 05:10

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('app_comment', '0004_comment_origin'),
        ('app_post', '0002_auto_20200626_1410'),
        ('app_report', '0004_report'),
    ]

    operations = [
        migrations.AlterField(
            model_name='report',
            name='comment',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='app_comment.Comment'),
        ),
        migrations.AlterField(
            model_name='report',
            name='post',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='app_post.Post'),
        ),
    ]
