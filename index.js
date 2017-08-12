var express = require('express');
const app = express();
var bodyParser = require('body-parser');

//support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/createAccount", (req, res) => {
  //create a json response
    var requestAsJson = JSON.stringify(req.body);

    //set the appropriate HTTP header
    res.setHeader('Content-Type', 'application/json');

    //log the output
    console.log('The POST data received was: ' + requestAsJson);

    //send the POST data back as JSON
    res.end(requestAsJson);
})

app.get("/",(req, res) => {
  res.send("HOLA POLLO")
});

app.listen(3000);
