from django.contrib.auth.mixins import LoginRequiredMixin
from django.shortcuts import render
from django.views.generic import DetailView

from app_post.models import Post


class PostDetail(LoginRequiredMixin, DetailView):
    model = Post
    template_name = 'app_post/detail'
