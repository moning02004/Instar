from django.contrib.auth.mixins import LoginRequiredMixin
from django.db.models import Q
from django.views.generic import TemplateView, ListView

from app_post.models import Post
from app_user.views import UserLoginView


class DashBoardView(LoginRequiredMixin, ListView):
    template_name = 'app_main/dashboard.html'
    context_object_name = 'post_list'

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
