from django.urls import path, include

from . import views

app_name = 'app_report'
urlpatterns = [
    path('', views.ReportListView.as_view(), name='list'),
    path('<int:pk>/result', views.ReportResultView.as_view(), name='result')
]