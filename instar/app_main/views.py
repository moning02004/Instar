from django.views.generic import TemplateView, ListView

from app_user.views import UserLoginView


class DashBoardView(TemplateView):
    template_name = 'app_main/dashboard.html'


class MainView(TemplateView):

    def get(self, request, *args, **kwargs):
        if request.user.is_authenticated:
            view = DashBoardView.as_view()
        else:
            view = UserLoginView.as_view()
        return view(request, *args, **kwargs)