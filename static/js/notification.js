function message(texto){
    $.LoadingOverlay("show", {
    image       : "",
    fontawesome : "fa fa-spinner fa-spin",
    custom  : $("<div>", {
        css     : {
            "font-size" : "22px"
        },
        text    : texto
        })
    });
    setTimeout( function(){
      $.LoadingOverlay("hide");
    },1000);
}