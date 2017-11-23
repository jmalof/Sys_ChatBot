from django.conf.urls import url

from django.contrib.auth.decorators import login_required
from apps.diccionario import views


urlpatterns = [
    url(r'^$', login_required(views.listar), name='listado'),
    url(r'^nuevo$', login_required(views.nuevo), name='nuevo'),

    url(r'^form_dic$', login_required(views.callback_diccionario), name='callback_diccionario'),

    url(r'^crear$', login_required(views.registrar_consultas), name='registrar_consultas'),
    url(r'^editar$', login_required(views.editar_consulta), name='editar_consulta'),
    url(r'^eliminar$', login_required(views.eliminar_consulta), name='eliminar_consulta'),
]