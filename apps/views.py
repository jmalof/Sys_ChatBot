from django.shortcuts import render

# Create your views here.

def inicio(request):
    data = {'titulo':'Social Bot'}

    return render(request, 'sistema/panel.html', data)

def login(request):
    data={}
    requerimientos()
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