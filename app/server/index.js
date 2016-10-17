var express = require('express');
var app = express();
var server = require('http').createServer(app);
var bodyParser = require('body-parser');
var request = require('request');
var jsonParser = bodyParser.json({limit: '500kb'});

var config = require('../config');
var stripe_secret = config.stripe.test_secret;

var serverHost = '127.0.0.1';
var serverPort = 8080;

var stripe = require('stripe')(stripe_secret);

app.use('/', express.static(process.env.PWD + '/build/app/'));

app.get('/', function(req, res) {
  res.sendFile('index.html' );
});

app.post('/charge', jsonParser, function(req, res) {
  if (!req.body) {
    res.sendStatus(500);
  } else {
    // handle charge here
    var data = req.body;

    console.log('Creating charge');
    var chargeRequest = stripe.charges.create({
      amount: data.amount,
      currency: data.currency,
      source: data.source, // obtained with Stripe.js
      description: data.description
    }, function(err, charge) {
      if (err && err.type === 'StripeCardError') {
        // The card has been declined
      } else if (err) {

      } else {
        console.log(JSON.stringify(charge));
        res.json(charge);
      }
    });

  }
});

server.listen(serverPort, serverHost, function() {
  var port = server.address().port;
  console.log('App listening in port', port);
});
