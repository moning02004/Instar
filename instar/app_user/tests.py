from django.test import TestCase
from django.urls import reverse_lazy

from app_user.models import User


class UserTestCase(TestCase):

    @classmethod
    def setUpTestData(cls):
        cls.user1 = User.objects.create_user(username='user1@a.com', password='password1', name='user_1')
        cls.user2 = User.objects.create_user(username='user2@a.com', password='password2', name='user_2')
        cls.user3 = User.objects.create_user(username='user3@a.com', password='password3', name='user_3')
        cls.user4 = User.objects.create_user(username='user4@a.com', password='password4', name='user_4')

    def test_follow(self):
        ajax_header = {'HTTP_X_REQUESTED_WITH': 'XMLHttpRequest'}
        self.client.login(username='user1@a.com', password='password1')

        response = self.client.get(reverse_lazy('app_user:profile', args=(self.user1.id,)))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.context_data.get('follow')), 0)

        self.user1.follow.add(self.user2)
        self.assertEqual(len(self.user1.follow.all()), 1)

        response = self.client.post(reverse_lazy('app_user:follow', args=(self.user1.id, self.user2.id)), **ajax_header)
        self.assertEqual(response.status_code, 200)
        self.user1.refresh_from_db()
        self.assertEqual(len(self.user1.follow.all()), 0)

        response = self.client.post(reverse_lazy('app_user:follow', args=(self.user1.id, self.user2.id)), **ajax_header)
        self.assertEqual(response.status_code, 200)
        self.user1.refresh_from_db()
        self.assertEqual(len(self.user1.follow.all()), 1)
