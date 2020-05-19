var admin = require("firebase-admin");

var serviceAccount = require("./my-project-97974-firebase-adminsdk-hlc0d-a581d49fae.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://my-project-97974.firebaseio.com"
});


const functions = require('firebase-functions');


 exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello from Firebase!");
 });