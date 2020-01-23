const { Order, validate } = require("../models/order");
const { Mobile } = require("../models/mobile");
const { Client } = require("../models/client");
const express = require("express");

const router = express.Router();

router.get("/", async (req, res) => {
	const order = await Order.find().sort("order_date");
	res.send(order);
});

router.post("/", async (req, res) => {
	const { error } = validate(req.body);
	if (error) {
		return res.status(400).send(error.details[0].message);
	}

	//Find Id Of Client Document
	const client = await Client.findById(req.params.clientId);
	if (!client) {
		return res.status(400).send("Invalid Client Id.");
	}

	//Find Id Of Mobile Document
	const mobile = await Mobile.findById(req.params.mobileId);
	if (!mobile) {
		return res.status(400).send("Invalid Mobile Id.");
	}

	let order = new Order({
		mobile: {
			_id: mobile._id,
			name: mobile.name,
			price: mobile.price
		},
		client: {
			_id: client._id,
			name: client.name,
			phone: client.phone,
			address: client.address
		},
		total_price: req.body.total_price
	});

	order = await order.save();
	res.send(order);
});

module.exports = router;
