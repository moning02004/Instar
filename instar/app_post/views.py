from django.contrib.auth.decorators import login_required
from django.contrib.auth.mixins import LoginRequiredMixin
from django.db.models import Q
from django.http import Http404, HttpResponse
from django.shortcuts import redirect
from django.urls import reverse, reverse_lazy
from django.views.generic import ListView, DetailView, DeleteView, UpdateView, CreateView

from app_main.permissions import IsOwnerMixin
from app_post.forms import PostUpdateForm
from app_post.models import Post, File


class PostList(LoginRequiredMixin, ListView):
    template_name = 'app_post/list.html'
    context_object_name = 'post_list'

    def get_queryset(self):
        if self.request.GET.get('type') == 'explore':
            query = Q()
        else:
            query = Q(author__in=[x.id for x in self.request.user.follow.all()]) | Q(author=self.request.user)
        post_list = Post.objects.filter(query).order_by('-created')
        return post_list


class PostCreateView(LoginRequiredMixin, CreateView):
    queryset = Post.objects.all()
    http_method_names = ['post']

    def post(self, request, *args, **kwargs):
        post = Post.objects.create(content=request.POST.get('content'), author=request.user)
        for file in request.FILES.getlist('images'):
            File.objects.create(post=post, file=file)
        return redirect('app_main:main')


class PostDetail(LoginRequiredMixin, DetailView):
    template_name = 'app_post/detail.html'
    queryset = Post.objects.all()
    context_object_name = 'post'


class PostDeleteView(IsOwnerMixin, DeleteView):
    model = Post
    failed_template_name = 'error.html'
    success_url = reverse_lazy('app_main:main')


class PostUpdateView(UpdateView):
    queryset = Post.objects.all()
    template_name = 'app_post/update.html'
    form_class = PostUpdateForm
    context_object_name = 'post'

    def get_success_url(self):
        return f'/post/{self.get_object().id}'
