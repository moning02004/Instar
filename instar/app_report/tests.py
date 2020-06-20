from django.test import TestCase
from django.urls import reverse_lazy

from app_comment.models import Comment
from app_post.models import Post
from app_report.models import Report
from app_user.models import User


class ReportTestCase(TestCase):

    @classmethod
    def setUpTestData(cls):
        cls.user = User.objects.create_user(username='user1@a.com', password='password1')
        User.objects.create_user(username='user2@a.com', password='password2')
        cls.post = Post.objects.create(author=cls.user, content='test1')
        cls.comment = Comment.objects.create(post=cls.post, content='abcde')
        cls.report1 = Report.objects.create(author=cls.user, comment=cls.comment, content='comment edcba')
        Report.objects.create(author=cls.user, post=cls.post, content='post edcba')

    def test_list(self):
        self.client.login(username='user1@a.com', password='password1')
        response = self.client.get(reverse_lazy('app_report:list'))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.context_data.get('report_list')), 2)

    def test_create_comment(self):
        self.client.login(username='user2@a.com', password='password2')

        ajax_header = {'HTTP_X_REQUESTED_WITH': 'XMLHttpRequest'}
        response = self.client.post(
            reverse_lazy('app_post:app_comment:report', args=(self.comment.post.id, self.comment.id,)),  data={
                'content': 'comment report second'
            }, **ajax_header)

        self.assertEqual(response.status_code, 200)
        self.comment.refresh_from_db()
        self.assertEqual(len(self.comment.report_set.all()), 2)

    def test_result(self):
        self.client.login(username='user1@a.com', password='password1')

        ajax_header = {'HTTP_X_REQUESTED_WITH': 'XMLHttpRequest'}
        response = self.client.post(reverse_lazy('app_report:result', args=(self.report1.id,)), data={
            'result_type': '3'
        }, **ajax_header)
        self.assertEqual(response.status_code, 200)

        self.report1.refresh_from_db()
        self.assertEqual(self.report1.result, '3')

    def test_result_delete(self):
        self.client.login(username='user1@a.com', password='password1')
        comment = Comment.objects.create(author=self.user, post=self.post, content='ㅋㅋㅋㅋㅋ')
        report = Report.objects.create(author=self.user, comment=comment, content='성의없는 댓글')

        count = len(self.post.comment_set.all())
        ajax_header = {'HTTP_X_REQUESTED_WITH': 'XMLHttpRequest'}
        response = self.client.post(reverse_lazy('app_report:result', args=(report.id,)), data={
            'result_type': '2'
        }, **ajax_header)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(self.post.comment_set.all()), count-1)
