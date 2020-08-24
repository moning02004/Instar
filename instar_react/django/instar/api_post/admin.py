from django.contrib import admin

from api_post.models import Post, Heart, Image
from api_user.models import User, Avatar

admin.site.register(User)
admin.site.register(Avatar)
admin.site.register(Post)
admin.site.register(Image)
admin.site.register(Heart)
