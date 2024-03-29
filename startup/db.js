const mongoose = require("mongoose");
const winston = require("winston");
const config = require("config");
module.exports = function() {
	const db = config.get("db");
	mongoose
		.connect(db, {
			useCreateIndex: true,
			useNewUrlParser: true,
			useUnifiedTopology: true
		})
		.then(() => {
			winston.info(`connection has been established with ${db} Successfully...`);
		});
};
