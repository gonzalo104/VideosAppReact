var page = 0;
var discountAdd = 0;
var windowsize  = $(window).width()

$(window).resize(function() {
    windowsize = $(window).width();
  });


function tableResponsive(){
    if (windowsize < 820) {
        
        $("tr td:nth-child(2)").each(function()
        {
            var classTr = $(this).closest('tr').attr('class');
            if (classTr != "tr-iva") {
                var t = $(this);
                var n = t.next();
                var s = n.next();
                t.html(t.html()+"<br>"+ n.html() + "<br>"+ s.html());  
                t.css('color','#44556C');        
                //prices
                var price1 = s.next();
                var price2 = price1.next();
                var price3 = price2.next();
                price1.html(price1.html()+"<br>"+price2.html()+"<br>"+price3.html()+"<br>");
                n.remove();
                s.remove();
                price2.remove();
                price3.remove();  
                t.css('font-size','12px');   
                price1.css('font-size','12px');
                price1.css('color','#707070');
                price1.css('text-align','right');
                $('.thead-car').remove();
                t.prev().css('text-align', 'center');
            }else{                
               $('.remove-responsive').remove();
              var td = $(this).closest('tr').children('td:first');
              td.attr('colspan',1);
              td.removeClass('label-sum');
              td.css('font-size','12px','important');
              td.css('color','#44556C');
              td.css('font-weight','bold');
              var td2 = td.next();
              td2.removeClass('label-sum');
              td2.attr('colspan',2);
              td2.attr('id') != "btn-a" ? td2.css('text-align','right'): td2.css('text-align','left');
              td2.css('color','#44556C');
              td2.css('font-weight','bold');
              $('#discont-add').css('width','120px');
              $('#discont-add').css('text-align','right');
              
                
            }                     
        });
    }
}

$(function () {

    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf_token"]').attr('content')
        }
    });

    totalSubproducts();

    $(document).on('click','.carousel-img', function(e){

       let pathimg = $(this).attr('src');
       $('#imagen-cover').attr('src', pathimg);

    });



    $(document).on('click','.shop-icon',function(e){
        var url = $(this).data('url');
        var id  = $(this).data('idprod');
        $('#mainLoader').addClass('active');
        $.ajax({
         type   : 'post',
         url    : url,
         data   : {id: id},
         success: function(response) {
           
             if(response.success){
                showInfoProduct(response.product, response.subproducts)                        
             }else{
                 //console.log(response.error);
                 toastr.error('Problemas para mostrar el producto', 'UPSS!', {closeButton:true})
             }
         },
         error: function(xhr, ajaxOptions, thrownError) {
             $('#mainLoader').removeClass('active');
             switch(xhr.status){
                 case 404: case 500: 
                 break;
             }
         }
     });
        
        return false;
    });


    function showInfoProduct (product, subproducts){    
    
        $('#infoProducto').on('shown.bs.modal', function () 
        {
            //console.log(product.price_promo)
            //product.price_promo ? console.log(product.price_promo) : console.log("No hay promo")
            $('#price-pro').removeClass('active');
            $('#price-dis').removeClass('active');
            if (product.price_promo) {
                $('#price-pro').html('$'+$.number(product.price_promo,2));
                $('#price-dis').html('$'+$.number(product.price,2));
                $('#price-pro').addClass('active');
                $('#price-dis').addClass('active');       
            }else{
                $('#price-pro').html('$'+$.number(product.price,2));                
            }
            
            $('#modal-title').html(product.title)
            
            $('#subproducts-table > tbody').empty()
            $.each( subproducts, function( key, sub ) {   
                let colorPath = sub.color != null ?  '<img class=""  src="/'+sub.color.path+'"  alt="Responsive image"  width="25" height="25">' : "NA";
                let rodada    = sub.rodada != null ? sub.rodada.name : "Sin rodada";
                let color     = sub.color != null ? sub.color.name : "Sin color";
                let talla     = sub.size != null ? sub.size.name : "Sin talla";
                let subpro    = (color == "Sin color" && rodada == "Sin rodada" && talla == "Sin talla") ? "NA": rodada+" - "+talla+" - "+color;
                $('#subproducts-table > tbody:last-child').append(
                    '<tr>'+
                    '<td>'+sub.clave+'</td>'+
                    '<td>'+                                                                                                             
                    colorPath+
                    '</td>'+
                    '<td>'+
                    subpro+
                    '</td>'+
                    '<td>'+
                    '<input  style="width: 60px; margin-left:20px;" type="text" name=[subp] class="form-control cant-prod" id="'+sub.id+'" data-plugin="asSpinner" value="0">'+
                    '</td>'+
                  '</tr>'
                );        
            });
              $(".cant-prod").asSpinner({
                namespace: 'spinnerUi',
                skin     : null,
                disabled : false,
                min      : 0,
                max      : 99999,
                step     : 1,
                name     : null,
                precision: 0,
                rule     : null,          //string, shortcut define max min step precision

                looping   : true,                     // if cycling the value when it is outofbound
                mousewheel: false,
                format    : function format(value) {
                // function, define custom format
                return value;} 
            });
        });

        $("#infoProducto").on('hidden.bs.modal', function () {
            $('#subproducts-table > tbody').empty()
            $('#modal-title').html("")
            $('#price-pro').html("")
        });


        $('#infoProducto').modal({
            keyboard: false,
        })
      
       
        setTimeout(function(){
            $('#mainLoader').removeClass('active')
          }, 1000);
    }


    $(".cant-prod").asSpinner({
        namespace: 'spinnerUi',
        skin     : null,
        disabled : false,
        min      : 0,
        max      : 99999,
        step     : 1,
        name     : null,
        precision: 0,
        rule     : null,          //string, shortcut define max min step precision

        looping   : true,                     // if cycling the value when it is outofbound
        mousewheel: false,
        format    : function format(value) {
        // function, define custom format
        return value;} 
    });

    $(".cant-prod1").asSpinner({
        namespace: 'spinnerUi',
        skin     : null,
        disabled : false,
        min      : 1,
        max      : 99999,
        step     : 1,
        name     : null,
        precision: 0,
        rule     : null,          //string, shortcut define max min step precision

        looping   : true,                     // if cycling the value when it is outofbound
        mousewheel: false,
        format    : function format(value) {
        // function, define custom format
        return value;} 
    });

    $(".cant-prod-cart").asSpinner({
        namespace: 'spinnerUi',
        skin     : null,
        disabled : false,
        min      : 1,
        max      : 99999,
        step     : 1,
        name     : null,
        precision: 0,
        rule     : null,          //string, shortcut define max min step precision

        looping   : true,                     // if cycling the value when it is outofbound
        mousewheel: false,
        format    : function format(value) {
        // function, define custom format
        return value;} 
    });

