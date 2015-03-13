var express = require('express');
var app = express();
app.use(express.static(__dirname + '/public'));


var bodyParser = require('body-parser');
var multer = require('multer');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(multer()); // for parsing multipart/form-data


var usersData = [
     {
         firstName: "Rose",
         lastName: "Samuels",
         emailID: "rose@gmail.com",
         amount: "700",
         need: "I need money for Education"
     },

    {
        firstName: "Sam",
        lastName: "Pitt",
        emailID: "sampitt@gmail.com",
        amount: "1200",
        need: "I am a single father and my son is suffering from Cancer. Help needed for kid's treatment."
    }

];



app.get('/', function (req, res) {

    res.send('hi');
})

app.get("/rest/user", function (req, res) {

    res.json(usersData);
})


app.get("/rest/user/:index", function (req, res) {

    res.json(usersData[req.params.index]);
})

app.post("/rest/user", function (req, res) {
    var userObj = req.body;
    usersData.push(userObj);
    res.json(usersData);
});


// work-around so that server works locally and on opernshift
var ip = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

app.listen(port, ip);
