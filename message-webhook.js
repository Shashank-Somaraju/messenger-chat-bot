   //console.log("herea");
   const processMessage = require('./process-message');
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
              processMessage(event);
            }
          });
        });
        
        console.log(res);
        res.status(200).end();
      }
    };
  