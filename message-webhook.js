   console.log("herea");
   const processMessage = require('./process-message');
   console.log("hereb");
   module.exports = (req, res) => {
      console.log(req);
      if (req.body.object === 'page') {
        console.log(req.body.object);
        req.body.entry.forEach(entry => {
          entry.messaging.forEach(event => {
            if (event.message && event.message.text) {
              console.log("event");
              console.log(event);
              processMessage(event);
            }
          });
        });

        res.status(200).end();
      }
    };
  