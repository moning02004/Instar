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


class UserProfileUpdateForm(forms.ModelForm):
    image = forms.FileField(label='프로필 사진', required=False)
    name = forms.CharField(label='이름', widget=TextInput(attrs={'placeholder': '이름을 입력해주세요'}))
    phone = forms.CharField(label='전화번호', widget=TextInput(attrs={'placeholder': '휴대 전화번호를 입력해주세요'}), required=False)
    sex = forms.ChoiceField(label='성별', choices=(('1', '남'), ('2', '여',)))
    email = forms.CharField(label='이메일', widget=TextInput(attrs={'placeholder': '이메일을 입력해주세요'}), required=False)
    explain = forms.CharField(label='설명', widget=forms.Textarea(attrs={'rows': 5}), required=False)

    class Meta:
        model = get_user_model()
        fields = ['image', 'name', 'email', 'sex', 'explain', 'phone']


    def save(self, commit=True):
        user = super().save()
        user.save()
        return user


class UserPasswordUpdateForm(forms.ModelForm):
    current = forms.CharField(label='현재 비밀번호', widget=forms.PasswordInput(attrs={'placeholder': '현재 비밓번호를 입력하세요'}))
    password1 = forms.CharField(label='새 비밀번호', widget=PasswordInput(attrs={'placeholder': '비밀번호를 입력하세요'}))
    password2 = forms.CharField(label='새 비밀번호 확인', widget=PasswordInput(attrs={'placeholder': '한 번 더 입력해주세요'}))

    class Meta:
        model = get_user_model()
        fields = ['current', 'password1', 'password2']

    def save(self, commit=True):
        user = super().save()
        user.save()
        return user