/*********************SHOPPING CART ****************************/

    $(document).on('click','#save-shopping-cart', function(e){
        $('input[name=subp]').each(function(i,val){ console.log(val.value) });
        var $inputs = $('#formShopping :input[type=text]');
        var values  = [];
        $inputs.each(function() {
            if (parseInt($(this).val()) != 0) {
                values.push([parseInt($(this).attr('id')),parseInt($(this).val())])    
            }            
        });
        if (values.length>0) {

            $('#mainLoader').addClass('active');
            $.ajax({
             type   : 'post',
             url    : $('#formShopping').attr('action'),
             data   : {values: values},
             success: function(response) {
                $('#mainLoader').removeClass('active');
                 if(response.success){                    
                    toastr.success("Se agrego correctamente al carrito", "¡ATENCIÓN!", {closeButton:true}); 
                    $('#infoProducto').modal('toggle');
                    totalSubproducts();
                    console.log(response.res)                  
                 }else{
                     toastr.error('Problemas para agregar al carrito', 'UPSS!', {closeButton:true})
                 }
             },
             error: function(xhr, ajaxOptions, thrownError) {
                 $('#mainLoader').removeClass('active');
                 switch(xhr.status){
                     case 404: case 500: 
                     break;
                 }
             }
         });
        }       
    })

    $(document).on('click','#add_car_p',function(e){
        var $inputs = $('#formShopping2 :input[type=text]');
        var values  = [];
        $inputs.each(function() {
            if (parseInt($(this).val()) != 0) {
                values.push([parseInt($(this).attr('id')),parseInt($(this).val())])    
            }            
        });
        if (values.length>0) {

            $('#mainLoader').addClass('active');
            $.ajax({
             type   : 'post',
             url    : $('#formShopping2').attr('action'),
             data   : {values: values},
             success: function(response) {
               
                 if(response.success){
                    $('#mainLoader').removeClass('active'); 
                    toastr.success("Se agrego correctamente al carrito", "¡ATENCIÓN!", {closeButton:true}); 
                    totalSubproducts();
                    var $inputs2 = $('#formShopping2 :input[type=text]');
                    $inputs.each(function() {
                        $(this).val(0)                                                             
                    });

                 }else{
                     toastr.error('Problemas para agregar al carrito', 'UPSS!', {closeButton:true})
                 }
             },
             error: function(xhr, ajaxOptions, thrownError) {
                 $('#mainLoader').removeClass('active');
                 switch(xhr.status){
                     case 404: case 500: 
                     break;
                 }
             }
         });
        } 
       
       
    });


    $(document).on('click','#addOrder', function(){
       let disSelected = $('#distributor_input').val();
        if (disSelected != null && disSelected != "") {
            let products = parseInt($('#number-cart').html());
            if (products > 0) {
                $('#alertOrder').modal({
                    tags    : "true",
                    keyboard: false,
                    backdrop: 'static',
      
                  })  
            }else{
                toastr.error('No hay productos registrados', 'UPSS!', {closeButton:true})
            }
           
        }else{
            toastr.error('Seleccione un distribuidor', 'UPSS!', {closeButton:true})
        }

    });

    $(document).on('click','#saveOrder', function(){
       let url     = $(this).data("url");
       let success = $(this).data("success");
       $('#mainLoader').addClass('active');
       $.ajax({
        type   : 'post',
        url    : url,
        data   : {salesperson: $('#salesperson_input').val(), distributor: $('#distributor_input').val(), discount: $('#discont-add').val()},
        success: function(response) {
            if(response.success){
                window.location.href = success+"/"+response.order
                //console.log(response.order)
            }else{
                toastr.error('Problemas para registrar el pedido', 'UPSS!', {closeButton:true})
                console.log(response.error)
                $('#mainLoader').removeClass('active');
            }
        },
        error: function(xhr, ajaxOptions, thrownError) {
            $('#mainLoader').removeClass('active');
            switch(xhr.status){
                case 404: case 500: 
                break;
            }
        }
    });
        
    });



    $(document).on('click', '.fa-times', function() {
        let id  = $(this).data('id')
        let url = $(this).data('url')

        alertify.theme('bootstrap');
        alertify
         .okBtn("Si, eliminar")
         .cancelBtn("No, cancelar")
         .confirm("¿Desea eliminar el producto?", function (ev) {
          ev.preventDefault();
          $('#mainLoader').addClass('active');
          $.ajax({
            type   : 'post',
            url    : url,
            data   : {id: id},
            success: function(response) {
                if(response.success){
                    toastr.success("Se elimino el producto del carrito de compras", "¡ATENCIÓN!", {closeButton:true}); 
                    updateTableData()
                    $('#mainLoader').removeClass('active');
    
                }else{
                    toastr.error('Problemas para eliminar el producto del carrito', 'UPSS!', {closeButton:true})
                    $('#mainLoader').removeClass('active');
                }
            },
            error: function(xhr, ajaxOptions, thrownError) {
                $('#mainLoader').removeClass('active');
                switch(xhr.status){
                    case 404: case 500: 
                    break;
                }
            }
        });
        }, function(ev) {
            ev.preventDefault();
        }); 

    });

    $(document).on('asSpinner::change', '.cant-prod-cart', function() {
        let id       = $(this).data('idcart')
        let quantity = ($(this).val() == 0) ? 1 : $(this).val()
        let url      = $(this).data('url')
        
        $.ajax({
            type   : 'post',
            url    : url,
            data   : {id: id, quantity: quantity},
            success: function(response) {
                if(response.success){
                    updateTableData()
                     
                }else{
                    toastr.error('Problemas para modificar la cantidad', 'UPSS!', {closeButton:true})
                }
            },
            error: function(xhr, ajaxOptions, thrownError) {
                $('#mainLoader').removeClass('active');
                switch(xhr.status){
                    case 404: case 500: 
                    break;
                }
            }
        });
    });

      function updateTableData(){
       
          let distriSel = $('#distributor_input').val() == null ? "" : $('#distributor_input').val();
            $('#infoTablecart tbody').load($('#infoTablecart').data('url'), {distributor: distriSel}, function() {
            $('[data-toggle="tooltip"]').tooltip();
            $(".tooltip").tooltip("hide");

            $(".cant-prod-cart").asSpinner({
                namespace: 'spinnerUi',
                skin     : null,
                disabled : false,
                min      : 0,
                max      : 99999,
                step     : 1,
                name     : null,
                precision: 0,
                rule     : null,          //string, shortcut define max min step precision

                looping   : true,                     // if cycling the value when it is outofbound
                mousewheel: false,
                format    : function format(value) {
                // function, define custom format
                return value;} 
            });
               totalSubproducts();    

        });
    }

    $(document).on('change','#discont-add',function(e){  
        if ($(this).val() >= 0 && $(this).val() != "") {
            discountAdd = $(this).val()
            totalDiscount();
        }else{            
            $(this).val(0).trigger('change');
        }           
        
    });

    function totalDiscount(){
        let subtotal = $('#get-sub').data('sub');
        let discount = discountAdd != "" ? discountAdd : 0;
            subtotal = subtotal - discount;
        let newIva   = $.number( (subtotal * 16/100), 2 );
        let newTotal = $.number(subtotal * 1.16, 2);
        //console.log(`iva: ${newIva}, total: ${newTotal}`);
        $('#totalg').html('Total $'+newTotal);
        $('#total-input').html('$'+newTotal);
        $('#iva-input').html('$'+newIva); 
        if (discountAdd != "" && discountAdd != 0) {
            $('#discont-add').val(discountAdd);
        }
    }



    function totalSubproducts(){
        let distriSel = $('#distributor_input').val() == null ? "" : $('#distributor_input').val();
        $.ajax({
            type   : 'post',
            url    : $('#number-cart').data('url'),
            data   : {distributor: distriSel},
            success: function(response) {
                if(response.success){
                   $('#number-cart').html(response.res);                                                 
                   totalDiscount();             
                }
            },
            error: function(xhr, ajaxOptions, thrownError) {
                switch(xhr.status){
                    case 404: case 500: 
                    break;
                }
            }
        });
        

    }

    $('#salesperson_input').change(function(e){
        var salespersonSelected = $('#salesperson_input').val();
        if (salespersonSelected != "" && salespersonSelected != null) {
                $('#distributor_input option').remove();
                $('#distributor_input').removeAttr('disabled');
                $('#distributor_input').val('').trigger('change'); 
                $('#distributor_input').append($('<option>', {
                        value: "",
                        text : "Seleccionar"
                }));
                $.each(distributors, function(id, value){
                    if (value.salesperson == salespersonSelected) {
                        $('#distributor_input').append($('<option>', {
                            value: value.id,
                            text : value.razon_social
                        }));
                    }
                });           
            }else{
                $('#distributor_input option').remove();
                $('#distributor_input').val('').trigger('change');
                $('#distributor_input').attr('disabled', true);                 
            }
      
      });

      $('#distributor_input').change(function(e){
        updateTableData();
      });


    $('.js-example-basic-single-sales').select2({
        placeholder: 'Vendedor',
        allowClear : true,
        width      : '200px',
      });
      $('.js-example-basic-single-dis').select2({
        placeholder: 'Distribuidor',
        allowClear : true,
        width      : '200px',
      });

