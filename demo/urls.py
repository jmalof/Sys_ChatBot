"""demo URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""

from django.conf.urls import url, include
from django.contrib import admin

from apps import views
from apps import login

urlpatterns = [
    url(r'^sistema/', admin.site.urls),

    url(r'^$', views.login, name='login'),
    url(r'^callback/', views.callback_login, name='callback_login'),
    url(r'^conectar/',  login.logeo,  name='conectar'),
    url(r'^desconectar/',  login.deslogeo,  name='desconectar'),

    url(r'^inicio/',  views.inicio,  name='inicio'),
    url(r'^diccionario/', include('apps.diccionario.urls', namespace='diccionario')),

    url(r'^politicas/',  views.politica,  name='politicas'),

    url(r'^webhook/', include('apps.webhook.urls', namespace='webhook')),

]
