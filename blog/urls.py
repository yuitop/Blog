"""
URL configuration for blog project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path

from practice import views
import practice.users.views as users
import practice.articles.views as articles

from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.index, name="home"),
    # path('add', views.add, name="add"),
    
    path('api/users/login', users.login),
    path('api/users/logout', users.logout),
    path('api/users/current', users.current),
    
    path('api/articles/get', articles.getAll),
    path('api/articles/get/<int:pk>', articles.get),
    path('api/articles/create', articles.create),
    path('api/articles/update/<int:pk>', articles.update),
    path('api/articles/delete/<int:pk>', articles.delete),
    
    
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

# if settings.DEBUG:
#     urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)