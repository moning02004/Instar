from django.contrib.auth import get_user_model
from django.db import models

from api_post.models import Post


class Comment(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    author = models.ForeignKey(get_user_model(), on_delete=models.SET_NULL, null=True)
    head = models.ForeignKey('self', on_delete=models.SET_NULL, null=True, related_name='header')
    who = models.ForeignKey('self', on_delete=models.SET_NULL, null=True, related_name='to')
    content = models.CharField(max_length=250)

