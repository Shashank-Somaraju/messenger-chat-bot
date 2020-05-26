    const fetch = require('node-fetch');
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
      const userId = event.sender.id;
      const message = event.message.text;

      //console.log("testing 1");
      //console.log(userId);
      //console.log(message);

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
          //console.log("END END END");
          console.log(result.fulfillmentText);



          if(check_if_question(result.fulfillmentText)){
            console.log("GOING TO SEND BUTTON");
            return sendButton(userId,["postback","postback","postback","postback"], split_question(result.fulfillmentText), options_array,["Option1","Option2","Option3","Option4"], tall  );
          }
          else{
            console.log("SENDING TEXT ONLY.. MF");
            return sendTextMessage(userId, result.fulfillmentText);
          }

          console.log("TEXT SENT ...");
        })
        .catch(err => {
          console.error('ERROR:', err);
        });
    }


function check_if_question(text){
  if (text.includes("Question" || "question"){
    console.log(text.includes("Question" || "question"));
    return true;
  }
}  




var options_array=[];

function split_question(text){
  console.log("SPLITTING QUESTION")
  var arr = text.split("4.");
  option_4= arr[1];
  var arr = arr[0].split("3.");
  option_3= arr[1];
  var arr = arr[0].split("2.");
  option_2= arr[1];
  var arr = arr[0].split("1.");
  option_1= arr[1];
  options_array.push(option_1);
  options_array.push(option_2);
  options_array.push(option_3);
  options_array.push(option_4);
  question = arr[0];
  return question;
}










// figure out parameters
function sendButton(recipientId,type,text,payload,caption,size){
  console.log("called")
        var messageData={
                recipient:{
                        id:recipientId
                },
                message:{
                        attachment:{
                                type:"template",
                                payload:{
                                        template_type:"button",
                                        text:text,
                                        buttons:[
                                        ]
                                }
                        }
                }
        };
        var filler;
        for (var i=0;i<type.length;i++)
        {
                if (type[i]==="web_url"){
                        filler ={
                                type:type[i],
                                title:caption[i],
                                url:payload[i],
                                webview_height_ratio:size
                        };
                        messageData.message.attachment.payload.buttons.push(filler);
                }
                else if (type[i]==="postback"){
                        filler ={
                                type:type[i],
                                title:caption[i],
                                payload:payload[i],
                        };
                        messageData.message.attachment.payload.buttons.push(filler);
                }
        }
        callSendAPI(messageData);
}


function callSendAPI(messageData) {
        request({
                //uri:'https://graph.facebook.com/v7.0/me/messages?access_token=${FACEBOOK_ACCESS_TOKEN}'
                uri: 'https://graph.facebook.com/v7.0/me/messages',
                qs: { access_token: token },
                method: 'POST',
                json: messageData
        }, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                        var recipientId = body.recipient_id;
                        var messageId = body.message_id;
                        console.log("Successfully sent generic message with id %s to recipient %s",
                        messageId,recipientId);
                }
                else {
                        //console.error("Unable to send message.");
                        console.error(response);
                        //console.error(error);
                }
        });
}



    