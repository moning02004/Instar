from django.contrib.auth.views import LoginView
from django.http import JsonResponse, HttpResponseRedirect
from django.template.defaultfilters import register
from django.urls import reverse_lazy
from django.views.generic import CreateView, UpdateView, DetailView, FormView

from apps.utils.mixin import IsLoginRequiredAndAjaxMixin, IsOwnerMixin
from apps.account.forms import UserRegisterForm, UserLoginForm, UserProfileUpdateForm, UserPasswordUpdateForm
from apps.account.models import User, UserImage


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
    success_url = reverse_lazy('account:login')

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
    http_method_names = ['get', 'post']
    queryset = User.objects.all()

    def get(self, request, *args, **kwargs):
        user = User.objects.get(pk=kwargs.get('pk'))
        return JsonResponse(data={'data': len(user.follower.all())}, safe=False)

    def post(self, request, *args, **kwargs):
        if request.user.id == kwargs.get('target_id'):
            return JsonResponse(data={'data': 'error'}, safe=False)

        follow = request.user.follow.all().filter(id=kwargs.get('target_id'))
        if follow.exists():
            request.user.follow.remove(follow.first())
        else:
            request.user.follow.add(User.objects.get(pk=kwargs.get('target_id')))
        request.user.save()
        return JsonResponse(data={'data': not follow.exists()}, safe=False)


class UserUpdateProfile(IsOwnerMixin, UpdateView):
    queryset = User.objects.all()
    template_name = 'app_user/update.html'
    form_class = UserProfileUpdateForm

    def post(self, request, *args, **kwargs):
        image = request.FILES.get('image')
        if image is not None:
            UserImage.objects.create(user=request.user, image=image)

        data = request.POST.items()
        for key, value in data:
            setattr(request.user, key, value)
        request.user.save()
        return HttpResponseRedirect(reverse_lazy('account:profile', args=(request.user.id,)))


class UserUpdatePassword(IsOwnerMixin, UpdateView):
    queryset = User.objects.all()
    template_name = 'app_user/update.html'
    form_class = UserPasswordUpdateForm

    def post(self, request, *args, **kwargs):
        super().post(request, *args, **kwargs)
        return HttpResponseRedirect(reverse_lazy('account:profile', args=(request.user.id,)))


class UserLeaveView(IsLoginRequiredAndAjaxMixin, FormView):
    http_method_names = ['post']

    def post(self, request, *args, **kwargs):
        request.user.delete()
        return JsonResponse(data={'data': True})


@register.filter
def add_class(field, cls):
    return field.as_widget(attrs={'class': cls})
