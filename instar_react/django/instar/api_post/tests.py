from django.core.files.uploadedfile import SimpleUploadedFile
from django.test import TestCase

from api_user.models import User


class PostTestCase(TestCase):

    def login_token(self, username, password):
        response = self.client.post('/user/login', data={'username': username, 'password': password})
        self.assertEqual(response.status_code, 200)
        return response.data.get('token')

    def test_register_get_update_delete(self):
        image1 = SimpleUploadedFile("file2.jpg", content=open('test_file/image.jpg', 'rb').read(), content_type="image/*")

        user = User.objects.create_user(username='user@a.com', name='user')
        user.set_password('abcde1234')
        user.save()

        token = self.login_token(username='user@a.com', password='abcde1234')
        header = {'HTTP_AUTHORIZATION': f'JWT {token}'}

        response = self.client.post('/post/', data={
            'content': 'post test 1',
            'images': [image1]
        }, **header)
        self.assertEqual(response.status_code, 201)

        response = self.client.post('/post/', data={
            'content': 'post test 2',
            'images': [image1]
        }, **header)
        self.assertEqual(response.status_code, 201)

        response = self.client.get('/post/', **header)
        self.assertEqual(response.status_code, 200)


