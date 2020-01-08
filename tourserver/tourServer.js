var express = require('express');
var app = express();
var tourdata = require('./tours.json');
var bcrypt = require('bcryptjs');
var usersdata = require('./userTourHash.json');
const tourdb = require('./tourDBRef');
const userdb = require('./userDBRef');
const session = require('express-session');
const cookieName = "YZ3852TourSid"; 
app.use(session({
	secret: 'website development CSUEB by Kalyani',
	resave: false,
	saveUninitialized: false,
	name: cookieName 
}));
// This initializes session state
const setUpSessionMiddleware = function (req, res, next) {
	//console.log(`session object: ${JSON.stringify(req.session)}`);
	//console.log(`session id: ${req.session.id}`);
	if (!req.session.user) {
		req.session.user = {role: "guest"};
	};
	next();
};
app.use(setUpSessionMiddleware);
app.get('/tours', function (req, res) {
	tourdb.find({}, function(err, docs) {
		if (err) {
			console.log("something is wrong");
		} else {
			//console.log(docs);
			delete docs._id;
			//console.log(docs);
			res.json(docs);
		}
	});
});

const lookuptour= function(req, res) {
	//console.log("test");
	var tourId = req.params.tourid;  
	//console.log(tourId);
	tourdb.find( { "_id" : tourId }, function(err, docs) {
		if (err) {
			console.log("something is wrong");
			res.status(500).json({error: true, message: "Could not retrieve tour"});
		} else {
			if (docs.length === 0) {
				res.status(404).json({error: true, message: "tour not found"});
			}
			//console.log(docs);
			res.json(docs[0]);
			//req.tour= docs[0];
		}
	});
};

var deleteTour = function(req, res){
	res.setHeader('Content-Type', 'application/json');
	var tourID = req.params.tourid;
	console.log(tourID);
	tourdb.remove({_id: tourID},{},function(err, docs) {
	//console.log("Deleted Tour : ", deletedTour);
		//console.log(docs);
	if (docs === 0) {
		res.status(404).json({error: true, message: "tour not found"});
	}
	else if(docs === 1){
		//console.log(docs);
		res.status(200).json("Tour deleted successfully");
	}
	else{
		res.status(404).json("Tour not found");
	}
 });
};


app.get('/tours/:tourid', lookuptour);

app.use(express.json());

const checkAdminMiddleware = function (req, res, next) {
	if (req.session.user.role !== "admin") {
		res.status(401).json({error: "Not permitted"});
	} else {
		next();
	}
};

app.post('/tours',express.json(),function(req, res){
	console.log("Tour data : ", req.body);
	var tour = req.body;
	tourdb.insert(tour, function(err, newDocs) {
		if(err) {
			console.log("Something went wrong when adding");
			console.log(err);
		} else {
			console.log(newDocs);
			res.json(newDocs);
		}
	});
});

app.delete('/tours/:tourid',checkAdminMiddleware, deleteTour);


// Available to all visitors, returns user info if successful
app.post('/login', express.json(), function (req, res) {
	console.log(req.body);
	let email = req.body.email;
	let password = req.body.password;
	//var isUserFound = false;
	userdb.find({"email": new RegExp(req.body.email)}, {_id: 0}, function(err, docs) {
		if (err) {
			console.log("something is wrong");
		} else if (docs.length >0){	
			console.log("login");
			let verified = bcrypt.compareSync(password, docs[0].password);
			console.log(docs[0].password);
			if (verified) {
				console.log("login2");
				let oldInfo = req.session.user;
				req.session.regenerate(function (err) {
					if (err) {console.log(err);}
					let newUserInfo = Object.assign(oldInfo, docs[0]);
					console.log(req.session.id);
					delete newUserInfo.password;
					req.session.user = newUserInfo;
					console.log(newUserInfo);
					res.json(newUserInfo);
					
				});
			} else {
				res.status(401).json({error: true, message: "User/Password error"});
			}
		}
		else {
			res.status(401).json({error: true, message: "User/Password error"});
		}
	});
});

app.get('/logout', function (req, res) {
	let options = req.session.cookie;
	req.session.destroy(function (err) {
		if (err) {
			console.log(err);
		}
		res.clearCookie(cookieName, options); 
		res.json({message: "Goodbye"});
	})
});

port = 5260; 
host = '127.73.78.1'; 
/*app.listen(port, host, function() {
	console.log(`Tourserver listening on IPv4: ${host}:${port}`);
}); */

module.exports = app;
