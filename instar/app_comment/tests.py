# comment CRUD
from django.core.files.uploadedfile import SimpleUploadedFile
from django.test import TestCase
from django.urls import reverse_lazy

from app_comment.models import Comment
from app_post.models import Post, File
from app_user.models import User


class CommentTestCase(TestCase):
    @classmethod
    def setUpTestData(cls):
        cls.user = User.objects.create_user(username='user1@a.com', password='password1')
        User.objects.create_user(username='user2@a.com', password='password2')
        cls.post = Post.objects.create(author=cls.user, content='test1')
        image1 = SimpleUploadedFile("file1.jpg", b"abab_image", content_type="image/*")
        cls.file = File.objects.create(post=cls.post, file=image1)

    def test_comment_crud(self):
        self.client.login(username='user1@a.com', password='password1')

        # 추가
        response = self.client.post(reverse_lazy('app_post:app_comment:create', args=(self.post.id,)), data={
            'post': self.post.id,
            'content': '이쁘네'
        })
        self.assertEqual(response.status_code, 302)
        self.assertEqual(Comment.objects.count(), 1)

        # 삭제
        comment = Comment.objects.get(pk=1)
        response = self.client.post(reverse_lazy('app_post:app_comment:delete', args=(self.post.id, comment.id)))
        self.assertEqual(response.status_code, 302)
        self.assertEqual(Comment.objects.count(), 0)

    def test_comment_of_comment(self):
        comment1 = Comment.objects.create(post=self.post, comment=None, content='테스트 댓글 1')
        self.assertEqual(len(comment1.replies.all()), 0)

        self.client.login(username='user1@a.com', password='password1')
        response = self.client.post(reverse_lazy('app_post:app_comment:create', args=(self.post.id,)), data={
            'comment_id': comment1.id,
            'content': '테스트 댓글 1의 댓글 1'
        })
        self.assertEqual(response.status_code, 302)
        self.assertEqual(len(comment1.replies.all()), 1)
