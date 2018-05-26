const express = require("express");
const app = express();
const path = require('path');
const router = express.Router();
const User = require('./models/user');
const transactions = require('./models/transactions')
const routes = require('./routes');
const bodyParser = require("body-parser");

mongoose.connect("mongodb://ke2li:a1ratm@ds233500.mlab.com:33500/airatm");
var db = mongoose.connection;
var mongo = require('mongodb');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true}));
app.use(routes);

db.once('open', () => console.log('Connected to database!'));

//app.use("/api", router);

app.listen(process.env.port || 3000); 