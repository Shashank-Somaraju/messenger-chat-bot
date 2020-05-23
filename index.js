
// Imports dependencies and set up http server
require('dotenv').config({ path: './variables.env' });




  const express = require('express');
  const bodyParser = require('body-parser');
  const request = require('request');
  const verifyWebhook = require('./verify-webhook');
  const messageWebhook = require('./message-webhook');
  var messengerButton = "<html><head><title>Facebook Messenger Bot</title></head><body><h1>Facebook Messenger Bot</h1>This is a bot based on Messenger Platform QuickStart. For more details, see their <a href=\"https://developers.facebook.com/docs/messenger-platform/guides/quick-start\">docs</a>.<script src=\"https://button.glitch.me/button.js\" data-style=\"glitch\"></script><div class=\"glitchButton\" style=\"position:fixed;top:20px;right:20px;\"></div></body></html>";
  
  const app = express();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));


  //console.log("here1");
  app.get('/webhook', verifyWebhook);
  //console.log("here2");
  app.post('/webhook', messageWebhook);

  app.listen(process.env.PORT || 1337, () => console.log('Express server is listening on port 1337'));





 

  













