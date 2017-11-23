from django.db import models

# Create your models here.


class Diccionario(models.Model):
    palabra_clave = models.CharField(max_length=1000)
    respuesta = models.CharField(max_length=1000)
    fecha_reg = models.DateField(auto_now_add=True)


    def __str__(self):
        return '%s' %(self.id)