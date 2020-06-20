from django.contrib.auth.views import LoginView
from django.template.defaultfilters import register
from django.urls import reverse_lazy
from django.views.generic import CreateView, TemplateView, FormView, UpdateView

from app_main.mixin import IsOwnerMixin
from app_user.forms import UserRegisterForm, UserLoginForm, UserUpdateForm, UserPasswordUpdateForm


class UserLoginView(LoginView):
    template_name = 'app_user/login.html'
    form_class = UserLoginForm


class UserRegisterView(CreateView):
    template_name = 'app_user/register.html'
    form_class = UserRegisterForm
    success_url = reverse_lazy('app_user:login')


class UserProfileView(TemplateView):
    template_name = 'app_user/m_profile.html'


class UserPasswordView(IsOwnerMixin, UpdateView):
    template_name = 'app_user/password_edit.html'
    form_class = UserPasswordUpdateForm


class UserEditView(IsOwnerMixin, UpdateView):
    template_name = 'app_user/profile_edit.html'
    form_class = UserUpdateForm


@register.filter
def add_class(field, cls):
    return field.as_widget(attrs={'class': cls})
