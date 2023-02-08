from datetime import datetime, timezone
from hashlib import sha256

from django.contrib.auth import get_user_model
from django.db import models


def file_path(instance, filename):
    hash_value = sha256(f"USER_{instance.post.author_id}".encode()).hexdigest()
    return f'{hash_value}/POST_{instance.post_id}_{filename}'


class Tag(models.Model):
    keyword = models.CharField(max_length=100)


class Post(models.Model):
    content = models.TextField()
    tag = models.ManyToManyField(Tag, through='TagPost', through_fields=('post', 'tag'))
    views = models.IntegerField(default=0)

    author = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

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


class Heart(models.Model):
    post = models.ForeignKey(Post, on_delete=models.SET_NULL, null=True)

    author = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)