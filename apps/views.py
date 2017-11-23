from django.contrib.auth.models import User
from django.shortcuts import render

# Create your views here.

def inicio(request):
    data = {'titulo':'Social Bot'}

    return render(request, 'sistema/panel.html', data)

def login(request):
    data={}
    requerimientos()
    if not User.objects.all().exists():
        u = User()
        u.username='admin'
        u.set_password('chatbot1234')
        u.email='jordymalo@hotmail.com'
        u.first_name='Jordy'
        u.last_name='Malo'
        u.is_staff=True
        u.is_superuser=True
        u.is_active=True
        u.save()
    return render(request, 'sistema/login/login.html', data)

def callback_login(request):
    data={}
    return render(request, 'sistema/login/callback_login.html', data)



def requerimientos():
    import pip
    with open("requirements.txt", "w") as f:
        for dist in pip.get_installed_distributions():
            req = dist.as_requirement()
            f.write(str(req) + "\n")