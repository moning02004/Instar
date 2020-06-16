from django.urls import path

from . import views

app_name = 'app_post'
urlpatterns = [
    path('', views.PostList.as_view(), name='list'),
    path('<int:pk>/', views.PostDetail.as_view(), name='detail'),
    path('create', views.PostCreateView.as_view(), name='create'),
    path('<int:pk>/delete', views.PostDeleteView.as_view(), name='delete'),
    path('<int:pk>/edit', views.PostUpdateView.as_view(), name='update'),
]