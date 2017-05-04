/*$(function(){

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


var invoicesContainer = document.getElementById("invoices-info");

function renderHTML(data) {
  invoicesContainer.insertAdjacentHTML('invoices data', data);
} */

var ourRequest = new XMLHttpRequest();
ourRequest.open('GET', 'http://localhost:3333/xero/invoices');
ourRequest.onLoad = function() {
  if (ourRequest.status >= 200 && ourRequest.status < 400) {
    var data = JSON.parse(ourRequest.responseText);
    createHTML(data);
  } else {
    console.log("Error");
  }
};

ourRequest.onerror = function() {
  console.log("Connection error");
};

ourRequest.send();


function createHTML(data) {
  var rawTemplate = document.getElementById("invoiceTemplate").innerHTML;
  var compiledTemplate = Handlebars.compile(rawTemplate);
  var ourGeneratedHTML = compiledTemplate(invoiceData);

  var invoiceContainer = document.getElementById("invoice-container");
  invoiceContainer.innerHTML = ourGeneratedHTML;
}
