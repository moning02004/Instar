from django.contrib.auth.mixins import LoginRequiredMixin
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.urls import reverse_lazy
from django.views.generic import CreateView, DeleteView, FormView

from app_comment.models import Comment, CommentHeart
from app_main.mixin import IsOwnerMixin
from app_post.models import Post
from app_report.models import Report


class CommentCreateView(LoginRequiredMixin, FormView):
    login_url = reverse_lazy('app_user:login')
    http_method_names = ['post']

    def get_success_url(self):
        post_pk = int(self.kwargs.get('post_pk'))
        return reverse_lazy('app_post:detail', args=(post_pk,))

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


class CommentHeartView(LoginRequiredMixin, CreateView):
    login_url = reverse_lazy('app_user:login')
    http_method_names = ['post']

    def post(self, request, *args, **kwargs):
        if request.is_ajax():
            heart, is_created = CommentHeart.objects.get_or_create(comment_id=kwargs.get('pk'), author=request.user)
            heart.delete() if not is_created else None
            return JsonResponse(data={'data': is_created}, safe=False, status=200)
        return JsonResponse(status=404, data={'data': 'only ajax'})


class ReportCreateView(LoginRequiredMixin, CreateView):
    login_url = reverse_lazy('app_user:login')
    http_method_names = ['post']

    def post(self, request, *args, **kwargs):
        if request.is_ajax():
            report, is_created = Report.objects.get_or_create(comment_id=kwargs.get('pk'), author=request.user)
            if is_created:
                report.content = request.POST.get('content')
                report.save()
                return JsonResponse(status=200, data={'data': '정상적으로 신고되었습니다.'}, safe=False)
            return JsonResponse(status=200, data={'data': f'{request.user.name}님은 이미 신고하셨습니다.'}, safe=False)
        return JsonResponse(status=404, data={'data': 'only ajax'}, safe=False)

