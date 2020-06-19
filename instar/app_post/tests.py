from django.core.files.uploadedfile import SimpleUploadedFile
from django.test import TestCase
from django.urls import reverse_lazy

from app_post.models import Post, File
from app_user.models import User


class PostTestCase(TestCase):

    @classmethod
    def setUpTestData(cls):
        cls.user = User.objects.create_user(username='user1@a.com', password='password1')
        User.objects.create_user(username='user2@a.com', password='password2')
        cls.post = Post.objects.create(author=cls.user, content='test1')
        image1 = SimpleUploadedFile("file1.jpg", b"abab_image", content_type="image/*")
        cls.file = File.objects.create(post=cls.post, file=image1)

    # post crud
    def test_post_crud(self):
        # 생성
        self.client.login(username='user1@a.com', password='password1')
        response = self.client.post(reverse_lazy('app_post:create'), format='multipart', data={
            'content': '테스트 1',
            'images': self.file
        })
        self.assertEqual(response.status_code, 302)
        self.assertURLEqual(response.url, '/')

        # 확인
        post = Post.objects.filter(pk=2)
        self.assertTrue(post.exists())

        # 열람
        response = self.client.get(reverse_lazy('app_post:detail', args=(2,)))
        self.assertEqual(response.status_code, 200)

        # 수정
        response = self.client.post(reverse_lazy('app_post:update', args=(2,)), data={
            'content': '새로운 테스트 1'
        })
        self.assertEqual(response.status_code, 302)
        post.get(pk=2).refresh_from_db()
        self.assertEqual(post.get(pk=2).content, '새로운 테스트 1')

        # 삭제
        response = self.client.post(reverse_lazy('app_post:delete', args=(2,)))
        self.assertEqual(response.status_code, 302)
        post = Post.objects.filter(pk=2)
        self.assertFalse(post.exists())

    # create_no_login
    def test_create_no_login(self):
        response = self.client.post(reverse_lazy('app_post:create'), format='multipart', data={
            'content': '테스트 1',
            'images': self.file
        })
        self.assertURLEqual(response.url[:response.url.index('?')], reverse_lazy('app_user:login'))

    # update_different_author
    def test_update_different_author(self):
        response = self.client.post(reverse_lazy('app_post:update', args=(self.post.id,)), data={
            'content': '새로운 테스트 1',
        })
        self.assertURLEqual(response.url[:response.url.index('?')], reverse_lazy('app_user:login'))

        self.client.login(username='user2@a.com', password='password2')
        response = self.client.get(reverse_lazy('app_post:update', args=(self.post.id,)), data={
            'content': '새로운 테스트 1',
        })
        self.assertURLEqual(response.template_name, ['error.html'])

    # delete_different_author
    def test_delete_different_author(self):
        response = self.client.post(reverse_lazy('app_post:delete', args=(self.post.id,)), data={
            'content': '새로운 테스트 1',
        })
        self.assertURLEqual(response.url[:response.url.index('?')], reverse_lazy('app_user:login'))

        self.client.login(username='user2@a.com', password='password2')
        response = self.client.post(reverse_lazy('app_post:delete', args=(self.post.id,)))
        self.assertEqual(response.status_code, 403)

    def test_heart(self):
        self.client.login(username='user1@a.com', password='password1')

        response = self.client.post(reverse_lazy('app_post:heart', args=(self.post.id,)))
        self.assertEqual(response.status_code, 404)

        ajax_header = {'HTTP_X_REQUESTED_WITH': 'XMLHttpRequest'}
        response = self.client.post(reverse_lazy('app_post:heart', args=(self.post.id,)), **ajax_header)
        self.assertEqual(response.status_code, 200)

        self.post.refresh_from_db()
        self.assertEqual(len(self.post.heart_set.all()), 1)
        self.assertEqual(len(self.user.heart_set.all()), 1)

        response = self.client.post(reverse_lazy('app_post:heart', args=(self.post.id,)), **ajax_header)
        self.assertEqual(response.status_code, 200)

        self.post.refresh_from_db()
        self.assertEqual(len(self.post.heart_set.all()), 0)
        self.assertEqual(len(self.user.heart_set.all()), 0)
