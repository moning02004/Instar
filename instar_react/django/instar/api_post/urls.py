from django.urls import path

from api_post import views

post = views.PostViewSet.as_view({
    'get': 'list',
    'post': 'create'
})
post_detail = views.PostDetailViewSet.as_view({
    'get': 'retrieve',
    'patch': 'partial_update',
    'delete': 'destroy',
})

urlpatterns = [
    path('', post),
    path('<int:pk>', post_detail),
]
