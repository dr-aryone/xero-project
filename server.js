var express = require('express');
var bodyParser = require('body-parser');
var app = express();
// var mongoose = require('mongoose'); // DB control program
// var xeroClient = require('./xero-node-client');

var xero = require('xero-node');
var fs = require('fs');
var config = require("./config.json");

//Private key can either be a path or a String so check both variables and make sure the path has been parsed.
if (config.privateKeyPath && !config.privateKey) {
    config.privateKey = fs.readFileSync(config.privateKeyPath);
}

console.log("config", config);

const xeroClient = new xero.PrivateApplication(config);
xero.setLogLevel("debug");


console.log(xeroClient, typeof xeroClient);
app.use(express.static('public'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}));

// parse application/json
app.use(bodyParser.json());


// Print out a count of invoices
app.get('/xero', function(req, res) {
    console.log('in route', xeroClient.core.invoices.getInvoices);
    var filter = 'Status == "AUTHORISED"';

    xeroClient.core.invoices.getInvoices({
            where: filter
        })
        .then(function(invoices) {
            console.log("Invoices: " + invoices.length);
            var response = {
                length: invoices.length
            }
            res.json(response);
        }).catch(function(err) {
            console.log(err);
        });
});


//Print the name of a contact
xeroClient.core.contacts.getContacts({
        where: 'Name.Contains("Bayside")'
    })
    .then(function(contacts) {
            contacts.forEach(function(contact) {
                    console.log(contact.Name);
                 var contactResponse = {
                     contact.Name
                 }
                res.json(contactResponse);
            }).catch(function(err) {
            console.log(err);
        });
    });


/*filter contacts that are type Customer
var filter = 'IsCustomer == true';

xeroClient.core.contacts.getContacts({where: filter})
   .then(function(contacts) {
      //We've got some contacts
      contacts.forEach(function(contact){
         //do something useful
         console.log(contact.IsCustomer); //will be true
      });
   }) */

app.listen(3333, function() {
    console.log('Server listening');
});