if ($('#search-input').data('path') == "catalogue") {
    $('.panel-body-ecomm').infiniteScroll({
        path: function() {          
            if ( this.loadCount <= last ) {
              var nextIndex = this.loadCount + 2;
              if (filter) {
                return thisUrl+'&page='+nextIndex;
              }else{
                return thisUrl+'?page='+nextIndex;
              }
              
            }
          },        
        append         : '.post',
        status         : '.page-load-status',
        history        : false,
        scrollThreshold: true,
        prefill        : true,


        
      });
}

   $(document).on('click','#iconFilter', function(e){
    $('#filter-catalogue').modal({
        tags    : "true",
        keyboard: false,
      });
   });
      


$(document).on('click','#filter-catalogue-btn',function(e){
    if ($('#modality-dro').val().length > 0 || $('#rodada-dro').val().length > 0 || $('#size-dro').val().length > 0) {
        var mod           = "modality="+$('#modality-dro').val();
        var rod           = "rodada="+$('#rodada-dro').val();
        var siz           = "size="+$('#size-dro').val();
        var url           = urlOr+'?'+mod+'&'+rod+'&'+siz;
            location.href = url;
        
    }else{
        toastr.error('Selecciones una característica', 'UPSS!', {closeButton:true})
    }
});



    tableResponsive();
 

});


