from datetime import datetime, timezone

from django.contrib.auth import get_user_model
from django.db import models

from app_main.models import BaseModel


def file_path(instance, filename):
    return f'{instance.post.author.id}_{instance.post.author.username}/{instance.post.id}/{filename}'


class Tag(models.Model):
    keyword = models.CharField(max_length=100)


class Post(BaseModel):
    content = models.TextField()
    author = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    tag = models.ManyToManyField(Tag, through='TagPost', through_fields=('post', 'tag'))

    @property
    def main_file(self):
        return self.file_set.first()

    def get_heart_author(self):
        return [heart.author.id for heart in self.heart_set.all()]


class TagPost(models.Model):
    post = models.ForeignKey(Post, on_delete=models.SET_NULL, null=True)
    tag = models.ForeignKey(Tag, on_delete=models.SET_NULL, null=True)


class File(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    file = models.FileField(upload_to=file_path)


class Heart(BaseModel):
    post = models.ForeignKey(Post, on_delete=models.SET_NULL, null=True)
