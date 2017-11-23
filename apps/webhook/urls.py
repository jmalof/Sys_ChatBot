from django.conf.urls import url

from django.contrib.auth.decorators import login_required
from apps.webhook import views


urlpatterns = [
    url(r'^$', views.conexion.as_view(), name='conexion'),

]