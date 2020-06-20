from django.contrib import admin

from app_comment.models import Comment
from app_post.models import Post, File
from app_report.models import Report
from app_user.models import User

admin.site.register(Post)
admin.site.register(File)
admin.site.register(Comment)
admin.site.register(Report)
admin.site.register(User)
