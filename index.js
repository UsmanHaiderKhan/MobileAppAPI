require("express-async-errors");
// const error = require("./middleware/error");
const config = require("config");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const mongoose = require("mongoose");
const category = require("./routes/category");
const mobile = require("./routes/mobile");
const client = require("./routes/client");
const order = require("./routes/order");
const user = require("./routes/user");
const auth = require("./routes/auth");
const express = require("express");
var app = express();
app.use(express.json());

mongoose.Promise = global.Promise;
//initialize the Environment Variable

if (!config.get("jwtPrivateKey")) {
	console.log("FATAL ERROR: jwtPrivateKey is not define...");
	process.exit(1);
}

//Create Database Connection
mongoose
	.connect("mongodb://localhost/MobileAPI", {
		useCreateIndex: true,
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
	.then(() => {
		console.log("connection has been established Successfully...");
	})
	.catch(() => {
		console.log(err => console.error("Could not Make Connection...!"));
	});
//Middleware
//API Routing
app.use("/api/client", client);
app.use("/api/user", user);
app.use("/api/auth", auth);
app.use("/api/mobile", mobile);
app.use("/api/order", order);
app.use("/api/category", category);
//Logging Error Messages
// app.use(error);
//port on that it will listen
var port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server Listen On PORT: ${port}...`));
