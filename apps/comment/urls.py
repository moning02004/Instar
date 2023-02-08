from django.urls import path

from . import views

app_name = 'comment'
urlpatterns = [
    path('', views.CommentCreateView.as_view(), name='create'),
    path('<int:pk>/delete', views.CommentDeleteView.as_view(), name='delete'),
    path('<int:pk>/heart', views.CommentHeartView.as_view(), name='heart'),
]