from django.contrib.auth.mixins import LoginRequiredMixin
from django.http import HttpResponse, HttpResponseRedirect
from django.urls import reverse_lazy
from django.views.generic import CreateView, DeleteView, FormView

from app_comment.models import Comment
from app_main.permissions import IsOwnerMixin
from app_post.models import Post


class CommentCreateView(LoginRequiredMixin, FormView):
    login_url = reverse_lazy('app_user:login')
    http_method_names = ['post']

    def get_success_url(self):
        post_pk = int(self.kwargs.get('post_pk'))
        return reverse_lazy('app_post:detail', args=(post_pk, ))

    def post(self, request, *args, **kwargs):
        Comment.objects.create(
            post=Post.objects.get(pk=kwargs.get('post_pk')),
            comment=Comment.objects.get(pk=request.POST.get('comment_id')) if request.POST.get('comment_id') else None,
            author=request.user,
            content=request.POST.get('content')
        )
        return HttpResponseRedirect(self.success_url)


class CommentDeleteView(IsOwnerMixin, DeleteView):
    queryset = Comment.objects.all()
    http_method_names = ['post']

    def get_success_url(self):
        post_pk = int(self.kwargs.get('post_pk'))
        return reverse_lazy('app_post:detail', args=(post_pk,))
