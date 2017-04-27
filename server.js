var express = require('express');
var bodyParser = require('body-parser');
var app = express();
// var mongoose = require('mongoose'); // DB control program
// var xeroClient = require('./xero-node-client');

var  xero = require('xero-node');
var fs = require('fs');
var config = require("./config.json");


//Private key can either be a path or a String so check both variables and make sure the path has been parsed.
if (config.privateKeyPath && !config.privateKey) {
    config.privateKey = fs.readFileSync(config.privateKeyPath);
}

console.log("config", config);

const xeroClient = new xero.PrivateApplication(config);

console.log(xeroClient, typeof xeroClient);
app.use(express.static('public'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.get('/xero', function(req, res){
  console.log('in route', xeroClient.core.invoices.getInvoices);
  var filter = 'Status == "AUTHORISED"';
  // Print out a count of invoices
  xeroClient.core.invoices.getInvoices({where: filter})
  .then(function(invoices) {
      console.log("Invoices: " + invoices.length);
  }).catch(function(err) {
      console.log(err);
  });
});

app.listen(3333, function(){
    console.log('Server listening');
});
