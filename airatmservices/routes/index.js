const express = require('express');
const routes = express.Router();
const User = require('../models/user');
const Transaction = require("../models/transactions");

routes.post('/', (req, res) => res.send('Nothing Here'));

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
		if(err) return res.status(401).json(err);
		console.log("Registration success");
		return res.status(200);
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
                return res.status(200);
            } else {
                response.message = "Wrong Password";
                return res.status(401);
            }
        } else {
            response.message = "User does not exist";
            return res.status(401);
        }
    });
    //res.redirect('/index');
});

routes.post('/findUsers',(req,res) =>{
	User.find({}, function(err, users){
		if(err) return res.status(401).json(err);
		res.status(200).send(JSON.stringify(users));
	});
});

routes.post('/findUserByEmail', (req, res) =>{
	var email = req.body.email;

	User.find({email: email}, function(err, users){
		if(err) return res.stats(401).json(err);
		if(users.length > 0){
			res.status(200).send(users[0]);
		}
		return res.status(401);
	});
});

routes.post("/exchangeCash", (req,res) =>{
	var clientEmail = req.body.clientEmail;
	var merchantEmail = req.body.merchantEmail;
	var newClientBalance = req.body.newClientBalance;
	var newMerchantBalance = req.body.newMerchantBalance;
	var newClientCash = req.body.newClientCash;
	var newMerchantCash = req.body.newMerchantCash;
	var newNumTradesClient = req.body.newNumTradesClient;
	var newNumTradesMerchant = req.body.newNumTradesMerchant;

	var clientUpdate = false;
	var merchantUpdate = false;


    User.findOneAndUpdate({email: clientEmail}, {accBalance: newClientBalance, cashOnHand: newClientCash, numTradesPerformed: newNumTradesClient}, function(err, res) {
    	if (err) return res.status(401).json(err);
    	clientUpdate = true;
    });


	User.findOneAndUpdate({email: merchantEmail}, {accBalance: newMerchantBalance, cashOnHand: newMerchantCash, numTradesPerformed: newNumTradesMerchant}, function(err, res) {
    	if (err) return res.status(401).json(err);
    	merchantUpdate = true;
    });

    if (clientUpdate && merchantUpdate){
    	return res.status(200);
    }
    else{
    	return res.status(401);
    }
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
		if(err)return res.status(401).json(err);
		return res.status(200);
		//res.send(JSON.stringify(transaction));
	});
});

routes.post("/allTransactions", (req,res)=>{
	Transaction.find({merchantEmail: undefined}, function(err, transactions){
		if(err) return res.stats(401).json(err);
		res.status(200).send(JSON.stringify(transactions));
	});
});

routes.post("/satisfyRequest", (req, res)=>{
	var clientEmail = req.body.clientEmail;
	var merchantEmail = req.body.merchantEmail;

	Transaction.findOneAndUpdate({clientEmail: clientEmail},{merchantEmail: merchantEmail}, function(err, transactions){
		if(err) return res.status(401).json(err);
		return res.status(200);
	});
});

routes.post("/transactionLookup", (req, res) =>{
	var email = req.body.email;
	var merchantSent = true;
	var clientSent = true;
	Transaction.find({merchantEmail: email}, function(err, transactions){
		if(err) return res.status(401).json(err);
		if(transactions.length > 0){
			res.status(200).send(transactions[0]);
		} 
		else{
			merchantSent = false;
		}
	});

	Transaction.find({clientEmail: email}, function(err, transactions){
		if(err) return res.status(401).json(err);
		if(transactions.length > 0){
			res.status(200).send(transactions[0]);
		}
		else{
			clientSent = false;
		}
	});

	if(!merchantSent && !clientSent){
		return res.status(401);
	}
});

module.exports = routes;