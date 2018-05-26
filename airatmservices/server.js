const express = require("express");
const app = express();
const router = express.Router();

app.use("/api", router);
Console.log("ya");

app.listen(3000);