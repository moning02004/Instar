from datetime import datetime, timezone

from django.db import models

from app_main.models import BaseModel


def file_path(instance, filename):
    return f'{instance.post.author.username}/{instance.post.id}/{filename}'


class Tag(models.Model):
    keyword = models.CharField(max_length=100)


class Post(BaseModel):
    content = models.TextField()
    tag = models.ManyToManyField(Tag, through='TagPost', through_fields=('post', 'tag'))

    @property
    def get_main_file(self):
        return self.file_set.first()

    @property
    def different_day(self):
        created = self.created
        current = datetime.now(timezone.utc)
        diff_hour = 24 * (current - created).days + int((current - created).seconds / 3600)
        return f'{diff_hour}시간 전' if diff_hour < 24 else f'{diff_hour // 24}일 전'


class TagPost(models.Model):
    post = models.ForeignKey(Post, on_delete=models.SET_NULL, null=True)
    tag = models.ForeignKey(Tag, on_delete=models.SET_NULL, null=True)


class File(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    file = models.FileField(upload_to=file_path)


class Heart(BaseModel):
    post = models.ForeignKey(Post, on_delete=models.SET_NULL, null=True)
