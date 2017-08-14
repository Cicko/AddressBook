var expressJWT = require('express-jwt')
var bodyParser = require('body-parser')
var User = require('./models/user.js')
var jwt = require('jsonwebtoken')
var express = require('express')

const app = express()
const PORT = process.env.PORT || 5000
const SECRET = require('./jwt-secret.json').secret;
const PUBLIC_PATHS = ['/','/login','/signup','/accounts']

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(expressJWT({secret: SECRET}).unless({ path : PUBLIC_PATHS}))

var routes = require('./routes/routes');
routes(app);


app.listen(PORT, (err) => {
  console.log("Listing on port " + PORT);
})

module.exports = app
