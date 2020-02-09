const mongoose = require("mongoose");
const winston = require("winston");
module.exports = function() {
	mongoose
		.connect("mongodb://localhost/MobileAPI", {
			useCreateIndex: true,
			useNewUrlParser: true,
			useUnifiedTopology: true
		})
		.then(() => {
			winston.info("connection has been established Successfully...");
		});
};
