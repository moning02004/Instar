from django.db.models import Q
from rest_framework import viewsets
from rest_framework.generics import UpdateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.serializers import ModelSerializer

from api_post.models import Post, Heart, Tag
from api_post.serializers import PostFormSerializer, PostInformation
from common.permissions import IsOwner


class PostViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        typ = self.request.query_params.get('type')
        query = Q()
        if typ is None or typ == 'user':
            query.add(Q(author=self.request.user), query.OR)
            query.add(Q(author__in=self.request.user.following.all()), query.OR)
        elif typ == 'heart':
            hearts = [x.post.id for x in
                      Heart.objects.select_related('author').select_related('post').filter(author=self.request.user)]
            query.add(Q(id__in=hearts), query.OR)
        elif typ == 'search':
            keyword = self.request.GET.get('search')
            query.add(Q(tag__in=Tag.objects.filter(keyword__icontains=keyword)), query.OR)
        return Post.objects.filter(query).order_by('-created')

    def get_serializer_class(self):
        if self.action == 'list':
            return PostInformation
        if self.action == 'create':
            return PostFormSerializer


class PostDetailViewSet(viewsets.ModelViewSet):
    def get_queryset(self):
        if self.request.user.is_authenticated:
            return self.request.user.post_set.all()
        return Post.objects.all()

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return PostInformation
        if self.action == 'partial_update':
            return PostFormSerializer
        if self.action == 'destroy':
            return ModelSerializer


class PostHeartAPI(UpdateAPIView):
    queryset = Post.objects.all()
    permission_classes = [IsAuthenticated]

    def partial_update(self, request, *args, **kwargs):
        try:
            post = self.get_object()
            heart, is_created = Heart.objects.get_or_create(post=post, author=self.request.user)
            if not is_created:
                heart.delete()
            return Response({'result': True})
        except:
            return Response({'result': False})