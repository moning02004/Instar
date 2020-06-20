from django.urls import path

from . import views

app_name = 'app_comment'
urlpatterns = [
    path('create', views.CommentCreateView.as_view(), name='create'),
    path('<int:pk>/delete', views.CommentDeleteView.as_view(), name='delete'),
    path('<int:pk>/heart', views.CommentHeartView.as_view(), name='heart'),
    path('<int:pk>/report', views.ReportCreateView.as_view(), name='report'),
]