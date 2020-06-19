from django import forms

from .models import Comment


class CommentForm(forms.ModelForm):
    post_id = forms.CharField(required=True)
    comment_id = forms.CharField(required=False)

    class Meta:
        model = Comment
        fields = ['post_id', 'comment_id', 'content']