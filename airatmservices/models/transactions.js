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

	longitude: {
		type: Number,
	},

	latitude: {
		type: Number,
	},
});

transaction.methods.toJSONFor = function() {
	const {amount, commission, clientEmail, merchantEmail, longitude, latitude} = this;
	return {amount, commission, clientEmail, merchantEmail, longitude, latitude};
};

module.exports = mongoose.model("Transaction", transaction);