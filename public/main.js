$(function(){

  var $invoicesContainer = $("#invoice-container");

  var rawTemplate = $("#invoiceTemplate").html();
  console.log("rawTemplate", rawTemplate);
  var compiledTemplate = Handlebars.compile(rawTemplate);
  console.log("compiledTemplate", compiledTemplate);

  function createInvoiceHTML(data) {
    console.log('html data', data);
    var ourGeneratedHTML = compiledTemplate(data);
    return ourGeneratedHTML;
  }

  $.ajax({
    url: '/xero/invoices'
  }).done(function(data){
    console.log('invoices data', data);
    var invoiceHTML = createInvoiceHTML(data);
    $invoicesContainer.html(invoiceHTML);
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

});
