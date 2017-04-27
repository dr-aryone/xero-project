(function(){
var  xero = require('xero-node');
var fs = require('fs');
var config = require("./config.json");

console.log("Hi");

//Private key can either be a path or a String so check both variables and make sure the path has been parsed.
if (config.privateKeyPath && !config.privateKey)
    config.privateKey = fs.readFileSync(config.privateKeyPath);

console.log("Hi Dhan");

  const xeroClient = new xero.PrivateApplication(config);

  return xeroClient;
}());
