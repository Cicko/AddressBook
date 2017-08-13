var express = require('express');
const app = express();
var bodyParser = require('body-parser');
var expressJWT = require('express-jwt');
var jwt = require('jsonwebtoken');

//var account = require('./routes/account');



//support parsing of application/json type post data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressJWT({ secret: 'Rudolf Cicko want to work in prague'}).unless({ path : '/login'}));

//support parsing of application/x-www-form-urlencoded post data




app.post('/login', (req, res) => {
  if (!req.body.username)
    res.status(400).send('username required');
  if (!req.body.password)
    res.status(400).send('password required');
})

/*app.post("/account", (req, res) => {
    var requestAsJson = JSON.stringify(req.body);
    res.setHeader('Content-Type', 'application/json');
    console.log('The POST data received was: ' + requestAsJson);
    res.end(requestAsJson);
});
*/

//app.use('/account', account);

app.get("/",(req, res) => {
  res.send("On the root")
});

app.listen(3000);


module.exports = app;
