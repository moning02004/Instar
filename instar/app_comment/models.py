from django.db import models

from app_main.models import BaseModel
from app_post.models import Post


class Comment(BaseModel):
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    origin = models.ForeignKey('self', on_delete=models.SET_NULL, null=True, related_name='sub_comment', blank=True)
    comment = models.ForeignKey('self', on_delete=models.SET_NULL, null=True, related_name='replies', blank=True)
    content = models.TextField()

    def get_heart_author(self):
        return [heart.author.id for heart in self.commentheart_set.all()]


class CommentHeart(BaseModel):
    comment = models.ForeignKey(Comment, on_delete=models.SET_NULL, null=True)

