from django import forms
from .models import Article

class ArticleForm(forms.ModelForm) :
    
    image = forms.ImageField(required=False)
    
    class Meta :
        model = Article
        fields = ('label', 'content', 'tags', 'image', 'hidden')