from django.urls import path, include

from . import views

app_name = 'post'
urlpatterns = [
    path('', views.PostList.as_view(), name='list'),
    path('<int:pk>/', views.PostDetail.as_view(), name='detail'),
    path('create', views.PostCreateView.as_view(), name='create'),
    path('<int:pk>/delete', views.PostDeleteView.as_view(), name='delete'),
    path('<int:pk>/update', views.PostUpdateView.as_view(), name='update'),
    path('<int:pk>/heart', views.PostHeartView.as_view(), name='heart'),
    path('<int:post_pk>/comments/', include('apps.comment.urls')),
]