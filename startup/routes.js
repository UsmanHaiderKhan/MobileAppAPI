const express = require("express");
const category = require("../routes/category");
const mobile = require("../routes/mobile");
const client = require("../routes/client");
const order = require("../routes/order");
const user = require("../routes/user");
const auth = require("../routes/auth");
const error = require("../middleware/error");

module.exports = function(app) {
	//API Routing
	app.use(express.json());
	app.use("/api/client", client);
	app.use("/api/user", user);
	app.use("/api/auth", auth);
	app.use("/api/mobile", mobile);
	app.use("/api/order", order);
	app.use("/api/category", category);

	//Logging Error Messages
	app.use(error);
};
