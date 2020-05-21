    const fetch = require('node-fetch');

    // You can find your project ID in your Dialogflow agent settings
    const projectId = 'my-project-97974'; //https://dialogflow.com/docs/agents#settings
    const sessionId = '123456';
    const languageCode = 'en-US';

    const dialogflow = require('dialogflow');

    const config = {
      credentials: {
        private_key: process.env.DIALOGFLOW_PRIVATE_KEY,
        client_email: process.env.DIALOGFLOW_CLIENT_EMAIL
      }
    };

    const sessionClient = new dialogflow.SessionsClient(config);

    const sessionPath = sessionClient.sessionPath(projectId, sessionId);

    // Remember the Page Access Token you got from Facebook earlier?
    // Don't forget to add it to your `variables.env` file.
    const { FACEBOOK_ACCESS_TOKEN } = process.env;

    const sendTextMessage = (userId, text) => {
        return fetch(
        `https://graph.facebook.com/v2.6/me/messages?access_token=<FACEBOOK_ACCESS_TOKEN>`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify({
            messaging_type: 'RESPONSE',
            recipient: {
              id: userId,
            },
            message: {
              text,
            },
          }),
        }
      );
    }  

    console.log(sendTextMessage);



    module.exports = (event) => {
      const userId = event.sender.id;
      const message = event.message.text;
      console.log("testing 1");
      console.log(userId);
      console.log(message);

      const request = {
        session: sessionPath,
        queryInput: {
          text: {
            text: message,
            languageCode: languageCode,
          },
        },
      };
      console.log(request);
      sessionClient
        .detectIntent(request)
        .then(responses => {
          const result = responses[0].queryResult;
          console.log("BOT BOT BOT:");
          console.log(result);
          console.log("END END END");
          console.log(result.fulfillmentText);
          return sendTextMessage(userId, result.fulfillmentText);
          console.log("TEXT SENT ...");
        })
        .catch(err => {
          console.error('ERROR:', err);
        });
    }