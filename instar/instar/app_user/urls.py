from django.contrib.auth.views import LogoutView
from django.urls import path, reverse_lazy

from . import views

app_name = 'app_user'
urlpatterns = [
    path('login', views.UserLoginView.as_view(), name='login'),
    path('register', views.UserRegisterView.as_view(), name='register'),
    path('leave', views.UserLeaveView.as_view()),
    path('logout', LogoutView.as_view(next_page=reverse_lazy('app_user:login')), name='logout'),

    path('<int:pk>', views.UserProfileView.as_view(), name='profile'),
    path('<int:pk>/follow', views.UserFollowView.as_view()),
    path('<int:pk>/follow/<int:target_id>', views.UserFollowView.as_view()),

    path('<int:pk>/update/profile', views.UserUpdateProfile.as_view(), name='u_profile'),
    path('<int:pk>/update/password', views.UserUpdatePassword.as_view(), name='u_password'),
]