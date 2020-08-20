from django.urls import path
from rest_framework_jwt.views import obtain_jwt_token, refresh_jwt_token, verify_jwt_token

from api_user import views

user_detail = views.UserViewSet.as_view({
    'get': 'retrieve',
    'patch': 'partial_update',
    'delete': 'destroy'
})

urlpatterns = [
    path('login', obtain_jwt_token),
    path('refresh', refresh_jwt_token),
    path('verify', verify_jwt_token),

    path('register', views.UserRegisterAPI.as_view()),
    path('check', views.UserCheckAPI.as_view()),
    path('<int:pk>', user_detail),
    path('<int:pk>/<int:target>', views.UserFollowAPI.as_view()),
    path('<int:pk>/posts', views.UserPostListAPI.as_view()),
]
