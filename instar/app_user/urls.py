from django.contrib.auth.views import LogoutView
from django.urls import path, reverse_lazy

from . import views

app_name = 'app_user'
urlpatterns = [
    path('login', views.UserLoginView.as_view(), name='login'),
    path('register', views.UserRegisterView.as_view(), name='register'),
    path('logout', LogoutView.as_view(next_page=reverse_lazy('app_user:login')), name='logout'),

    path('<int:pk>/', views.UserProfileView.as_view(), name='profile'),
]