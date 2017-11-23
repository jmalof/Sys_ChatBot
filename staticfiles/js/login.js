/**
 * Created by Jordy on 09/11/2017.
 */
$(function () {

    function iniciar_sesion(data) {
        $.ajax({
            type: 'POST',
            url: '/conectar/',
            data: data,
            beforeSend: function () {

            },
            success: function (data) {
                if (data.resp) {
                    message_url_alert('Iniciando sesión...', data.ruta);
                    return false;
                }
                message_alert(data.error);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                message_alert(errorThrown + ' ' + textStatus);
            }
        });
    }
    $.confirm({
        theme:'modern',
        icon:'fa fa-sign-in',
        title: 'Iniciar sesión',
        content: 'url:callback',
        type:'blue',
        onContentReady: function () {
            // when content is fetched & rendered in DOM

            var self = this;
            this.$content.find('input').on('keydown', function(ev){
                if(ev.which === 13) {
                    var username = self.$content.find('#username').val();
                    var password = self.$content.find('#password').val();

                    if (username.toString().trim().length > 0 && password.toString().trim().length > 0) {
                        var data = {
                            username: username,
                            password: password,
                        };
                        iniciar_sesion(data);
                    } else {
                        $.dialog({
                            title: '<i class="fa fa-danger" aria-hidden="true"> Alerta !</i>',
                            type: 'red',
                            content: 'Ingrese sus datos de acceso !',
                            draggable: false,
                        });
                    }
                }
            });

            this.$content.find('.iniciar').click(function(){
                var username = self.$content.find('#username').val();
                var password = self.$content.find('#password').val();

                if(username.toString().trim().length > 0 && password.toString().trim().length > 0) {
                    var data = {
                        username:username,
                        password:password,
                    };
                    iniciar_sesion(data);
                }else{
                    $.dialog({
                        title: '<i class="fa fa-danger" aria-hidden="true"> Alerta !</i>',
                        type:'red',
                        content: 'Ingrese sus datos de acceso !',
                        draggable: false,
                    });
                }

            });
            this.$content.find('.reiniciar').click(function(){
                var username = self.$content.find('#username').val('');
                var password = self.$content.find('#password').val('');
            });
        },
        buttons: {
            cerrar: {
                isHidden: true,
                btnClass: 'btn-red',
                action:function () {

                }
            }
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