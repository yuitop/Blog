from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Article(models.Model) :
    label = models.CharField(max_length=200)
    content = models.CharField(max_length=5000)
    tags = models.CharField(max_length=200, blank=True)
    published = models.DateTimeField(auto_now_add=True)
    image = models.ImageField(upload_to="images", default=None, null=True)
    hidden = models.BooleanField(default=False)
    
    # author = models.ManyToOneRel(User)
    author = models.ForeignKey(User, null=True, on_delete=models.SET_NULL)
    
    def __str__ (self) :
        return self.label