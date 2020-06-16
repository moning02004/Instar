from django.core.files.uploadedfile import SimpleUploadedFile
from django.test import TestCase
from django.urls import reverse

from app_post.models import Post, File
from app_user.models import User


class PostTestCase(TestCase):

    @classmethod
    def setUpTestData(cls):
        cls.user = User.objects.create_user(username='user1@a.com', password='password1')
        post = Post.objects.create(author=user, content='test1')
        image1 = SimpleUploadedFile("file1.jpg", b"abab_image", content_type="image/*")
        File.objects.create(post=post, file=image1)

    def test_upload(self):
        image1 = SimpleUploadedFile("file1.jpg", b"abab_image", content_type="image/*")
        image2 = SimpleUploadedFile("file2.png", b"bbabai_mage", content_type="image/*")

        self.client.login(username='user1@a.com', password='password1')
        response = self.client.post(reverse('app_post:create'), format='multipart', data={'images': [image1, image2], 'content': 'files upload'})

        self.assertEqual(response.status_code, 302)

    def test_list(self):
        self.client.login(username='user1@a.com', password='password1')
        response = self.client.get(reverse('app_post:list'))
        self.assertEqual(response.status_code, 200)
