from rest_framework import serializers

from api_post.models import Post, Tag, Image
from api_user.serializers import UserInformation


class ImageInformation(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ['file']


class PostInformation(serializers.ModelSerializer):
    image_set = ImageInformation(many=True, read_only=True)
    author = UserInformation()

    class Meta:
        model = Post
        fields = ['id', 'author', 'content', 'image_set', 'created', 'updated', 'heart_set', 'comment_set']


class PostFormSerializer(serializers.ModelSerializer):
    images = serializers.ListField(child=serializers.FileField(allow_empty_file=True))

    class Meta:
        model = Post
        fields = ['content', 'images']

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

        return instance


class PostThumbnailSerializer(serializers.ModelSerializer):
    image_set = ImageInformation(many=True, read_only=True)

    class Meta:
        model = Post
        fields = ['id', 'image_set']
