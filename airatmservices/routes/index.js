const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/', (req, res) => res.send('ahhhhhhhh wtf'));

router.post('/newuser', (req, res) => {
	var firstName = req.body.firstName;
	var lastName = req.body.lastName;
	var password = req.body.password;
	var email = req.body.password;

	if(!firstName || !lastName || !password ||!email) return res.status(400).send("Missing fields");

	var user = new User({
		firstName: firstName,
		lastName: lastName,
		password: password,
		email: email,
	})

	user.save(err => {
		if(err) return res.status(400).json(err);
		res.json(user);
	})

	res.redirect('/login');
});

router.get('/login', (req, res) => {
});

router.get('/findUsers',(req,res) =>{
	var clientLongitude = req.body.longitude;
	var clientLatitude = req.body.latitude;

	user.find({}, function(err, users){
		var index = 0;
		var nearbyUsers = {};
		var nNearby = 0;
		while(users[index] != undefined){
			//500 metre radius
			if(measure(clientLatitude, clientLongitude, users[i].latitude, users[i].longitude) < 500){
				nearbyUsers[nNearby++] = users[index];
			}
			index++;
		}
	});
	res.json(nearbyUsers);
});

router.get('/findUserByEmail', (req, res) =>){
	var email = req.body.email;

	user.find({email: email}, function(err, users){
		if(users.length > 0){
			res.json(users[0]);
		}
	});
}

function measure(lat1, lon1, lat2, lon2){  // generally used geo measurement function
    var R = 6378.137; // Radius of earth in KM
    var dLat = lat2 * Math.PI / 180 - lat1 * Math.PI / 180;
    var dLon = lon2 * Math.PI / 180 - lon1 * Math.PI / 180;
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c;
    return d * 1000; // meters
}

router.put("/transaction", (req,res) =>{

});

router.put("/updateInfo", (req,res) =>{

});