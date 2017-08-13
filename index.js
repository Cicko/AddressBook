var express = require('express')
const app = express()
var bodyParser = require('body-parser')
var expressJWT = require('express-jwt')
var jwt = require('jsonwebtoken')
var mongoose = require('mongoose');
var User = require('./models/user.js')
var firebase = require('firebase');


var firebaseApp = firebase.initializeApp({
  serviceAccount: "./SRTV-AddressBook-5b5844595542.json",
    databaseURL: 'https://srtv-addressbook.firebaseio.com/'
});


var rootRef = firebaseApp.database().ref();
var usersRef = rootRef.child('users');


const SECRET = 'Rudolf Cicko want to work in prague'

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(expressJWT({secret: SECRET}).unless({ path : ['/login','/signup','/accounts']}))

var uri = 'mongodb://heroku_fkcp7hp5:cc2a7kojnrq2mrdvcu6m2lnenm@ds063869.mlab.com:63869/heroku_fkcp7hp5';
mongoose.createConnection(uri);
//mongoose.connect("mongodb://localhost/srtv")

app.post('/signup', (req, res) => {
  console.log("in signup");
  console.log(mongoose.connection.readyState);
  console.log("Saw mongo state")
  User.findOne({email: req.body.email}, (err, user) => {
    if (err || !user) {
      User.create({ email: req.body.email, password: req.body.password }, function (err, small) {
        if (err) return handleError(err);
        else {
          res.status(201).json({message :"User created! Now you can log in."})
        }
      });
    }
    else
      res.status(409).json({ message: "The user exists"});
    })
})

app.get('/accounts', (req, res) => {
  User.find({}, (err, users) => {
    res.json(users);
  })
});

app.delete('/accounts', (req, res) => {
  User.remove({},function(err,numberRemoved){
       console.log("inside remove call back" + numberRemoved);
       res.json({removed: numberRemoved});
  });
});

app.post('/contacts', (req, res) => {
  var email = getEmailFromRequest(req);
  usersRef.child(adaptEmailForFirebase(email)).push(req.body)
  res.status(201).json({message : "Contact added for " + email});
});



app.post('/login', (req, res) => {
  if (!req.body.email) {
    res.status(400).send('email required')
  }
  if (!req.body.password) {
    res.status(400).send('password required')
  }

  User.findOne({ email: req.body.email}, (err, user) => {
    if (err) console.log(err);
    if (user) {
      user.comparePassword(req.body.password, (err, correct) => {
        if (err) throw err
        if (!correct)
          res.status(401).json({message:'Invalid password'})
        else {
            var token = jwt.sign({ username: req.body.email}, SECRET, {
              expiresIn: "2 days"
            })
            res.status(200).json({token: token});
        }
      });
    }
    else if (user == null) {
      res.status(404).json({ message: "This user doesn't exist"});
    }
  });
});

app.get("/",(req, res) => {
  res.redirect('/login');
});


var port = process.env.PORT || 5000
app.listen(port, (err) => {
  console.log("Listing on port " + port);
})


function getEmailFromRequest(req) {
  return jwt.decode(req.headers.authorization.split(" ")[1], SECRET).username;
}

function adaptEmailForFirebase(email) {
  return email.replace("@","at").replace(".","dot");
}


module.exports = app
