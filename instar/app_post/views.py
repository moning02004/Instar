from django.contrib.auth.mixins import LoginRequiredMixin
from django.db.models import Q
from django.http import JsonResponse
from django.shortcuts import redirect
from django.urls import reverse_lazy
from django.views.generic import ListView, DetailView, DeleteView, UpdateView, CreateView

from app_main.mixin import IsOwnerMixin
from app_post.forms import PostUpdateForm
from app_post.models import Post, File, Heart
from app_report.models import Report


class PostList(ListView):
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
    login_url = reverse_lazy('app_user:login')
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


class PostUpdateView(IsOwnerMixin, UpdateView):
    queryset = Post.objects.all()
    template_name = 'app_post/update.html'
    form_class = PostUpdateForm
    context_object_name = 'post'
    failed_template_name = 'error.html'

    def get_success_url(self):
        return f'/post/{self.get_object().id}'


class PostDeleteView(IsOwnerMixin, DeleteView):
    model = Post
    http_method_names = ['post']
    success_url = reverse_lazy('app_main:main')


class PostHeartView(LoginRequiredMixin, CreateView):
    def post(self, request, *args, **kwargs):
        if request.is_ajax():
            heart, is_created = Heart.objects.get_or_create(post_id=kwargs.get('pk'), author=request.user)
            heart.delete() if not is_created else None
            return JsonResponse(data={'data': is_created}, safe=False, status=200)
        return JsonResponse(status=404, data={'data': 'Only Ajax'})


class ReportCreateView(LoginRequiredMixin, CreateView):
    login_url = reverse_lazy('app_user:login')
    http_method_names = ['post']

    def post(self, request, *args, **kwargs):
        if request.is_ajax():
            report, is_created = Report.objects.get_or_create(post_id=kwargs.get('pk'), author=request.user)
            if is_created:
                report.content = request.POST.get('content')
                report.save()
                return JsonResponse(status=200, data={'data': '정상적으로 신고되었습니다.'}, safe=False)
            return JsonResponse(status=200, data={'data': f'{request.user.name}님은 이미 신고하셨습니다.'}, safe=False)
        return JsonResponse(status=404, data={'data': 'only ajax'}, safe=False)
