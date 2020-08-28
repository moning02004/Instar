from datetime import datetime, timezone

from rest_framework import serializers

from api_post.models import Post, Tag, Image
from api_user.serializers import UserInformation


class ImageInformation(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ['file']


class PostInformation(serializers.ModelSerializer):
    image_set = ImageInformation(many=True, read_only=True)
    heart_set = serializers.SlugRelatedField(many=True, read_only=True, slug_field='author_id')
    author = UserInformation()

    week = serializers.SerializerMethodField('count_week', read_only=True)

    def count_week(self, instance):
        current = datetime.now(timezone.utc)
        diff_min = int((current - instance.created).seconds // 60)
        diff_hour = 24 * (current - instance.created).days + (diff_min // 60)
        return '방금 전' if diff_min == 0 \
            else f'{diff_min}분 전' if diff_hour == 0 \
            else f'{diff_hour}시간 전' if diff_hour < 24 \
            else f'{diff_hour // 24}일 전'

    class Meta:
        model = Post
        fields = ['id', 'author', 'content', 'image_set', 'week', 'heart_set', 'comment_set']


class PostFormSerializer(serializers.ModelSerializer):
    images = serializers.ListField(child=serializers.FileField(allow_empty_file=True), required=False)

    class Meta:
        model = Post
        fields = ['content', 'images']

    def validate(self, attrs):
        if self.context['request'].stream.method == 'POST':
            if attrs.get('images') is None:
                raise serializers.ValidationError('입력하신 내용을 확인해주십시오')
        return attrs

    def create(self, validated_data):
        content = validated_data.get('content')
        post = Post()
        post.author = self.context['request'].user
        post.content = content
        post.save()

        for x in ' '.join(content.split('\n')).split():
            if not x.startswith('#'):
                continue
            if Tag.objects.filter(keyword=x).exists():
                keyword = Tag.objects.create(keyword=x)
            else:
                keyword = Tag.objects.get(keyword=x)
            post.tag.add(keyword)

        for x in validated_data.get('images'):
            Image.objects.create(post=post, file=x)

        return validated_data

    def update(self, instance, validated_data):
        instance.content = validated_data.get('content')
        instance.save()
        return instance


class PostThumbnailSerializer(serializers.ModelSerializer):
    image_set = ImageInformation(many=True, read_only=True)

    class Meta:
        model = Post
        fields = ['id', 'image_set']
