const Joi = require("joi");
const mongoose = require("mongoose");

//Database Schema

const Mobile = mongoose.model(
	"Mobile",
	new mongoose.Schema({
		name: {
			type: String,
			required: true,
			minlength: 4,
			maxlength: 20
		},
		price: { type: Number, required: true, minlength: 2, maxlength: 4 },
		color: { type: String, required: true },
		description: { type: String, minlength: 8, maxlength: 200 },
		isAvailable: { type: Boolean }
	})
);

// Client Validation
function ValidateMobiles(mobiles) {
	var Schema = {
		name: Joi.string()
			.min(3)
			.required(),
		price: Joi.string()
			.min(5)
			.max(20)
			.required(),
		color: Joi.string().required(),
		description: Joi.string()
			.min(5)
			.max(200)
			.required(),
		isAvailable: Joi.Boolean
	};
	return Joi.validate(mobiles, Schema);
}
exports.Mobile = Mobile;
exports.validate = ValidateMobiles;
