import json

from django.contrib.auth import authenticate, login, logout
from django.http import HttpResponse
from django.http import HttpResponseRedirect


def logeo(request):
    data = {}
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(username=username, password=password)

        if user is not None:#and user.is_superuser
            login(request,user)
            data['resp'] = True
            data['ruta'] = 'inicio'
        else:
            data['error'] = 'Usuario no válido'
    else:
        data['error'] = 'Método request no es válido'
    return HttpResponse(json.dumps(data), content_type="application/json")

def deslogeo(request):
    logout(request)
    return HttpResponseRedirect('/')
