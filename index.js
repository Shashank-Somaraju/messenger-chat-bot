'use strict';

// Imports dependencies and set up http server
require('dotenv').config({ path: 'variables.env' });
const messageWebhook = require('./message-webhook');
const verifyWebhook = require('./verify-webhook');


  const express = require('express');
  const bodyParser = require('body-parser');

  const app = express();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.listen(1337, () => console.log('Express server is listening on port 1337'));

  console.log("here");

  app.get('/', verifyWebhook);

 

  app.post('/', messageWebhook);


 

  













