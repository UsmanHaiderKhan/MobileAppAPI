const Joi = require("joi");
const mongoose = require("mongoose");
const { categorySchema } = require("./category");

//Database Schema

//Mobile Schema
const Mobile = mongoose.model(
	"Mobile",
	new mongoose.Schema({
		name: {
			type: String,
			required: true,
			minlength: 4,
			maxlength: 20,
			trim: true
		},
		category: {
			type: categorySchema,
			required: true
		},
		price: { type: Number, required: true, min: 0 },
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
		price: Joi.number()
			.min(0)
			.required(),
		color: Joi.string().required(),
		categoryId: Joi.objectId().required(),
		description: Joi.string()
			.min(5)
			.max(200)
			.required(),
		isAvailable: Joi.boolean()
	};
	return Joi.validate(mobiles, Schema);
}
exports.Mobile = Mobile;
exports.validate = ValidateMobiles;
