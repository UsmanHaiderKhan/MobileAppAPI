const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const Order = mongoose.model(
	"Order",
	new mongoose.Schema({
		client: {
			type: new mongoose.Schema({
				name: {
					type: String,
					required: true,
					minlength: 3,
					maxlength: 50
				},
				phone: {
					type: String,
					required: true,
					max: 13
				},
				address: {
					type: String,
					required: true,
					minlength: 10,
					maxlength: 200
				}
			}),
			required: true
		},
		mobile: {
			type: new mongoose.Schema({
				name: {
					type: String,
					required: true,
					minlength: 5,
					maxlength: 20,
					trim: true
				},
				price: {
					type: Number,
					required: true,
					min: 0
				}
			}),
			required: true
		},
		order_date: {
			type: Date
		},
		total_price: {
			type: Number,
			required: true,
			min: 0
		}
	})
);

function validateOrder(order) {
	const schema = {
		clientId: Joi.objectId().required(),
		mobileId: Joi.objectId().required(),
		order_date: Joi.date(),
		total_price: Joi.number()
			.min(0)
			.required()
	};
	return Joi.validate(order, schema);
}
exports.Order = Order;
exports.validate = validateOrder;
