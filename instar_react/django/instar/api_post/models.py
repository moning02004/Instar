from django.contrib.auth import get_user_model
from django.db import models


def image_path(instance, filename):
    return f'{instance.user.id}_{instance.user.username}/post/{filename}'


class Tag(models.Model):
    keyword = models.CharField(max_length=30, primary_key=True)

    def __str__(self):
        return self.keyword


class Post(models.Model):
    author = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    content = models.TextField()
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    tag = models.ManyToManyField(Tag, through='TagPost', through_fields=('post', 'tag'))

    def __str__(self):
        return self.author.username


class Image(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    file = models.ImageField(upload_to=image_path)


class TagPost(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    tag = models.ForeignKey(Tag, on_delete=models.CASCADE)


class Heart(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    author = models.ForeignKey(get_user_model(), on_delete=models.SET_NULL, null=True)
    created = models.DateTimeField(auto_now_add=True)
