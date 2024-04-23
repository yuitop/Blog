from ..models import Article

from rest_framework.response import Response
from rest_framework.request import Request

from rest_framework.decorators import api_view
from rest_framework import status

from .serializers import ArticleSerializer, ArticleSerializerLite
from ..forms import ArticleForm

import time
import random

@api_view(["GET"])
def getAll(request) :
    hidden = request.user.has_perm('practice.add_article')
    
    data = Article.objects.order_by("-published").all()
    if not hidden : data = data.filter(hidden=False).all()
    
    serializer = ArticleSerializerLite(data, many=True)
    return Response(serializer.data)

@api_view(["GET"])
def get(request, pk) :
    if not Article.objects.filter(pk=pk).exists() : return Response(status=status.HTTP_400_BAD_REQUEST)
    
    data = Article.objects.get(pk=pk)
    
    serializer = ArticleSerializer(data)
    return Response(serializer.data)


@api_view(["POST"])
def create(request) :
    user = request.user
    if not user.has_perm('practice.add_article') : return Response(status=status.HTTP_401_UNAUTHORIZED)
    
    form = ArticleForm(request.POST, request.FILES)
    
    print(form.errors)

    if form.is_valid() :
        form.instance.author = user
        form.save()
        serializer = ArticleSerializer(form.instance)
        return Response(serializer.data)
    
    return Response(status=status.HTTP_400_BAD_REQUEST)

@api_view(["POST"])
def update(request, pk) :
    user = request.user
    if not user.has_perm('practice.change_article') : return Response(status=status.HTTP_401_UNAUTHORIZED)
    
    instance = Article.objects.get(pk=pk)
    
    if instance == None : return Response(status=status.HTTP_400_BAD_REQUEST)
    
    form = ArticleForm(request.POST, request.FILES, instance=instance)

    if form.is_valid() :
        form.save()
        serializer = ArticleSerializer(form.instance)
        return Response(serializer.data)
    
    return Response(status=status.HTTP_400_BAD_REQUEST)

@api_view(["POST"])
def delete(request, pk) :
    user = request.user
    if not user.has_perm('practice.delete_article') : return Response(status=status.HTTP_401_UNAUTHORIZED)
    
    if not Article.objects.filter(pk=pk).exists() : return Response(status=status.HTTP_400_BAD_REQUEST)
    
    Article.objects.get(pk=pk).delete()
    
    print("delete", pk)
    
    return Response(status=status.HTTP_200_OK)