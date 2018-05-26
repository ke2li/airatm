const mongoose = require("mongoose");

const user = mongoose.Schema({
	firstName: {
		type: String,
		required: true,
	},

	lastName: {
		type: String,
		required: true,
	},

	email: {
		type: String,
		required: true,
	},

	password: {
		type: String,
		required: true,
	},

	reputation: {
		type: Number,
		default: 0,
		required: true,
	},

	verified: {
		type: Boolean,
		default: false,
		required: true,
	},

	accBalance: {
		type: Number,
		default: 0,
		required: true,
	},

	cashOnHand: {
		type: Number,
		default: 0,
		required: false,
	},

	longitude: {
		type: Number,
		required: false,
	},

	latitude: {
		type: Number,
		required: true,
	},

	online: {
		type: Boolean,
		required: true,
	},
});

user.methods.toJSONFor = function() {
	const {firstName, lastName, email, password, reputation, verified, accBalance, cashOnHand, longitude, latitude, online} = this;
	return {firstName, lastName, email, password, reputation, verified, accBalance, cashOnHand, longitude, latitude, online};
};

module.exports = mongoose.model("user", user);