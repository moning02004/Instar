from django.contrib import admin

from app_post.models import Post, File
from app_user.models import User

admin.site.register(Post)
admin.site.register(File)
admin.site.register(User)