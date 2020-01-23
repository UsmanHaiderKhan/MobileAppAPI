const Joi = require("joi");
const mongoose = require("mongoose");

var validateEmail = function(email) {
	var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	return re.test(email);
};

const Client = mongoose.model(
	"Client",
	new mongoose.Schema({
		name: {
			type: String,
			required: true,
			minlength: 3,
			maxlength: 50
		},
		email: {
			type: String,
			required: "Enter Your Email Address.",
			validate: [validateEmail, "Please fill a valid email address"],
			match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please fill a valid email address"]
		},
		phone: {
			type: String,
			required: "Phone# is not Valid...!",
			max: 13
		},
		address: {
			type: String,
			required: true,
			minlength: 10,
			maxlength: 100
		}
	})
);
// Client Validation Function
function ValidateClient(client) {
	var Schema = {
		name: Joi.string()
			.trim()
			.min(3)
			.max(50)
			.required(),
		email: Joi.string()
			.trim()
			.email()
			.max(256)
			.required(),
		phone: Joi.string()
			.trim()
			.regex(/^((\+92)|(0092))-{0,1}\d{3}-{0,1}\d{7}$|^\d{11}$|^\d{4}-\d{7}$/)
			.required(),
		address: Joi.string()
			.min(10)
			.max(200)
			.required()
	};
	return Joi.validate(client, Schema);
}
exports.Client = Client;
exports.validate = ValidateClient;
