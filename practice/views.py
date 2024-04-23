from django.shortcuts import render
from django.http import HttpResponse

from .forms import ArticleForm
from .models import Article

# Create your views here.

def index(request) :
    
    return render(request, "index.html")
    # data = Article.objects.all()
    
    # user = request.user
    # print( user )
    
    # return render(request, "index.html", context={"articles" : data})

def add(request) :
    
    if request.method == "POST" :
        form = ArticleForm(request.POST, request.FILES)
        
        if form.is_valid() :
            form.save()
            
            data = form.instance
            
            return HttpResponse( "<img src='" + data.image.url + "'>" )
        
        return HttpResponse("no")
    else :
        return render(request, "add.html", {"form" : ArticleForm})