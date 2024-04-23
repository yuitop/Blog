from rest_framework import serializers
from ..models import Article

from ..users.serializers import UserSerializer

class ArticleSerializer(serializers.ModelSerializer):
    author = UserSerializer()

    class Meta:
        model = Article 
        fields = ('pk', 'label', 'content', 'image', 'tags', 'published', 'author', 'hidden')
        
        
class ArticleSerializerLite(serializers.ModelSerializer):
    author = UserSerializer()

    class Meta:
        model = Article 
        fields = ('pk', 'label', 'image', 'tags', 'published', 'author', 'hidden')