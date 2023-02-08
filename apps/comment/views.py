from django.contrib.auth.mixins import LoginRequiredMixin
from django.http import HttpResponseRedirect, JsonResponse
from django.urls import reverse_lazy
from django.views.generic import CreateView, DeleteView, FormView

from apps.comment.models import Comment, CommentHeart
from apps.utils.mixin import IsOwnerMixin


class CommentCreateView(LoginRequiredMixin, FormView):
    login_url = reverse_lazy('account:login')
    http_method_names = ['post']

    def post(self, request, *args, **kwargs):
        Comment.objects.create(
            post_id=kwargs.get('post_pk'),
            comment_id=request.POST.get('comment_id') if request.POST.get('comment_id') else None,
            origin_id=request.POST.get('origin_id') if request.POST.get('origin_id') else None,
            author=request.user,
            content=request.POST.get('content')
        )
        return HttpResponseRedirect(reverse_lazy('post:detail', args=(kwargs.get('post_pk'),)))


class CommentDeleteView(IsOwnerMixin, DeleteView):
    queryset = Comment.objects.all()
    http_method_names = ['post']

    def get_success_url(self):
        post_pk = int(self.kwargs.get('post_pk'))
        return reverse_lazy('post:detail', args=(post_pk,))


class CommentHeartView(LoginRequiredMixin, CreateView):
    login_url = reverse_lazy('account:login')
    http_method_names = ['post']

    def post(self, request, *args, **kwargs):
        if request.is_ajax():
            heart, is_created = CommentHeart.objects.get_or_create(comment_id=kwargs.get('pk'), author=request.user)
            heart.delete() if not is_created else None
            return JsonResponse(data={'data': is_created}, safe=False, status=200)
        return JsonResponse(status=404, data={'data': 'only ajax'})
