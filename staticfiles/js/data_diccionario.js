/**
 * Created by Jordy on 16/11/2017.
 */

$(function () {
    $('#datos tbody').on('click', 'a[rel="eliminar"]', function () {
        var data = table.row($(this).parents('tr')).data();
        var id = parseInt(data[0]);
        $.confirm({
            title:'Confirmar acción',
            theme:'material',
            icon:'fa fa-trash',
            type:'red',
            content:'Desea eliminar permanentemente la consulta Nº '+(id),
            buttons:{
                Si:{
                    btnClass:'btn-red',
                    action:function () {
                        obj={id:id};

                        eliminar(JSON.stringify(obj));
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
    $('#datos tbody').on('click', 'a[rel="editar"]', function () {
        var data = table.row($(this).parents('tr')).data();
        var id = parseInt(data[0]);

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
                                'id':id,
                                'palabras':palabras,
                                'respuesta':respuesta,
                            };
                            editar(JSON.stringify(obj));
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


     function editar(data) {
        $.ajax({
            type: 'POST',
            dataType: 'JSON',
            url: 'editar',
            data: {datos:data},
            beforeSend: function () {

            },
            success: function (data) {
                if (data.resp) {
                    message_url_alert('Actualizando consulta...', data.ruta);
                    return false;
                }
                message_alert(data.error);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                message_alert(errorThrown + ' ' + textStatus);
            }
        });
    }
     function eliminar(data) {
        $.ajax({
            type: 'POST',
            dataType: 'JSON',
            url: 'eliminar',
            data: {datos:data},
            beforeSend: function () {

            },
            success: function (data) {
                if (data.resp) {
                    message_url_alert('Eliminando consulta...', data.ruta);
                    return false;
                }
                message_alert(data.error);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                message_alert(errorThrown + ' ' + textStatus);
            }
        });
    }
});