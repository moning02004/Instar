from django.contrib.auth import get_user_model
from django.db import models

from apps.post.models import Post


class Comment(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    origin = models.ForeignKey('self', on_delete=models.SET_NULL, null=True, related_name='sub_comment', blank=True)
    comment = models.ForeignKey('self', on_delete=models.SET_NULL, null=True, related_name='replies', blank=True)
    content = models.TextField()

    author = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    def get_heart_author(self):
        return [heart.author.id for heart in self.commentheart_set.all()]


class CommentHeart(models.Model):
    comment = models.ForeignKey(Comment, on_delete=models.SET_NULL, null=True)

    author = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
