from django import forms
from django.contrib.auth import get_user_model
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.forms import TextInput, PasswordInput


class UserLoginForm(AuthenticationForm):
    username = forms.CharField(widget=TextInput(attrs={'placeholder': 'user@example.com'}))
    password = forms.CharField(widget=PasswordInput(attrs={'placeholder': 'password'}))


class UserRegisterForm(UserCreationForm):
    username = forms.CharField(widget=TextInput(attrs={'placeholder': 'user@example.com'}))
    password1 = forms.CharField(widget=PasswordInput(attrs={'placeholder': 'password'}))
    password2 = forms.CharField(widget=PasswordInput(attrs={'placeholder': '한 번 더 입력해주세요'}))
    name = forms.CharField(widget=TextInput(attrs={'placeholder': '이름을 입력해주세요'}))
    phone = forms.CharField(widget=TextInput(attrs={'placeholder': '휴대 전화번호를 입력해주세요'}))
    
    class Meta:
        model = get_user_model()
        fields = ['username', 'password1', 'password2', 'name', 'phone']

    def save(self, commit=True):
        user = super().save()
        user.email = user.username
        user.save()
        return user