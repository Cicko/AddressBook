var express = require('express')
const app = express()
var bodyParser = require('body-parser')
var expressJWT = require('express-jwt')
var jwt = require('jsonwebtoken')
var mongoose = require('mongoose');
var User = require('./models/user.js')

//var account = require('./routes/account')
const SECRET = 'Rudolf Cicko want to work in prague'
const PORT = process.env.PORT | 3000;

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(expressJWT({secret: SECRET}).unless({ path : ['/login','/signup']}))

mongoose.connect("mongodb://localhost/srtv")

app.post('/signup', (req, res) => {
  User.findOne({ email: req.body.email}, (err, user) => {
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

app.get('/contacts', (req, res) => {
  var decoded = jwt.decode(req.headers.authorization.split(" ")[1], SECRET);
  var email = decoded.username;


  res.status(200).json(email);
});



app.post('/login', (req, res) => {
  console.log("POIST LO_GIN");
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

app.listen(PORT, (err) => {
  console.log("Listing on port " + PORT);
})


module.exports = app
