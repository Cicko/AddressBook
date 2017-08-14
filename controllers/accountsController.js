
var User = require('../models/user.js')
var mongoose = require('mongoose')
mongoose.Promise = require('bluebird')
var jwt = require('jsonwebtoken')
const SECRET = require('../jwt-secret.json').secret;

var uri = process.env.MONGODB_URI || "mongodb://rudolfcicko:rudolfcicko23@ds063869.mlab.com:63869/heroku_fkcp7hp5"
mongoose.connect(uri)

const PASSWORD_REGEX = /(?=.*[A-Z])(?=.*[!@#$&_'¡?¿*])(?=.*[0-9])(?=.*[a-z]).{8}/
const PASSWORD_RULES = {
  1: "It must contain at least one uppercase letter",
  2: "It must contain at least one lowercase letter",
  3: "It must contain at least one numeric digit",
  4: "It must contain at least one special symbol from among: !@#$&_'¡?¿",
  5: "Password length must be at least 8 characters"
}


module.exports = {
  createAccount: (req, res) => {
    var email = req.body.email
    var password = req.body.password
    if (!mongoose.connection.readyState)
      res.status(503).json({message: "ERROR: MONGODB Database connection not stablished"})
    if (!(PASSWORD_REGEX.test(password))) {
      res.status(406).json({message: "Password is not strong enough", rules: PASSWORD_RULES})
    }
    else {
      User.findOne({email: email}, (err, user) => {
        if (err || !user) {
          User.create({ email: email, password: password }, function (err, small) {
            if (err) return handleError(err);
            else {
              res.status(201).json({message :"User created! Now you can log in."});
            }
          });
        }
        else
          res.status(409).json({ message: "The user exists"});
        })
    }
  },
  login: (req, res) => {
    var email = req.body.email
    var password = req.body.password;
    if (!email) {
      res.status(400).send('email required')
    }
    if (!password) {
      res.status(400).send('password required')
    }

    User.findOne({ email: email}, (err, user) => {
      if (err) console.log(err);
      if (user) {
        user.comparePassword(password, (err, correct) => {
          if (err) throw err
          if (!correct)
            res.status(401).json({message:'Invalid password'})
          else {

              var token = jwt.sign({ username: email}, SECRET, {
                expiresIn: "2 days"
              });
              res.status(200).json({token: token});
          }
        });
      }
      else if (user == null) {
        res.status(404).json({ message: "This user doesn't exist"});
      }
    });
  },
  getAllAccounts: (req, res) => {
    User.find({}, (err, users) => {
      res.json(users);
    })
  },
  deleteAllAccounts: (req, res) => {
    User.remove({},function(err,numberRemoved){
      res.json({removed: numberRemoved});
    });
  }
}
