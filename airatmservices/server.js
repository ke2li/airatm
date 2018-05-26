const express = require("express");
const app = express();
const path = require('path');
const router = express.Router();
const User = require('./models/User');
const routes = require('./routes');

mongoose.connect("mongodb://ke2li:a1ratm@ds233500.mlab.com:33500/airatm");
var db = mongoose.connection;
var mongo = require('mongodb');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true}));
app.use(routes);

//app.use("/api", router);

app.listen(process.NODE_ENV.port || 3000); 