from django.contrib.auth.views import LoginView
from django.template.defaultfilters import register
from django.urls import reverse_lazy
from django.views.generic import CreateView, TemplateView, FormView

from app_user.forms import UserRegisterForm, UserLoginForm, UserUpdateForm, UserPasswordUpdateForm


class UserLoginView(LoginView):
    template_name = 'app_user/login.html'
    form_class = UserLoginForm

    def get_context_data(self, **kwargs):
        context = super().get_context_data()
        context['page'] = 'login'
        return context


class UserRegisterView(CreateView):
    template_name = 'app_user/register.html'
    form_class = UserRegisterForm
    success_url = reverse_lazy('app_user:login')

    def get_context_data(self, **kwargs):
        context = super().get_context_data()
        context['page'] = 'register'
        return context


class UserProfileView(TemplateView):
    template_name = 'app_user/profile.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data()
        return context


class UserPasswordView(FormView):
    template_name = 'app_user/password_edit.html'
    form_class = UserPasswordUpdateForm

    def post(self, request, *args, **kwargs):
        user = request.user
        return super().post(request, *args, **kwargs)


class UserEditView(FormView):
    template_name = 'app_user/profile_edit.html'
    form_class = UserUpdateForm

    def post(self, request, *args, **kwargs):
        user = request.user
        return super().post(request, *args, **kwargs)


@register.filter
def add_class(field, cls):
    return field.as_widget(attrs={'class': cls})
