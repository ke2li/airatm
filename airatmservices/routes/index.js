const express = require('express');
const router = express.Router();
const User = require('../models/user');

routes.get('/', (req, res) => res.send('ahhhhhhhh wtf'));

routes.get('/newuser', (req, res) => {
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

	user.save()

	res.redirect('.login');
});

routes.get('/login', (req, res) => {

});