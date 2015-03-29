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

var userData = [
     {
         firstName: "Rose",
         lastName: "Samuels",
         userName:"rose",
         password: "rose",
         emailID: "rose@gmail.com",
         imgURL: "rose.jpg"
        
     },

    {
        firstName: "Sam",
        lastName: "Pitt",
        userName:"sam",
        password: "sam",
        emailID: "sampitt@gmail.com",
        imgURL: "sam.png"
        
    }

];

var needData = [
     {
         
         userName: "rose",
         summary: "Let's Help This Hardworking Student With College Tuition at The American University",
         amount: "700",
         imgURL: "rose.jpg",
         text: "Despite a personal family situation that created challenges, Samantha worked very hard in high school to graduate and be accepted to universities across the nation. She ultimately decided upon American University in Washington, DC, where she will be studying International Studies and Business. Samantha also plans to start a new club water polo team at the university. Tuition is very expensive and despite financial aid, it will still be very difficult for her family to afford college since her father also has to support her little sister who will be entering sixth grade. Because her family will not be able to financially support her when she goes to college, Samantha is saving for books and living expenses for her first months of school. I really appreciate the help GiveLocally can provide and will use all Gives raised towards tuition, school materials and textbooks for my education. Thank you so much to everyone at GL who reads this story."


     },

    {
        userName: "sam",
        summary: "Help a Single Dad and His Daughter ",
        amount: "5000",
        imgURL: "sam.png",
        text: "Eduardo is a single father of sixteen year old Grecia. For years, he has worked in a supermarket. His hours were cut to 24 a week which were not enough to support his daughter and pay his rent of $1200 per month. Grecia, now in high school, was diagnosed with kidney disease and needs special food and medical assistance that Eduardo can barely provide. Grecia is graduating from school this year and wants to attend college. His immediate concern is affording the right food every day that Grecia's kidneys can tolerate. Eduardo is sharing his story in the hope that he can find a friendly heart through GiveLocally.net who can help him with the struggles he and his daughter are going through."

    }

];


passport.use(new LocalStrategy(
function(username, password, done)
{
    console.log("I am in startegy");
     
    for (var u in userData) {
         
        if (username == userData[u].userName && password == userData[u].password) {
            console.log("successful login");
           
            return done(null, userData[u]);
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
    var newUser = req.body;

    var user  = {};

    user.firstName = newUser.firstName;
    user.lastName = newUser.lastName;
    user.userName = newUser.userName;
    user.password = newUser.password;

    var need = {};

    need.userName = newUser.userName;
    need.amount = newUser.needAmount;
    need.summary = newUser.needSummary;
    need.text = newUser.needText;

    userData.push(user);

    needData.push(need);

    console.log("registered!");
    console.log(userData);
    console.log(needData);

    var temp ={u: user,n: need};
    res.json(temp);
});


app.post('/exists', function (req, res) {
    var user = req.body;

    console.log("in user exist chk");
    
    console.log(user);

    res.send((userExists(user)) ? 'true' : 'false');
  

});

function userExists(user) {
    for (var u in userData) {

        if (user.userName == userData[u].userName) {

            return true;
        }
    }
    return false;
}

app.get('/need', function (req, res) {
    console.log('/need invoked');
    res.json(needData);
    console.log(needData);
});


app.get('/need/user', function (req, res) {
    var userName = req.body;
    console.log('in server.js : need/user');

    console.log(userName);

    for (var n in needData) {

        if (userName == needData[n].userName) {
            console.log("found need");

            return done(null, needData[n]);
        }

    }

    return done(null, false, { message: 'Unable to find need' });
});

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

    userData.push(user, function (err, user) {
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