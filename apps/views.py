import json

from django.contrib.auth.mixins import LoginRequiredMixin
from django.db.models import Q
from django.http import JsonResponse
from django.views.generic import TemplateView, ListView

from apps.utils.mixin import IsLoginRequiredAndAjaxMixin
from apps.post.models import Post, Tag
from apps.account.models import User
from apps.account.views import UserLoginView


class DashBoardView(LoginRequiredMixin, ListView):
    template_name = 'app_main/dashboard.html'
    context_object_name = 'post_list'
    paginate_by = 10

    def get_queryset(self):
        query = Q(author__in=[x.id for x in self.request.user.follow.all()]) | Q(author=self.request.user)
        post_list = Post.objects.filter(query).order_by('-created')
        return post_list


class MainView(TemplateView):

    def get(self, request, *args, **kwargs):
        if request.user.is_authenticated:
            view = DashBoardView.as_view()
        else:
            view = UserLoginView.as_view()
        return view(request, *args, **kwargs)


class SearchView(IsLoginRequiredAndAjaxMixin, TemplateView):

    def get(self, request, *args, **kwargs):
        keyword = request.GET.get('keyword')
        tag_list = Tag.objects.filter(keyword__icontains=keyword)
        user_list = User.objects.filter(Q(name__icontains=keyword) | Q(username__icontains=keyword))

        response = {'data': {'tags': [f'#{x.keyword}' for x in tag_list[:8]], 'users': [[x.id, x.name] for x in user_list[:5]]}}
        response = json.dumps(response)
        return JsonResponse(data={'data': response}, safe=False)


