const jwt = require("jsonwebtoken");
const config = require("config");
const Joi = require("joi");
const mongoose = require("mongoose");

var validateEmail = function(email) {
	var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	return re.test(email);
};
const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		minlength: 3,
		maxlength: 50
	},
	email: {
		type: String,
		unique: true,
		required: "Enter Your Email Address.",
		validate: [validateEmail, "Please fill a valid email address"],
		match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please fill a valid email address"]
	},
	password: {
		type: String,
		required: true,
		minlength: 5,
		maxlength: 1024
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
	},
	isAdmin: Boolean
});

//Json Web Token
userSchema.methods.generateAuthToken = function() {
	const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, config.get("jwtPrivateKey"));
	return token;
};

const User = mongoose.model("User", userSchema);
// User Validation Function
function ValidateUser(user) {
	var Schema = {
		name: Joi.string()
			.trim()
			.min(3)
			.max(50)
			.required(),
		email: Joi.string()
			.trim()
			.email()
			.max(255)
			.required(),
		password: Joi.string()
			.min(5)
			.max(255)
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
	return Joi.validate(user, Schema);
}
exports.User = User;
exports.validate = ValidateUser;
