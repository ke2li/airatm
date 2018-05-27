const express = require("express");
var app = express();
const path = require('path');
const bodyParser = require("body-parser");
var mongoose = require("mongoose");
//const cors = require("cors");
var PORT = process.env.PORT || 3000;
//mongoose.connect("mongodb://master:lejr@ds263847.mlab.com:63847/lejr");
mongoose.connect('mongodb://master:airatm@ds237770.mlab.com:37770/airatm2');
//mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;
//var mongo = require('mongodb');

const User = require('./models/user');
const transactions = require('./models/transactions')
var routes = require('./routes');

//app.use(cors({origin: '*'}))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true}));
app.use('/', routes);

db.once('open', () => console.log('Connected to database!'));

//app.use("/api", router);
app.listen(PORT, () => {
	console.log('App is running on ${ PORT }');
});