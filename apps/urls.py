from django.urls import path, include

from apps import views

urlpatterns = [
    path('', views.MainView.as_view(), name='main'),
    path('search', views.SearchView.as_view()),

    path('user/', include('apps.account.urls')),
    path('post/', include('apps.post.urls')),
]
