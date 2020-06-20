from django.db import models

from app_comment.models import Comment
from app_main.models import BaseModel
from app_post.models import Post


class Report(BaseModel):
    comment = models.ForeignKey(Comment, on_delete=models.CASCADE, null=True)
    post = models.ForeignKey(Post, on_delete=models.CASCADE, null=True)
    content = models.TextField()
    result = models.CharField(max_length=1, default='1')

    @property
    def get_result(self):
        if self.result == '1':
            return '접수'
        if self.result == '2':
            return '처리 완료'
        if self.result == '3':
            return '사유 불충분'
