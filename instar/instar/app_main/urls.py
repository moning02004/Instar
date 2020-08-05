from django.urls import path

from . import views

app_name = 'app_main'
urlpatterns = [
    path('', views.MainView.as_view(), name='main'),
    path('search', views.SearchView.as_view())
]