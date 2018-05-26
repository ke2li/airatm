const express = require("express");
const app = express();
const router = express.Router();

//app.use("/api", router);
Console.log("ya");
app.get('/', (req, res) => res.send("ahhhhhhhh"))

app.listen(process.NODE_ENV.port || 3000); 