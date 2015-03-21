var express = require('express');
var app     = express();

var passport      = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var bodyParser = require('body-parser');
var multer     = require('multer'); 

var cookieParser = require('cookie-parser');
var session      = require('express-session');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());

app.use(session({ secret: 'this is the secret' }));
app.use(cookieParser())

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(__dirname + '/public'));

var usersData = [
     {
         firstName: "Rose",
         lastName: "Samuels",
         userName:"rose",
         password: "rose",
         emailID: "rose@gmail.com"
        
     },

    {
        firstName: "Sam",
        lastName: "Pitt",
        userName:"sam",
        password: "sam",
        emailID: "sampitt@gmail.com"
        
    }

];



passport.use(new LocalStrategy(
function(username, password, done)
{
    console.log("I am in startegy");
     
    for (var u in usersData) {
         
        if (username == usersData[u].userName && password == usersData[u].password) {
            console.log("successful login");
           
            return done(null, usersData[u]);
        }

    }

    return done(null, false, { message: 'Unable to login' });
  

 
   
}));

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

var auth = function(req, res, next)
{
    if (!req.isAuthenticated())
        res.send(401);
    else
        next();
};

 

app.get('/loggedin', function(req, res)
{
    res.send(req.isAuthenticated() ? req.user : '0');
});
    
app.post('/login', passport.authenticate('local'), function(req, res)
{
    console.log("sending you the user data");
    var user = req.user;
    console.log(user);
    res.json(user);
    //  res.send(req.user);
});

app.post('/logout', function(req, res)
{
    req.logOut();
    res.send(200);
});

app.post("/register", function (req, res) {
    var user = req.body;

    usersData.push(user);
    console.log("registered!");
    res.json(user);
});


app.post('/exists', function (req, res) {
    var user = req.body;

    console.log("in user exist chk");
    
    console.log(user);

    res.send((userExists(user)) ? 'true' : 'false');
  

});

function userExists(user) {
    for (var u in usersData) {

        if (user.userName == usersData[u].userName) {

            return true;
        }
    }
    return false;
}

app.get('/loggedin', function(req, res)
{
    res.send(req.isAuthenticated() ? req.user : '0');
});

    /*
    req.login(user, function (err) {
        console.log("login after register");
        if (err) { return next(err) };
        res.json(user);
    });

    usersData.push(user, function (err, user) {
        console.log("registered!");
        req.login(user, function (err) {
            console.log("login after register");
            if(err) {return next(err)};
             res.json(user);
        });
        
    });
  */
 

// work-around so that server works locally and on opernshift
var ip = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

app.listen(port, ip);