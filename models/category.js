const Joi = require("joi");
const mongoose = require("mongoose");

// DATABASE Schema
const categorySchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		minlength: 3,
		maxlength: 20
	}
});
const Category = mongoose.model("Category", categorySchema);

// Client Validation Function
function ValidateCategory(category) {
	var Schema = {
		name: Joi.string()
			.min(3)
			.required()
	};
	return Joi.validate(category, Schema);
}

exports.Category = Category;
exports.validate = ValidateCategory;
exports.categorySchema = categorySchema;
