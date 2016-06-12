// set up ======================================================================
var express = require('express');
var app = express(); 						// create our app w/ express
var port = process.env.PORT || 8080;		// set the port
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var multichain = require("multichain-node")({
    port: 6792,
    host: 'localhost',
    user: 'usr',
    pass: 'pss'
})

// configuration ===============================================================
app.use(express.static(__dirname + '/public')); 		// set the static files location /public/img will be /img for users
app.use(morgan('dev')); // log every request to the console
app.use(bodyParser.urlencoded({'extended': 'true'})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({type: 'application/vnd.api+json'})); // parse application/vnd.api+json as json
app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request

// routes ======================================================================
require('./app/routes.js')(app);

// listen (start app with node server.js) ======================================
app.listen(port);
console.log("App listening on port " + port);

//gerar novo enderecos no blockchain e emitir moeda
multichain.getNewAddress((err, newAddress) => {
    console.log(newAddress);
    multichain.issue({address: newAddress, asset: "zcoin", qty: 10000, units: 0.01}, (err, res) => {
		if(err){
	    	console.log(err);
		}
	    console.log(res)
	});
});
multichain.getNewAddress((err, newAddress) => {
    console.log(newAddress);
});