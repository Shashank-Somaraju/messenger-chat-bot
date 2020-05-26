   //console.log("herea");
   const processMessage = require('./process-message');
   const processPayload = require('./process_payload');
   //console.log("hereb");
   module.exports = (req, res) => {
    console.log(req);
    console.log(req.body.object);
      if (req.body.object === "page") {
        req.body.entry.forEach(entry => {
          entry.messaging.forEach(event => {
            //console.log(event);
            //console.log(event.message);
            //console.log(event.message.text);
            if (event.message && event.message.text) {
              const h =processMessage(event);
              console.log("TESTING ...... ");
              console.log(h);
            }
            else if(event.postback){
              processPayload(event);
            }
          });
        });

        console.log(res);
        res.status(200).end();
      }
    };
  