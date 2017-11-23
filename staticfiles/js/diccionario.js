/**
 * Created by Jordy on 09/11/2017.
 */
var consulta={
    detalle:{
        consultas:[]
    },
    add:function (item) {
        this.detalle.consultas.push(item);
        this.list();
    },
    edit:function (id, item) {
        this.detalle.consultas[id] = item;
        this.list();
    },
    remove:function (id) {
        this.detalle.consultas.splice(id, 1);
        this.list();
    },
    removeAll:function () {
        this.detalle.consultas=[];
        this.list();
    },
    obtener_json: function () {
        var data = [];
        for (var i = 0, len = consulta.detalle.consultas.length; i < len; i++) {
            var obj = consulta.detalle.consultas[i];

            data.push([i + 1, obj.palabras, obj.respuesta]);
        }
        return data;
    },
    list:function () {
        table = $('#tabla_detalle').DataTable({
            responsive: true,
            destroy: true,
            bAutoWidth: true,
            data: this.obtener_json(),
            dataSrc: "",

            columnDefs: [
                {
                    'targets': -1,
                    'bSortable': false,
                    'class': 'text-center',
                    'data':null,
                    'defaultContent': '<a style="color:green;" rel="editar"><i class="fa fa-edit fa-lg" aria-hidden="true"></i></a>&nbsp;&nbsp;<a style="color:red;"  rel="eliminar"><i class="fa fa-trash fa-lg" aria-hidden="true"></i></a>'
                },
                {
                    'targets': -2,
                    'bSortable': false,

                },
                {
                    'targets': -3,
                    'bSortable': false,
                },
            ],

        });
    }
};
$(function () {
    consulta.list();
    $('#tabla_detalle tbody').on('click', 'a[rel="editar"]', function () {
        var data = table.row($(this).parents('tr')).data();
        var id = parseInt(data[0]) - 1;

        var txtPalabras;
        var txtRespuesta;
        $.confirm({

            closeIcon:true,
            theme:'material',
            columnClass: 'col-lg-8 col-lg-offset-2',
            containerFluid: true,
            icon:'fa fa-add',
            title: 'Registro de consultas',
            content: 'url:form_dic',
            type:'blue',
            draggable: false,
            onContentReady: function () {
                var self = this;
                txtPalabras = self.$content.find('#palabra_clave');
                txtRespuesta = self.$content.find('#respuesta')

                txtPalabras.val(data[1]);
                txtRespuesta.val(data[2]);
            },
            buttons: {
                editar:{
                    icon:'fa fa-plus',
                    btnClass: 'btn btn-sm btn-linkedin btn-flat',
                    action:function () {
                        var palabras = txtPalabras.val();
                        var respuesta = txtRespuesta.val();

                        if (palabras.toString().trim().length > 0 && respuesta.toString().trim().length > 0) {
                            var obj ={
                                'palabras':palabras,
                                'respuesta':respuesta,
                            };
                            consulta.edit(id,obj);
                            txtPalabras.val('');
                            txtRespuesta.val('');
                        }else{
                            $.dialog({
                                title: '<i class="fa fa-danger" aria-hidden="true"> Alerta !</i>',
                                type:'red',
                                content: 'No ha ingresado valores válidos!',
                                draggable: false,
                            });
                        }
                    }
                },
                cerrar: {
                    btnClass: 'btn btn-sm btn-danger btn-flat',
                    action:function () {

                    }
                },

            },
            contentLoaded: function(data, status, xhr){

            },
            onOpenBefore: function () {

            },
            onOpen: function () {

            },
            onClose: function () {

            },
            onDestroy: function () {

            },

        });
    });
    $('#tabla_detalle tbody').on('click', 'a[rel="eliminar"]', function () {
        var data = table.row($(this).parents('tr')).data();
        var id = parseInt(data[0]) - 1;
        $.confirm({
            title:'Confirmar acción',
            theme:'material',
            icon:'fa fa-trash',
            type:'red',
            content:'Desea eliminar la consulta Nº '+(id+1),
            buttons:{
                Si:{
                    btnClass:'btn-red',
                    action:function () {
                        consulta.remove(id);
                    }
                },
                No:{
                    btnClass:'btn-blue',
                    action:function () {

                    }
                }
            }
        });

    });
    $('#cancelar').on('click',function () {
        if(consulta.detalle.consultas.length>0){
            $.confirm({
                title:'Confirmar acción',
                theme:'material',
                icon:'fa fa-ban',
                type:'red',
                content:'Consultas sin guardar, ¿Desea salir de esta página?',
                buttons:{
                    Si:{
                        btnClass:'btn-red',
                        action:function () {
                            window.location='/diccionario';
                        }
                    },
                    No:{
                        btnClass:'btn-blue',
                        action:function () {

                        }
                    }
                }
            });
        }else{
            window.location='/diccionario';
        }
    });
    $('#borrar').on('click',function () {
        if(consulta.detalle.consultas.length>0) {
            $.confirm({
                title: 'Confirmar acción',
                theme: 'material',
                icon: 'fa fa-trash',
                type: 'red',
                content: '¿Desea eliminar todo los datos ingresados hasta ahora? ',
                buttons: {
                    Si: {
                        btnClass: 'btn-red',
                        action: function () {
                            consulta.removeAll();
                        }
                    },
                    No: {
                        btnClass: 'btn-blue',
                        action: function () {

                        }
                    }
                }
            });
        }
    });
    $('#guardar').on('click',function () {
        if(consulta.detalle.consultas.length == 0) {
            $.dialog({
                title: 'Nada que enviar',
                theme: 'material',
                icon: 'fa fa-info',
                type: 'blue',
                content: 'No ha registrado consultas',
            });
        }else{
            guardar();
        }
    });
    function guardar() {
        $.ajax({
            type: 'POST',
            url: 'crear',
            dataType: 'JSON',
            data: {datos:JSON.stringify(consulta.detalle)},
            beforeSend: function () {

            },
            success: function (data) {
                if (data.resp) {
                    message_url_alert('Enviando consultas...', data.ruta);
                    return false;
                }
                message_alert(data.error);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                message_alert(errorThrown + ' ' + textStatus);
            }
        });
    }
    $('#agregar').on('click',function () {
        var txtPalabras;
        var txtRespuesta;
        $.confirm({

            closeIcon:true,
            theme:'material',
            columnClass: 'col-lg-8 col-lg-offset-2',
            containerFluid: true,
            icon:'fa fa-add',
            title: 'Registro de consultas',
            content: 'url:form_dic',
            type:'blue',
            draggable: false,
            onContentReady: function () {
                var self = this;
                txtPalabras = self.$content.find('#palabra_clave');
                txtRespuesta = self.$content.find('#respuesta')
            },
            buttons: {
                agregar:{
                    icon:'fa fa-plus',
                    btnClass: 'btn btn-sm btn-linkedin btn-flat',
                    action:function () {
                        var palabras = txtPalabras.val();
                        var respuesta = txtRespuesta.val();

                        if (palabras.toString().trim().length > 0 && respuesta.toString().trim().length > 0) {
                            var obj ={
                                'palabras':palabras,
                                'respuesta':respuesta,
                            };
                            consulta.add(obj);
                            txtPalabras.val('');
                            txtRespuesta.val('');
                        }else{
                            $.dialog({
                                title: '<i class="fa fa-danger" aria-hidden="true"> Alerta !</i>',
                                type:'red',
                                content: 'No ha ingresado valores válidos!',
                                draggable: false,
                            });
                        }
                        return false;
                    }
                },
                cerrar: {
                    btnClass: 'btn btn-sm btn-danger btn-flat',
                    action:function () {

                    }
                },

            },
            contentLoaded: function(data, status, xhr){

            },
            onOpenBefore: function () {

            },
            onOpen: function () {

            },
            onClose: function () {

            },
            onDestroy: function () {

            },

        });
    });

});