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
	console.log(req.body);

	var user = new User({
		firstName: firstName,
		lastName: lastName,
		password: password,
		email: email
	});

	user.save(err => {
		if(err) return res.status(401).json(err);
		return res.status(200).json("Registration success");
		//res.send(JSON.stringify(user) + firstName + lastName + password + email);
	});
});

routes.post('/login', (req, res) => {
    var email = req.body.email;
    var password = req.body.password;
    console.log(req.body);

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
                return res.status(200).json("Login Successful");
            } else {
                response.message = "Wrong Password";
                return res.status(401).json("Login Unsuccessful");
            }
        } else {
            response.message = "User does not exist";
            return res.status(401).json("Login Unsuccessful");
        }
    });
    //res.redirect('/index');
});

routes.post('/findUsers',(req,res) =>{
	User.find({}, function(err, users){
		if(err) return res.status(401).json(err);
		return res.status(200).json(JSON.stringify(users));
	});
});

routes.post('/findUserByEmail', (req, res) =>{
	var email = req.body.email;

	User.find({email: email}, function(err, users){
		if(err) return res.stats(401).json(err);
		if(users.length > 0){
			return res.status(200).json(users[0]);
		}
		return res.status(401).json("Could not find user");
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

    User.findOneAndUpdate({email: clientEmail}, {accBalance: newClientBalance, cashOnHand: newClientCash, numTradesPerformed: newNumTradesClient}, function(err, res) {
    	if (err) return res.status(401).json(err);
    });


	User.findOneAndUpdate({email: merchantEmail}, {accBalance: newMerchantBalance, cashOnHand: newMerchantCash, numTradesPerformed: newNumTradesMerchant}, function(err, res) {
    	if (err) return res.status(401).json(err);
    });

    return res.status(200).json("Sucessfully updated");
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
		return res.status(200).json("Transaction saved");
		//res.send(JSON.stringify(transaction));
	});
});

routes.post("/allTransactions", (req,res)=>{
	Transaction.find({merchantEmail: undefined}, function(err, transactions){
		if(err) return res.stats(401).json(err);
		return res.status(200).json(transactions);
	});
});

routes.post("/satisfyRequest", (req, res)=>{
	var clientEmail = req.body.clientEmail;
	var merchantEmail = req.body.merchantEmail;

	Transaction.findOneAndUpdate({clientEmail: clientEmail},{merchantEmail: merchantEmail}, function(err, transactions){
		if(err) return res.status(401).json(err);
		return res.status(200).json("Matched");
	});
});

routes.post("/transactionLookup", (req, res) =>{
	var email = req.body.email;
	var merchantSent = true;
	var clientSent = true;
	Transaction.find({merchantEmail: email}, function(err, transactions){
		if(err) return res.status(401).json(err);
		if(transactions.length > 0){
			res.status(200).json(transactions[0]);
		} 
		else{
			Transaction.find({clientEmail: email}, function(err, transactions){
				if(err) return res.status(401).json(err);
				if(transactions.length > 0){
					res.status(200).json(transactions[0]);
				}
				else{
					return res.status(401).json("No transactions found");
				}
			});
		}
	});
});

module.exports = routes;