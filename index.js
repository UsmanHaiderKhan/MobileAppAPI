const mongoose = require("mongoose");
const category = require("./routes/category");
const express = require("express");
var app = express();

// mongoose.Promise = global.Promise;

//Create Database Connection
mongoose
	.connect("mongodb://localhost/MobileAPI")
	.then(() => {
		console.log("connection has been established Successfully...");
	})
	.catch(() => {
		console.log(err => console.error("Could not Make Connection...!"));
	});

app.use(express.json());
//API Routing
app.use("/api/category", category);

//port on that it will listen
var port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server Listen On PORT: ${port}...`));
