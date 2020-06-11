from django.contrib.auth.views import LoginView
from django.template.defaultfilters import register
from django.urls import reverse_lazy
from django.views.generic import CreateView, TemplateView

from app_user.forms import UserRegisterForm, UserLoginForm


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




@register.filter
def add_class(field, cls):
    return field.as_widget(attrs={'class': cls})
