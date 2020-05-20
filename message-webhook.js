   console.log("herea");
   const processMessage = require('./process-message');
   console.log("hereb");
   module.exports = (req, res) => {
      if (req.body.object === "page") {
        req.body.entry.forEach(entry => {
          entry.messaging.forEach(event => {
            if (event.message && event.message.text) {
              processMessage(event);
            }
          });
        });

        res.status(200).end();
      }
    };
  