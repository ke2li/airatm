const express = require('express');
const routes = express.Router();
const User = require('../models/user');
const Transcation = require("../models/transactions");

routes.get('/', (req, res) => res.send('ahhhhhhhh wtf'));

routes.post('/newuser', (req, res) => {
	var firstName = req.body.firstName;
	var lastName = req.body.lastName;
	var password = req.body.password;
	var email = req.body.email;

	//if(!firstName || !lastName || !password ||!email) return res.status(400).send("Missing fields");

	var user = User({
		firstName: firstName,
		lastName: lastName,
		password: password,
		email: email
	});

	user.save(err => {
		if(err) return res.status(400).json(err);
		//res.json(user);
	});

	res.send(JSON.stringify(user));
	//res.redirect('/login');
});

routes.post('/login', (req, res) => {
    var email = req.body.email;
    var password = req.body.password;

    var response = {
        success: false,
        message: "Error"
    };

    User.find({email: email}, (err,users) => {
        if (users.length > 0) {
            var user = users[0];
            if (user.password === password){
                response.success = true;
                response.message = "Successfully Authenticated";
            } else {
                response.message = "Wrong Password";
            }
        } else {
            response.message = "User does not exist";
        }
    })
    //res.redirect('/index');
});

routes.get('/findUsers',(req,res) =>{
	var clientLongitude = req.body.longitude;
	var clientLatitude = req.body.latitude;

	User.find({}, function(err, users){
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

routes.get('/findUserByEmail', (req, res) =>{
	var email = req.body.email;

	User.find({email: email}, function(err, users){
		if(users.length > 0){
			res.json(users[0]);
		}
	});
});

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

routes.put("/transaction", (req,res) =>{
	var clientEmail = req.body.clientEmail;
	var merchantEmail = req.body.merchantEmail;
	var commission = req.body.commission;
	var amount = req.body.amount;
	var accBalance = req.body.accBalance;
	var cashOnHand = req.body.cashOnHand;

    User.fineOneAndUpdate({email: clientEmail}, {$set:{accBalance: accBalance-amount-commission, cashOnHand: cashOnHand+amount}}, function(err, res) {
    	if (err) return res.send(500, {error:err});
    	return res.send("Succesfully changed client account balance")
    });


	User.fineOneAndUpdate({email: merchantEmail}, {$set:{accBalance: accBalance+amount+commission, cashOnHand: cashOnHand-amount}}, function(err, res) {
    	if (err) return res.send(500, {error:err});
    	return res.send("Succesfully changed merchant account balance")
    });
});

routes.put("/updateInfo", (req,res) =>{

});

module.exports = routes;