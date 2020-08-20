from rest_framework import viewsets, status
from rest_framework.generics import CreateAPIView, UpdateAPIView, ListAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from api_post.serializers import PostThumbnailSerializer
from api_user.models import User
from api_user.serializers import UserInformation, UserFormSerializer
from common.permissions import IsOwner


class UserCheckAPI(APIView):
    permission_classes = [AllowAny]
    http_method_names = ['post']

    def post(self, request, *args, **kwargs):
        try:
            return Response({
                'data': User.objects.filter(username=request.data.get('username')).exists()
            })
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class UserRegisterAPI(CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserFormSerializer
    permission_classes = [AllowAny]
    http_method_names = ['post']


class UserViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return User.objects.all()

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return UserInformation
        if self.action == 'partial_update':
            return UserFormSerializer


class UserFollowAPI(UpdateAPIView):
    queryset = User.objects.all()
    permission_classes = [IsOwner]

    def partial_update(self, request, *args, **kwargs):
        try:
            target = User.objects.get(id=int(kwargs.get('target')))
            if target in request.user.following.all():
                request.user.following.remove(target)
            else:
                request.user.following.add(target)
            return Response({'result': True})
        except:
            return Response({'result': False})


class UserPostListAPI(ListAPIView):
    serializer_class = PostThumbnailSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = User.objects.get(id=self.kwargs.get('pk'))
        return user.post_set.all().order_by('-created')