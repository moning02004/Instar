from rest_framework import serializers
from rest_framework.generics import UpdateAPIView

from api_user.models import User, Avatar


class UserFormSerializer(serializers.ModelSerializer):
    password1 = serializers.CharField(write_only=True)
    password2 = serializers.CharField(write_only=True)
    avatar = serializers.FileField(write_only=True, required=False)

    class Meta:
        model = User
        fields = ['username', 'password1', 'password2', 'name', 'phone', 'avatar']

    def validate(self, attr):
        if attr.get('password1') == attr.get('password2'):
            return attr
        raise serializers.ValidationError('입력하신 내용을 확인해주십시오')

    def create(self, validated_data):
        user = User()
        for key, value in validated_data.items():
            if key != 'avatar':
                setattr(user, key, value) if key not in ['password1', 'password2'] else user.set_password(value)
        user.email = validated_data.get('username')
        user.save()
        if validated_data.get('avatar'):
            Avatar.objects.create(user=user, image=validated_data.get('avatar'))
        return user

    def update(self, instance, validated_data):
        if self.context['request'].user.id == instance.id:
            for key, value in validated_data.items():
                if key != 'avatar':
                    setattr(instance, key, value) if key not in ['password1', 'password2'] else instance.set_password(
                        value)
            instance.save()
            if validated_data.get('avatar'):
                Avatar.objects.create(user=instance, image=validated_data.get('avatar'))
            return instance
        raise serializers.ValidationError('권한이 없습니다.')


class UserInformation(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'name', 'email', 'description', 'phone',
                  'get_avatar', 'following', 'follower', 'post_count']


class UserAddOrRemoveSerializer(serializers.ModelSerializer):
    target = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ['target']

    def update(self, instance, validated_data):

        return instance