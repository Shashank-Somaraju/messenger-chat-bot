
// Imports dependencies and set up http server
require('dotenv').config({ path: './variables.env' });




  const express = require('express');
  const bodyParser = require('body-parser');
  const request = require('request');
  const verifyWebhook = require('./verify-webhook');
  const messageWebhook = require('./message-webhook');

  const app = express();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));


  //console.log("here1");
  app.get('/webhook', verifyWebhook);
  //console.log("here2");
  app.post('/webhook', messageWebhook);

  app.listen(process.env.PORT || 1337, () => console.log('Express server is listening on port 1337'));





 

  













