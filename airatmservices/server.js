const express = require("express");
var app = express();
const path = require('path');
const router = express.Router();
const bodyParser = require("body-parser");
var mongoose = require("mongoose");
mongoose.connect('mongodb://airatm:admin@ds237770.mlab.com:37770/airatm2');
//mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;
//var mongo = require('mongodb');

const User = require('./models/user');
const transactions = require('./models/transactions')
var routes = require('./routes/index');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true}));
app.use('/', routes);


db.once('open', () => console.log('Connected to database!'));

//app.use("/api", router);

app.listen(process.env.port || 3000); 