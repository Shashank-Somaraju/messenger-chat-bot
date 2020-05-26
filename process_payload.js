const fetch = require('node-fetch');
    const request = require('request');
    let token ='EAAEinZCXNTnQBACIHFIZBCqKHcZC1gWLMedwjZAPm8KXLBVOMIpl6YfhAmBe2pciwNZA7R6ZApgHzixCKG2IgnaAdo6eM8ZBxFPRANvYHxH1R8ZAnOPhgfNQoUHBD03N7bq0gjrg7Y1BL8DLPeNWjlUaUZBGtr98pE2OZCZA1F4Bk13GwZDZD';
    


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
 module.exports = (event) => {
      var userId = event.sender.id;
      //var message = event.message.text;
      console.log(EVENT SHOULD START HERE);
      console.log(event);
      var message = event.postback.payload;
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
            console.log("SHOULD SEND BUTTON");
            return sendButton(userId,["postback","postback","postback"], split_question(result.fulfillmentText), [options_array[0],options_array[1],options_array[2],options_array[3]],[options_array[0],options_array[1],options_array[2],options_array[3]], "tall");
           // return sendButton(userId,["postback","postback","postback","postback"], "Test Question",["option1","option2","option3","option4"],["Test button1","Test button2","Test button3","Test button4"],"tall");
          }
          else{
            console.log("SHOLD NOT BE SENDING TEXT");
            //return sendTextMessage(userId, result.fulfillmentText);
          }

          console.log("TEXT SENT ...");
        })
        .catch(err => {
          console.error('ERROR:', err);
        });
    }


var options_array=[];

function split_question(text){
  //empty the array from to remove perevious answers
  while(options_array.length > 0) {
    options_array.pop();
  }
  //splitting the array
  console.log("SPLITTING QUESTION")
  var arr = text.split("4.");
  var option_4= arr[1];
  var arr = arr[0].split("3.");
  var option_3= arr[1];
  console.log("OPTIONS 3");
  console.log(option_3);
  var arr = arr[0].split("2.");
  var option_2= arr[1];
  var arr = arr[0].split("1.");
  var option_1= arr[1];
 
  
 //pushing answers in array
  options_array.push(option_1);
  options_array.push(option_2);
  options_array.push(option_3);
  //options_array.push(option_4);
  console.log("OPTIONS HERE");
  console.log(options_array);
  question = arr[0];
  return question;
  console.log("Question HERE");
  console.log(question);
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
                uri: 'https://graph.facebook.com/v2.6/me/messages',
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



    
