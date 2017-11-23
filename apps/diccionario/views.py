import json

from django.http import HttpResponse
from django.shortcuts import render

# Create your views here.
from apps.diccionario.form import DiccionarioForm
from apps.diccionario.models import Diccionario

opc_icono = 'fa fa-book'
opc_ruta = '/diccionario/'
opc_nuevo = '/diccionario/nuevo'
opc_crear = '/diccionario/crear'
opc_editar = '/diccionario/editar'
opc_delete = '/diccionario/eliminar'
opc_entidad = 'Diccionario'

def listar(request):
    data = {
        'titulo': 'Social Bot Diccionario', 'icono': opc_icono, 'entidad': opc_entidad,
        'nuevo': 'Agregar consultas', 'ruta': opc_ruta, 'delete': opc_delete,
        'datos':Diccionario.objects.all(),'crud': opc_nuevo, 'crud_editar': opc_editar
    }
    return render(request, 'sistema/diccionario/data.html', data)


def nuevo(request):
    data = {
        'icono': opc_icono, 'ruta': opc_ruta, 'crud': opc_crear, 'entidad': opc_entidad,
        'boton': 'Guardar consultas', 'action': 'add', 'titulo': ' Registro de Consultas'
    }

    return render(request,'sistema/diccionario/form.html', data)

def callback_diccionario(request):
    data={}
    return render(request, 'sistema/diccionario/callback_form.html', data)

def registrar_consultas(request):
    data={}
    if request.method == 'POST':
        try:
            datos = json.loads(request.POST['datos'])
            for cons in datos['consultas']:
                d = Diccionario()
                d.palabra_clave = cons['palabras']
                d.respuesta = cons['respuesta']
                d.save()
            data['resp'] = True
            data['ruta'] = '/diccionario'
        except Exception as e:
            data['error'] = e
            data['resp'] = False
        return HttpResponse(json.dumps(data), content_type="application/json")

def editar_consulta(request):
    data = {}
    if request.method == 'POST':
        try:
            datos = json.loads(request.POST['datos'])

            d = Diccionario.objects.get(id=datos['id'])
            d.palabra_clave = datos['palabras']
            d.respuesta = datos['respuesta']
            d.save()
            data['resp'] = True
            data['ruta'] = '/diccionario'
        except Exception as e:
            data['error'] = e
            data['resp'] = False
        return HttpResponse(json.dumps(data), content_type="application/json")

def eliminar_consulta(request):
    data = {}
    if request.method == 'POST':
        try:
            datos = json.loads(request.POST['datos'])
            print(datos)
            Diccionario.objects.get(id=datos['id']).delete()

            data['resp'] = True
            data['ruta'] = '/diccionario'
        except Exception as e:
            data['error'] = e
            data['resp'] = False
        return HttpResponse(json.dumps(data), content_type="application/json")



