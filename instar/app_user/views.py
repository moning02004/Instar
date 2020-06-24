from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth.views import LoginView
from django.http import JsonResponse
from django.template.defaultfilters import register
from django.urls import reverse_lazy
from django.views.generic import CreateView, TemplateView, UpdateView, DetailView, FormView

from app_main.mixin import IsLoginRequiredAndAjaxMixin
from app_user.forms import UserRegisterForm, UserLoginForm, UserUpdateForm, UserPasswordUpdateForm
from app_user.models import User


class UserLoginView(LoginView):
    template_name = 'app_user/auth.html'
    form_class = UserLoginForm

    def get_context_data(self, **kwargs):
        context = super().get_context_data()
        context['page'] = 'login'
        return context


class UserRegisterView(CreateView):
    template_name = 'app_user/auth.html'
    form_class = UserRegisterForm
    success_url = reverse_lazy('app_user:login')

    def get_context_data(self, **kwargs):
        context = super().get_context_data()
        context['page'] = 'register'
        return context


class UserProfileView(DetailView):
    template_name = 'app_user/profile.html'
    queryset = User.objects.all()
    context_object_name = 'profile'

    def get_context_data(self, **kwargs):
        context = super().get_context_data()
        profile = context.get('profile')
        context['follow'] = profile.follow.all()
        context['follower'] = profile.follower.all()
        return context


class UserFollowView(IsLoginRequiredAndAjaxMixin, UpdateView):
    http_method_names = ['post']
    queryset = User.objects.all()

    def post(self, request, *args, **kwargs):
        follow = request.user.follow.all().filter(id=kwargs.get('target_id'))
        if follow.exists():
            request.user.follow.remove(follow.first())
        else:
            request.user.follow.add(User.objects.get(pk=kwargs.get('target_id')))
        request.user.save()
        return JsonResponse(data={'data': not follow.exists()}, safe=False)


class UserPasswordView(LoginRequiredMixin, FormView):
    queryset = User.objects.all()
    template_name = 'app_user/password_edit.html'
    form_class = UserPasswordUpdateForm


class UserEditView(LoginRequiredMixin, FormView):
    queryset = User.objects.all()
    template_name = 'app_user/profile_edit.html'
    form_class = UserUpdateForm


@register.filter
def add_class(field, cls):
    return field.as_widget(attrs={'class': cls})
