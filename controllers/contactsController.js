var firebase = require('firebase')
var User = require('../models/user.js')
var jwt = require('jsonwebtoken')
const SECRET = require('../jwt-secret.json').secret;

var firebaseApp = firebase.initializeApp({
  serviceAccount: "../SRTV-AddressBook-5b5844595542.json",
  databaseURL: 'https://srtv-addressbook.firebaseio.com/'
});


var rootRef = firebaseApp.database().ref()
var usersRef = rootRef.child('users')

function adaptEmailForFirebase(email) {
  return email.replace("@","at").replace(".","dot");
}

function getEmailFromRequest(req) {
  return jwt.decode(req.headers.authorization.split(" ")[1], SECRET).username;
}

module.exports = {
  createContact: (req, res) => {
    var email = getEmailFromRequest(req);

    User.findOne({ email: email}, (err, user) => {
      if (err) console.log(err);
      if (user) {
        usersRef.child(adaptEmailForFirebase(email)).push(req.body)
        res.status(201).json({message : "Contact added for " + email});
      }
      else if (user == null) {
        res.status(404).json({ message: "This user doesn't exist"});
      }
    });
  }
}
