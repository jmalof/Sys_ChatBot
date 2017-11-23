from django.forms import ModelForm, TextInput, HiddenInput, IntegerField, Select, Textarea


from apps.diccionario.models import Diccionario


class DiccionarioForm(ModelForm):
    def __int__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)


    class Meta:
        model = Diccionario
        fields = 'palabra_clave','respuesta'

        exclude=['fecha_reg']
        labels = {
            'palabra_clave': 'Palabras clave',
            'respuesta': 'Respuesta',
        }

        widgets = {
            'palabra_clave': TextInput(attrs={'placeholder': 'Ingrese las palabras clave'}),
            'respuesta': Textarea(attrs={'placeholder': 'Ingrese la respuesta al usuario','rows':'3'}),
        }

