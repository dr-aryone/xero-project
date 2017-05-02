$(function(){

  $.ajax({
    url: '/xero/invoices'
  }).done(function(data){
    console.log('invoices data', data);
  }).fail(function(err){
    console.log(err);
  });


  $.ajax({
    url: '/xero/contacts'
  }).done(function(data){
    console.log('contacts data', data);
  }).fail(function(err){
    console.log(err);
  });

}());
