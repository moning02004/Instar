from django.contrib.auth import get_user_model
from django.contrib.auth.models import AbstractUser
from django.db import models


def user_image_path(instance, filename):
    return f'{instance.user.username}/images/{filename}'


class User(AbstractUser):
    username = models.EmailField(unique=True, null=False, blank=False)
    name = models.CharField(max_length=100)
    phone = models.CharField(max_length=20)
    follow = models.ManyToManyField(to='self', symmetrical=False, related_name='follower')
    explain = models.TextField()
    sex = models.CharField(max_length=1)

    @property
    def get_profile_image(self):
        return self.userimage_set.last()

    @property
    def follower_count(self):
        return self.follower.count()

    @property
    def follow_count(self):
        return self.follow.count()

    @property
    def post_count(self):
        return self.post_set.count()


class UserImage(models.Model):
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    image = models.ImageField(upload_to=user_image_path)
    created = models.DateTimeField(auto_now_add=True)

    def delete(self, using=None, keep_parents=False):
        self.image.delete()
        return super().delete()
