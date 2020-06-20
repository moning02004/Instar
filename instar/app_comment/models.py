from django.db import models

from app_main.models import BaseModel
from app_post.models import Post


class Comment(BaseModel):
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    comment = models.ForeignKey('self', on_delete=models.SET_NULL, null=True, related_name='replies', blank=True)

    content = models.TextField()

    @property
    def heart_count(self):
        return self.commentheart_set.count()


class CommentHeart(BaseModel):
    comment = models.ForeignKey(Comment, on_delete=models.SET_NULL, null=True)

