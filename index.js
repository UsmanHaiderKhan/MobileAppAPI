const mongoose = require("mongoose");
const category = require("./routes/category");
const mobile = require("./routes/mobile");
const client = require("./routes/client");
const order = require("./routes/order");
const express = require("express");
var app = express();
app.use(express.json());

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

//API Routing
app.use("/api/client", client);
app.use("/api/mobile", mobile);
app.use("/api/order", order);
app.use("/api/category", category);

//port on that it will listen
var port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server Listen On PORT: ${port}...`));
