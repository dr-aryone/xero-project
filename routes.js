


console.log("Hi James");

var filter = 'Status == "AUTHORISED"';
// Print out a count of invoices
xeroClient.core.invoices.getInvoices({where: filter})
.then(function(invoices) {
    console.log("Invoices: " + invoices.length);
}).catch(function(err) {
    console.log(err);
});


console.log("Hi Tanya");
