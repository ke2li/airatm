const mongoose = require("mongoose");

const user = mongoose.Schema({
	firstName: {
		type: String,
	},

	lastName: {
		type: String,
	},

	password: {
		type: String,
	},

	email: {
		type: String,
	},

	score: {
		type: Number,
		default: 0,
	},

	verified: {
		type: Boolean,
		default: false,
	},

	accBalance: {
		type: Number,
		default: 0,
	},

	cashOnHand: {
		type: Number,
		default: 0,
	},

	longitude: {
		type: Number,
	},

	latitude: {
		type: Number,
	},

	online: {
		type: Boolean,
	},

	numTradesPerformed: {
		type: Number,
		default: 0,
	},
});

user.methods.toJSONFor = function() {
	const {firstName, lastName, email, password, reputation, verified, accBalance, cashOnHand, longitude, latitude, online, numTradesPerformed} = this;
	return {firstName, lastName, email, password, reputation, verified, accBalance, cashOnHand, longitude, latitude, online, numTradesPerformed};
};

module.exports = mongoose.model("User", user);