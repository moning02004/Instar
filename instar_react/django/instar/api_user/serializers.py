from rest_framework import serializers

from api_user.models import User, Avatar


class AvatarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Avatar
        fields = ['image']


class UserListSerializer(serializers.ModelSerializer):
    get_avatar = AvatarSerializer()

    class Meta:
        model = User
        fields = ['id', 'nickname', 'email', 'get_avatar', 'follower']


class UserFormSerializer(serializers.ModelSerializer):
    password1 = serializers.CharField(write_only=True)
    password2 = serializers.CharField(write_only=True)
    avatar = serializers.FileField(write_only=True, required=False)

    class Meta:
        model = User
        fields = ['username', 'password1', 'password2', 'name', 'phone',
                  'avatar', 'nickname', 'description', 'email']

    def validate(self, attr):
        if attr.get('password1') == attr.get('password2'):
            return attr
        raise serializers.ValidationError('입력하신 내용을 확인해주십시오')

    def create(self, validated_data):
        user = User()
        for key, value in validated_data.items():
            user.set_password(value) if key in ['password1', 'password2'] else setattr(user, key, value)
        user.email = validated_data.get('username')
        user.save()
        return user

    def update(self, instance, validated_data):
        if self.context['request'].user.id == instance.id:
            for key, value in validated_data.items():
                if key != 'avatar':
                    instance.set_password(value) if key in ['password1', 'password2'] else setattr(instance, key, value)
            instance.save()
            if validated_data.get('avatar'):
                Avatar.objects.create(user=instance, image=validated_data.get('avatar'))
            return instance
        raise serializers.ValidationError('권한이 없습니다.')


class UserInformation(serializers.ModelSerializer):
    get_avatar = AvatarSerializer()

    class Meta:
        model = User
        fields = ['id', 'username', 'name', 'email', 'description', 'phone', 'nickname',    
                  'get_avatar', 'following', 'follower', 'post_count']


class UserAddOrRemoveSerializer(serializers.ModelSerializer):
    target = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ['target']

    def update(self, instance, validated_data):
        return instance
