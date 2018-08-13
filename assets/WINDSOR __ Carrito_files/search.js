$(function () {
    $('#search-input').keypress(function(e){        
        
        if (e.which == 13) {
            e.preventDefault();
            if ($(this).val().length > 0) {

                let module = $(this).data('path');
                let url    = $(this).data('search');
                switch (module) {
                    case "catalogue": 
                           $('#mainLoader').addClass('active');                           
                           $.ajax({                              
                               type   : 'get',
                               url    : url,
                               data   : {module: module, value: $(this).val()},
                               success: function(response) {                                   
                                   response.empty ? toastr.error('No se encontraron productos', 'UPSS!', {closeButton:true}): $('.panel-body-ecomm').html(response);
                                    $('#mainLoader').removeClass('active');                                                                                                                             
                               },
                               error: function(xhr, ajaxOptions, thrownError) {
                               $('#mainLoader').removeClass('active');
                                   switch(xhr.status){
                                       case 404: case 500: 
                                       break;
                                   }
                               }
                           });        
                        break;
                        
                    default: 

                           if (module == "distributors" || module == "accountsList" || module == "products" 
                                || module == "orders" || module == "users" || module == "salesperson") {
                                    $('#mainLoader').addClass('active');                           
                                    $.ajax({                              
                                        type   : 'get',
                                        url    : url,
                                        data   : {module: module, value: $(this).val()},
                                        success: function(response) {                                   
                                            response.empty ? toastr.error('No se encontraron distibuidores', 'UPSS!', {closeButton:true}): 
                                            $('#infoTable>tbody').html(response);                                             
                                            $('#mainLoader').removeClass('active');                                                                                                                             
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

                        break;
                }
                
            }            
          }      
    });



$('#open-help').on('click', function(){
   
    var url = 'http://206.189.208.164/soporte/';
    
    $('#modal-help').on('hidden.bs.modal', function (e) {
        $('#browser-help').attr('src',url); 
      });


    $('#modal-help').modal({
        tags    : "true",
        keyboard: false,
      })  

});

$('#open-perfil').on('click', function(){        
    $('#modal-perfil').modal({
        tags    : "true",
        keyboard: false,
      })    
});

});

$('.input-search-close').on('click',function(e){
    let module = $('#search-input').data('path');
    if (module != 'catalogue') {
        updateTableData();    
    }else{
        $('#mainLoader').addClass('active');     
        location.reload();
    }
    
    
});

