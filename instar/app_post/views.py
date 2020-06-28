from datetime import datetime, timezone

from django.contrib.auth.mixins import LoginRequiredMixin
from django.db.models import Q, F
from django.http import JsonResponse, HttpResponseRedirect
from django.template.defaulttags import register
from django.urls import reverse_lazy
from django.views.generic import ListView, DetailView, DeleteView, UpdateView, CreateView

from app_main.mixin import IsOwnerMixin
from app_post.forms import PostUpdateForm
from app_post.models import Post, File, Heart, Tag


class PostList(LoginRequiredMixin, ListView):
    login_url = reverse_lazy('app_user:login')
    template_name = 'app_post/list.html'
    context_object_name = 'post_list'

    def get_queryset(self):
        if self.request.GET.get('type') == 'explore':
            query = Q()
        elif self.request.GET.get('type') == 'heart':
            hearts = [x.post.id for x in
                      Heart.objects.select_related('author').select_related('post').filter(author=self.request.user)]
            query = Q(id__in=hearts)
        elif self.request.GET.get('search') is not None:
            keyword = self.request.GET.get('search')

            query = Q(tag__in=Tag.objects.filter(keyword__icontains=keyword))
        else:
            query = Q(author__in=[x.id for x in self.request.user.follow.all()]) | Q(author=self.request.user)
        post_list = Post.objects.prefetch_related('tag').filter(query).order_by('-created')
        return post_list


class PostCreateView(LoginRequiredMixin, CreateView):
    login_url = reverse_lazy('app_user:login')
    queryset = Post.objects.all()
    http_method_names = ['post']

    def post(self, request, *args, **kwargs):
        content = request.POST.get('content')
        tag_list = list(filter(is_tag, content.split(' ')))

        post = Post.objects.create(author=request.user, content=content)
        for tag in tag_list:
            tag_instance = Tag.objects.create(keyword=tag[1:])
            post.tag.add(tag_instance)

        for file in request.FILES.getlist('images'):
            File.objects.create(post=post, file=file)
        return HttpResponseRedirect(reverse_lazy('app_main:main'))


class PostDetail(LoginRequiredMixin, DetailView):
    login_url = reverse_lazy('app_user:login')
    template_name = 'app_post/detail.html'
    queryset = Post.objects.all()
    context_object_name = 'post'

    def get(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.views = F('views') + 1
        instance.save()
        return super().get(request, *args, **kwargs)

    def get_context_data(self, **kwargs):
        context = super().get_context_data()
        instance = self.get_object()
        context['comment_list'] = instance.comment_set.all().filter(comment=None).order_by('-created')
        return context


class PostUpdateView(IsOwnerMixin, UpdateView):
    queryset = Post.objects.all()
    template_name = 'app_post/update.html'
    form_class = PostUpdateForm
    context_object_name = 'post'
    failed_template_name = 'error.html'

    def get_success_url(self):
        return f'/post/{self.get_object().id}'


class PostDeleteView(IsOwnerMixin, DeleteView):
    login_url = reverse_lazy('app_user:login')
    model = Post
    http_method_names = ['post']
    success_url = reverse_lazy('app_main:main')

    def post(self, request, *args, **kwargs):
        super().post(request, *args, **kwargs)
        return JsonResponse(data={'data': True}, safe=False)


class PostHeartView(LoginRequiredMixin, CreateView):
    def post(self, request, *args, **kwargs):
        if request.is_ajax():
            heart, is_created = Heart.objects.get_or_create(post_id=kwargs.get('pk'), author=request.user)
            heart.delete() if not is_created else None
            return JsonResponse(data={'data': is_created}, safe=False, status=200)
        return JsonResponse(status=404, data={'data': 'Only Ajax'})


@register.filter
def different_day(created):
    current = datetime.now(timezone.utc)
    diff_min = int((current - created).seconds // 60)
    diff_hour = 24 * (current - created).days + (diff_min // 60)
    return '방금 전' if diff_min == 0 \
        else f'{diff_min}분 전' if diff_hour == 0 \
        else f'{diff_hour}시간 전' if diff_hour < 24 \
        else f'{diff_hour // 24}일 전'


@register.filter
def top_comment(object_list):
    comment_list = object_list.filter(comment=None).order_by('created').reverse()[:2]
    return comment_list


@register.filter
def add_link(content):
    url = f'{reverse_lazy("app_post:list")}?search='
    content = [f'<a href="{url}{x[1:]}">{x}</a>' if is_tag(x) else x for x in content.split(' ')]
    return ' '.join(content)


def is_tag(literal):
    return literal.startswith('#')
