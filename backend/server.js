const express = require("express");
const bodyParser = require("body-parser");
const mysqlConnection = require("./connection");
const peopleRoutes = require("./routes/people");
const cors = require("cors");
const fileUpload = require("express-fileupload");


var app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
  }));
app.use("/", peopleRoutes);





app.listen(5555);