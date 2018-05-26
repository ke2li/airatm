const mongoose = require("mongoose");

const transaction = mongoose.Schema({
	commission: {
		type: Number,
	},

	amount: {
		type: Number,
	},

	clientEmail: {
		type: String,
	},

	merchantEmail: {
		type: String,
	},
});

user.methods.toJSONFor = function() {
	const {amount, commission, clientEmail, merchantEmail, verified} = this;
	return {amount, commission, clientEmail, merchantEmail, verified};
};

module.exports = mongoose.model("Transaction", transaction);