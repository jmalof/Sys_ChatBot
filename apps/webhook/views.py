import json
import random
import re

import requests
from django.http import HttpResponse
from django.shortcuts import render

# Create your views here.
from django.utils.decorators import method_decorator
from django.views import generic
from django.views.decorators.csrf import csrf_exempt

from apps.diccionario.models import Diccionario




TOKEN_ACCESO = 'EAAaHZCmVpgGIBACgEyELkf2xgNl3D82krBdxtXo0SZA4CNoOzrNDS2Hts6B5F5ZB9SC3FpEEob1qwenYU49qXphTK91TjZABkmeHgJEx5xDl83mSXPciJ07sgo5lGZAunIirbH4liz7y11FY0TIAdW5fWcpfVkQ9TWE9eLCy8MAZDZD'
VERYFY_TOKEN = 'social_bot_token_jordy_malo'
class conexion(generic.View):
    def get(self, request, *args, **kwargs):
        if self.request.GET['hub.verify_token'] == VERYFY_TOKEN:
            return HttpResponse(self.request.GET['hub.challenge'])
        else:
            return HttpResponse('Error, invalid token')

    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return generic.View.dispatch(self, request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        # Converts the text payload into a python dictionary
        incoming_message = json.loads(self.request.body.decode('utf-8'))
        # Facebook recommends going through every entry since they might send
        # multiple messages in a single call during high load
        for entry in incoming_message['entry']:
            for message in entry['messaging']:
                # Check to make sure the received call is a message call
                # This might be delivery, optin, postback for other events
                if 'message' in message:
                    # Print the message to the terminal
                    print(message)
                    # Assuming the sender only sends text. Non-text messages like stickers, audio, pictures
                    # are sent as attachments and must be handled accordingly.
                    if 'text' in message['message']:
                        post_facebook_message(message['sender']['id'], message['message']['text'])
                    else:
                        post_facebook_message_not_text(message['sender']['id'])
        return HttpResponse()


def post_facebook_message(fbid, mensaje_recibido):
    # Remove all punctuations, lower case the text and split it based on space
    texto_entrada = re.sub(r"[^a-zA-ZáéíóúÁÉÍÓÚ0-9\s]", ' ', mensaje_recibido).lower().split()
    texto_salida = ''
    print("aqui",texto_entrada)
    for palabra in texto_entrada:
        print("palabra", palabra)

        if Diccionario.objects.filter(palabra_clave__contains=palabra).exists():
            print("existe", palabra)
            listado = Diccionario.objects.filter(palabra_clave__contains=palabra)
            random_index = random.randint(0, listado.count() - 1)
            obj = listado[random_index]
            texto_salida += obj.respuesta
            break
    if not texto_salida:
        texto_salida = "No hemos comprendido tu mensaje, inténtalo de otra forma."

    user_details_url = "https://graph.facebook.com/v2.6/%s" % fbid
    user_details_params = {'fields': 'first_name,last_name,profile_pic', 'access_token': TOKEN_ACCESO}
    user_details = requests.get(user_details_url, user_details_params).json()
    texto_salida = '%s, '% user_details['first_name'] + texto_salida

    post_message_url = 'https://graph.facebook.com/v2.6/me/messages?access_token=%s' % TOKEN_ACCESO
    response_msg = json.dumps({"recipient": {"id": fbid}, "message": {"text": texto_salida}})
    status = requests.post(post_message_url, headers={"Content-Type": "application/json"}, data=response_msg)
    print(status.json())


def post_facebook_message_not_text(fbid):
    # Remove all punctuations, lower case the text and split it based on space


    texto_salida = ":)"
    '''
    user_details_url = "https://graph.facebook.com/v2.6/%s" % fbid
    user_details_params = {'fields': 'first_name,last_name,profile_pic', 'access_token': TOKEN_ACCESO}
    user_details = requests.get(user_details_url, user_details_params).json()
    joke_text = 'Yo ' + user_details['first_name'] + '..! ' + texto_salida
    '''

    post_message_url = 'https://graph.facebook.com/v2.6/me/messages?access_token=%s' % TOKEN_ACCESO
    response_msg = json.dumps({"recipient": {"id": fbid}, "message": {"text": texto_salida}})
    status = requests.post(post_message_url, headers={"Content-Type": "application/json"}, data=response_msg)
    print(status.json())