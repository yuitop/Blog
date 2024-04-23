from django.http import HttpResponse

from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

import django.contrib.auth as auth

#from django.contrib.auth import authenticate, login, logout

def getUserData(user) :
    name = user.username if user.is_authenticated else "anon"
    
    roles = user.groups.all()
    role = "viewer" if len(roles) == 0 else str(roles[0])
    
    return { "username" : name, "role" : role }

@api_view(["POST"])
def login(request) :
    # return Response(status=status.HTTP_200_OK)
    
    username = request.POST['username']
    password = request.POST['password']
    
    user = auth.authenticate(request, username=username, password=password)
    
    if user is not None:
        auth.login(request, user)
        return Response( getUserData(user) )
    
    return Response(status=status.HTTP_403_FORBIDDEN)

@api_view(["GET"])
def logout(request) :
    auth.logout(request)
    return Response(status.HTTP_200_OK)


@api_view(["GET"])
def current(request) :
    user = request.user
    
    return Response(getUserData(user)) # #Response()