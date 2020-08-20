from django.contrib.auth.models import AbstractUser
from django.db import models


def avatar_path(instance, filename):
    return f'{instance.user.id}_{instance.user.username}/avatar/{filename}'


class User(AbstractUser):
    username = models.EmailField(unique=True)
    name = models.CharField(max_length=30)
    phone = models.CharField(max_length=20)
    following = models.ManyToManyField('self', symmetrical=False, related_name='follower')
    description = models.TextField(default='안녕하세요')

    @property
    def get_avatar(self):
        avatar = self.avatar_set.order_by('created').last()
        return avatar.image.url if avatar else ''

    @property
    def post_count(self):
        return self.post_set.count()

    def __str__(self):
        return self.name


class Avatar(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    image = models.ImageField(upload_to=avatar_path)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.user.username} avatar'


class Notice(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.CharField(max_length=200)
    read = models.BooleanField(default=False)

    created = models.DateTimeField(auto_now_add=True)
