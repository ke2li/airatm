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

	var user = new User({
		firstName: firstName,
		lastName: lastName,
		password: password,
		email: email
	});

	user.save(err => {
		if(err) return res.status(400).json(err);
		console.log("Registration success");
		//res.send(JSON.stringify(user) + firstName + lastName + password + email);
	});
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
        res.send(response.success);
    })
    //res.redirect('/index');
});

routes.get('/findUsers',(req,res) =>{
	User.find({}, function(err, users){
		res.send(JSON.stringify(users));
	});
});

routes.post('/findUserByEmail', (req, res) =>{
	var email = req.body.email;

	User.find({email: email}, function(err, users){
		if(users.length > 0){
			res.send(users[0]);
		}
	});
});

routes.post("/exchangeCash", (req,res) =>{
	var clientEmail = req.body.clientEmail;
	var merchantEmail = req.body.merchantEmail;
	var newClientBalance = req.body.clientBalance;
	var newMerchantBalance = req.body.merchantBalance;
	var newClientCash = req.body.clientCash;
	var newMerchantCash = req.body.newMerchantCash;
	var amount = req.body.amount;

	var clientUpdate = false;
	var merchantUpdate = false;



    User.fineOneAndUpdate({email: clientEmail}, {$set:{accBalance: newClientBalance, cashOnHand: newClientCash}}, function(err, res) {
    	if (err) return res.send(500, {error:err});
    	clientUpdate = true;
    });


	User.fineOneAndUpdate({email: merchantEmail}, {$set:{accBalance: newMerchantBalance, cashOnHand: newMerchantCash}}, function(err, res) {
    	if (err) return res.send(500, {error:err});
    	merchantUpdate = true;
    });

    if (clientUpdate && merchantUpdate)
    	res.send("Successful transaction");
});

routes.post("/newTransaction", (req,res) => {
	var amount = req.body.amount;
	var commission = req.body.commission;
	var clientEmail = req.body.clientEmail;
	var latitude = req.body.latitude;
	var longitude = req.body.longitude;

	var transaction = new Transaction({
		amount: amount,
		commission: commission,
		clientEmail: clientEmail,
		longitude: longitude,
		latitude: latitude
	});

	transaction.save(err=>{
		if(err)return res.status(400).json(err);
	});
});

routes.get("/allTransactions", (req,res)=>{
	Transaction.find({merchantEmail: undefined}, function(err, users){
		res.send(JSON.stringify(users));
	});
});

routes.post("/satisfyRequest", (req, res)=>{
	var clientEmail = req.body.clientEmail;
	var merchantEmail = req.body.merchantEmail;
});

routes.put("/updateInfo", (req,res) =>{

});

module.exports = routes;