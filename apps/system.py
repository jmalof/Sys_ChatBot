# -*- coding: utf-8 -*-
import socket
from datetime import datetime

def server_data(request):
    data = {
        'hostname': socket.gethostname(),
        'localhost': socket.gethostbyname(socket.gethostname()),
        'fecha_hoy': datetime.now().strftime('%m/%d/%Y'),
    }
    return data

