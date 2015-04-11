// Initialization 
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

var mongoose = require('mongoose');
Schema = mongoose.Schema;

var connectionString = process.env.OPENSHIFT_MONGODB_DB_URL || 'mongodb://localhost/uplifter';

mongoose.connect(connectionString);
//----------------------------------------------------------------------

// Schema definitions
var donationReceivedSchema = new Schema({
	donor: String,
	donorName:  String,
	amount: Number,
	receivedOn : Date,
	//receivedOn: {type: Date, default:Date.now},
	message: String
});

var userSchema = new Schema({
	username: String,
	first:  String,
	last: String,
	password: String,
	email: String,
	address:String,
	imgurl: String,
	role: String,                       // "both" : Recipient and Donor, "Donor" : only donor 
	need: {
		  amount: Number,
		  amountReceived: Number,
		  summary: String,
		  text: String
		  
	},
	donationReceived:[donationReceivedSchema]

},
{collection:"user"});




// Model creation

var User = mongoose.model("User",userSchema);

var DonationReceivedModel = mongoose.model("DonationReceivedModel",donationReceivedSchema);

 
//----------------------------------------------------------------------
// REGISTER and LOGIN API
//----------------------------------------------------------------------

passport.use(new LocalStrategy(
function(username, password, done)
{
    console.log("I am in startegy");
   // console.log(username);
   // console.log(password);
  
    
    User.findOne({username: username, password: password}, function(err, user)
    	    {
	    	      if (err) { return done(err); }
	    	      if (!user) { return done(null, false); }
	    	       
	    	     
    	          return done(null, user);
    	     })

}));

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});


app.post('/rest/login', passport.authenticate('local'), function(req, res)
{
    console.log("sending you the user data");
    var user = req.user;
    
    User.findOne({username: user.username}, function(err, user)
    {  
    	if(err) 
        { 
    		console.log(err); 
            return next(err); 
        }
        
        
         // console.log(user);
    	res.json(user);
});

});
 
app.post('/rest/register', function(req, res)
		{
			console.log('in rest/register');
			
		    var newUser = req.body;
		    
		    if(newUser.need){
		    	newUser.need.amountReceived = 0;
		    	newUser.role = "both";
		    }
		    else
	    	{
		    	newUser.role = "donor";
	    	}
        
		 //   console.log(newUser);
		    
		    User.findOne({username: newUser.username}, function(err, user)
		    {
		    	
		        if(err) 
		        { console.log(err); 
		          return next(err); 
		        }
		        
		        if(user)
		        {
		        	console.log('this user already exists:')
		        	//console.log(user.username);
		        	res.json(null);
		            return;
		        }
		        
		        var newUser = new User(req.body);
		        
		        newUser.save(function(err, newUser)
			        {
		        		var user = {};
		        		user.username = newUser.username;
		        		user.password = newUser.password;
			            req.login(user, function(err)
			            {
			                if(err) { return next(err); }
			                res.json(newUser);
			            });
			        });
		       
		      
		    });
});

var auth = function(req, res, next)
{
    if (!req.isAuthenticated())
        res.send(401);
    else
        next();
};


app.get('/rest/loggedin', function(req, res)
{
    res.send(req.isAuthenticated() ? req.user : '0');
});
    

app.post('/rest/logout', function(req, res)
{
    req.logOut();
    res.send(200);
});

//----------------------------------------------------------------------
//VIEW API
//----------------------------------------------------------------------
app.get('/rest/recipient', function(req, res){
	 
	console.log('/rest/recipient');
	
	User.find({}, function(err, users) {
	    var recipientData = [];
	    
	    users.forEach(function(user) {
	    	
	      if(user.need.summary != null){	
	    //	  console.log(user.need);
		      var recipient = {};
		      recipient.id = user._id,
		      recipient.name = user.first + ' ' +  user.last ;
		      
		      recipient.amount = user.need.amount;
		      recipient.summary = user.need.summary;
		      
		      recipientData.push(recipient);
	      }
	    });

	    res.send(recipientData);  
	  }); 
	
});


app.get('/rest/details/:id', function(req, res){
	 
	
	var id = req.params.id
	//console.log(id);
	
	User.findById(req.params.id, function(err, user) {
		  if(err) console.log(err);
		
		  var details = {};
		
		  details.id = user._id,
		  details.username = user.username,
		  details.name = user.first + ' ' +  user.last ;
		  details.email = user.email;
		  details.address = user.address;
		  details.imgurl = user.imgurl;
		  details.role = user.role;
		  
		  details.amount = user.need.amount;
		  details.amountReceived = user.need.amountReceived;
		  details.summary = user.need.summary;
		  details.text = user.need.text;

		  res.send(details);  
	  }); 
	
});


//----------------------------------------------------------------------
// DONATE  API
//----------------------------------------------------------------------
app.put('/rest/donate', function(req, res){
		console.log('in rest/donate');
	 
		var donation = req.body;
		
		var donationRec = {};
		
		donationRec.donor = donation.donor;
		donationRec.donorName = donation.donorName;
		donationRec.amount = donation.amount;
		donationRec.message = donation.message;
		donationRec.receivedOn = donation.date;

		
		var donationGive = {};
		/*
		donationGive.receiver = donation.receiver;
		donationGive.receiverName = donation.receiverName;
		donationGive.amount = donation.amount;
		donationGive.message = donation.message;
		donationGive.receivedOn = donation.date;
		*/
		console.log(donationRec);
		var amountUpdated = donation.totalReceived;
		console.log('amountUpdated:' + donation.totalReceived);
		 
		
		var newDonation = new DonationReceivedModel(donationRec);
		
		/*User.find({username:donation.receiver},function(err,user){
			 amountUpdated = user.amountReceived + donation.amount;
			console.log('amountUpdated' + amountUpdated);
		});*/
		
		
		
		User.update({username:donation.receiver}, {$set: {donationReceived:newDonation , amountReceived: donation.totalReceived }}, function(err, count){
			
			if(err) { 
				console.log(err);
				return next(err);
			}
			
			console.log(count);
			
		 
			
			
		});
		
		
		
		//console.log(donationGive);
		res.json("Done");
		
});		
			
			
//----------------------------------------------------------------------
// PROFILE and SETTINGS API
//----------------------------------------------------------------------

app.get('/rest/profile/:id', function(req, res){
	
	console.log('in /rest/profile');
	User.findById(req.params.id, function(err, user) {
		  if(err) {
			  console.log(err);
		  }
		//  console.log(user);
		  res.json(user);
		
	});	
});


app.post('/rest/update', function(req, res){
			console.log('in rest/update');
			
		    var user = req.body;
		    
		    console.log(user);
		    
		  

			User.find({username: user.username}).remove(function(err,response){
				
				if(err) { return next(err); }
				
				console.log('user removed')
				
				var newUser = new User(user);
		        
		        newUser.save(function(err, newUser)
			        { 
		        	   if(err) { return next(err); }
		        	   console.log('user saved');
		                res.json(newUser);
			             
			        });
			});      
				   
});		


//----------------------------------------------------------------------
//OTHER API
//----------------------------------------------------------------------

//generic  web service to get user details

app.get('/rest/user', function(req, res){
	User.find(function (err,data){
	res.json(data);
	});
});

// generic web service to get configuration details

app.get('/process',function(err,res){
	res.json(process.env);
});

//----------------------------------------------------------------------
// work-around so that server works locally and on opernshift
//----------------------------------------------------------------------

var ip = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;	

app.listen(port, ip);