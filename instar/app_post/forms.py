from django import forms

from app_post.models import Post


class PostUpdateForm(forms.ModelForm):
    class Meta:
        model = Post
        fields = ['content']
