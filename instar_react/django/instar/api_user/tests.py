from django.core.files.uploadedfile import SimpleUploadedFile
from django.test import TestCase

from api_user.models import User


class UserTest(TestCase):

    def login_token(self, username, password):
        response = self.client.post('/user/login', data={'username': username, 'password': password})
        self.assertEqual(response.status_code, 200)
        return response.data.get('token')

    def test_register(self):
        response = self.client.post('/user/register', data={
            'username': 'user1@a.com',
            'password1': 'abcde1234',
            'password2': 'abcde1234',
            'name': 'user_1',
            'phone': '01012345678'
        })
        self.assertEqual(response.status_code, 201)  # success resource create
        self.assertIsNotNone(self.login_token('user1@a.com', 'abcde1234'))

        # 비밀번호 다르게 입력
        response = self.client.post('/user/register', data={
            'username': 'user2@a.com',
            'password1': 'abcde12345',
            'password2': 'abcde12346',
            'name': 'user_2',
            'phone': '01012345678'
        })
        self.assertEqual(response.status_code, 400)  # not validate request params

        # 적은 파라미터로 요청
        response = self.client.post('/user/register', data={
            'username': 'user2@a.com',
            'password1': 'abcde1234',
            'password2': 'abcde1234',
        })
        self.assertEqual(response.status_code, 400)  # not allow request's method

        # username 동일하게 입력
        response = self.client.post('/user/register', data={
            'username': 'user1@a.com',
            'password1': 'abcde12345',
            'password2': 'abcde12346',
            'name': 'user_2',
            'phone': '01012345678'
        })
        self.assertEqual(response.status_code, 400)  # not validate request params

        # method get으로 요청
        response = self.client.get('/user/register', data={
            'username': 'user2@a.com',
            'password1': 'abcde1234',
            'password2': 'abcde1234',
            'name': 'user_2',
            'phone': '01012345678'
        })
        self.assertEqual(response.status_code, 405)  # not allow request's method

    def test_get_info(self):
        image = SimpleUploadedFile("file1.jpg", b"abab_image", content_type="image/*")
        response = self.client.post('/user/register', data={
            'username': 'user5@a.com',
            'password1': 'abcde1234',
            'password2': 'abcde1234',
            'name': 'user_5',
            'phone': '01012345678',
            'avatar': image
        })
        self.assertEqual(response.status_code, 201)

        token = self.login_token(username='user5@a.com', password='abcde1234')
        header = {'HTTP_AUTHORIZATION': f'JWT {token}'}
        response = self.client.get('/user/1', **header)
        self.assertEqual(response.status_code, 200)

    def test_update_info(self):
        image = SimpleUploadedFile("file1.jpg", b"abab_image", content_type="image/*")
        response = self.client.post('/user/register', data={
            'username': 'user10@a.com',
            'password1': 'abcde1234',
            'password2': 'abcde1234',
            'name': 'user_10',
            'phone': '01012345678',
            'avatar': image
        })
        self.assertEqual(response.status_code, 201)

        token = self.login_token(username='user10@a.com', password='abcde1234')
        header = {'HTTP_AUTHORIZATION': f'JWT {token}'}

        response = self.client.get('/user/1', **header)
        self.assertEqual(response.status_code, 200)

        response = self.client.patch('/user/1', content_type='application/json', data={
            'name': 'user_new_10',
        }, **header)

        self.assertEqual(response.status_code, 200)

    def test_add_following(self):
        response = self.client.post('/user/register', data={
            'username': 'user1@a.com',
            'password1': 'abcde1234',
            'password2': 'abcde1234',
            'name': 'user_5',
            'phone': '01012345678',
        })
        self.assertEqual(response.status_code, 201)

        response = self.client.post('/user/register', data={
            'username': 'user2@a.com',
            'password1': 'abcde1234',
            'password2': 'abcde1234',
            'name': 'user_5',
            'phone': '01012345678',
        })
        self.assertEqual(response.status_code, 201)

        token = self.login_token(username='user1@a.com', password='abcde1234')
        header = {'HTTP_AUTHORIZATION': f'JWT {token}'}

        user1 = User.objects.get(username='user1@a.com')
        user2 = User.objects.get(username='user2@a.com')

        self.assertEqual(list(user1.following.all()), [])
        response = self.client.patch(f'/user/{user1.id}/{user2.id}', content_type='application/json', **header)
        self.assertEqual(list(user1.following.all()), [user2])

        response = self.client.patch(f'/user/{user1.id}/{user2.id}', content_type='application/json', **header)
        self.assertEqual(list(user1.following.all()), [])

        self.assertEqual(response.status_code, 200)
