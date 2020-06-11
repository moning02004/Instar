from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    username = models.EmailField(unique=True, null=False, blank=False)
    name = models.CharField(max_length=100)
    phone = models.CharField(max_length=20)
    follow = models.ManyToManyField(to='self', symmetrical=False, related_name='follower')
    explain = models.TextField()

    @property
    def follower_count(self):
        return self.follower.count()

    @property
    def follow_count(self):
        return self.follow.count()

    @property
    def post_count(self):
        return self.post_set.count()