from django.db import models

from app_main.models import BaseModel


def file_path(instance, filename):
    return f'{instance.post.author.username}/{filename}'


class Tag(models.Model):
    keyword = models.CharField(max_length=100)


class Post(BaseModel):
    content = models.TextField()
    tag = models.ManyToManyField(Tag, through='TagPost', through_fields=('post', 'tag'))

    @property
    def heart_count(self):
        return self.heart_set.count()


class TagPost(models.Model):
    post = models.ForeignKey(Post, on_delete=models.SET_NULL, null=True)
    tag = models.ForeignKey(Tag, on_delete=models.SET_NULL, null=True)


class Heart(BaseModel):
    post = models.ForeignKey(Post, on_delete=models.SET_NULL, null=True)


class File(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    file = models.FileField(upload_to=file_path)


class Comment(BaseModel):
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    comment = models.ForeignKey('self', on_delete=models.SET_NULL, null=True, related_name='comments')

    content = models.TextField()

    @property
    def heart_count(self):
        return self.commentheart_set.count()


class CommentHeart(BaseModel):
    comment = models.ForeignKey(Comment, on_delete=models.SET_NULL, null=True)


class Report(BaseModel):
    comment = models.ForeignKey(Comment, on_delete=models.SET_NULL, null=True)
    content = models.TextField()
