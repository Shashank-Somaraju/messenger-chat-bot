    const fetch = require('node-fetch');
    const request = require('request');
    let token ='EAAEinZCXNTnQBACIHFIZBCqKHcZC1gWLMedwjZAPm8KXLBVOMIpl6YfhAmBe2pciwNZA7R6ZApgHzixCKG2IgnaAdo6eM8ZBxFPRANvYHxH1R8ZAnOPhgfNQoUHBD03N7bq0gjrg7Y1BL8DLPeNWjlUaUZBGtr98pE2OZCZA1F4Bk13GwZDZD';
    


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
    `https://graph.facebook.com/v7.0/me/messages?access_token=${FACEBOOK_ACCESS_TOKEN}`,
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



    module.exports = (event) => {
      var userId = event.sender.id;
      var message = event.message.text;
      //var message = event.postback.payload;
      //console.log("testing 1");
      //console.log(userId);
      //console.log(message);

      var request = {
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
          //console.log("END END END");
          console.log(result.fulfillmentText);
          if (result.fulfillmentText.includes("Question")){
            console.log("SHOULD NOT SEND BUTTON");
            //return sendButton(userId,["postback","postback","postback"], split_question(result.fulfillmentText), ["Option1","Option2","Option3"],[options_array[0],options_array[1],options_array[2],options_array[3]], "tall");
           // return sendButton(userId,["postback","postback","postback","postback"], "Test Question",["option1","option2","option3","option4"],["Test button1","Test button2","Test button3","Test button4"],"tall");
          }
          else{
            console.log("SENDING TEXT");
            return sendTextMessage(userId, result.fulfillmentText);
          }

          console.log("TEXT SENT ...");
        })
        .catch(err => {
          console.error('ERROR:', err);
        });
    }






