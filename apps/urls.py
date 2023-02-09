from django.urls import path, include

from apps import views

urlpatterns = [
    path('', views.MainView.as_view(), name='main'),
    path('search', views.SearchView.as_view()),

    path('users/', include('apps.account.urls')),
    path('posts/', include('apps.post.urls')),
]
