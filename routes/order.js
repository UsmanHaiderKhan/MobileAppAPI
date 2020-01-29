const { Order, validate } = require("../models/order");
const { Mobile } = require("../models/mobile");
const { Client } = require("../models/client");
// const mongoose = require("mongoose");
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

	// validation for the Valid Client Id
	//thats not a good approach
	// if (!mongoose.Types.ObjectId.isValid()) {
	// 	return res.status(400).send("Client is not Valid...");
	// }

	//Find Id Of Client Document
	const client = await Client.findById(req.body.clientId);
	if (!client) {
		return res.status(400).send("Invalid Client Id.");
	}

	//Find Id Of Mobile Document
	const mobile = await Mobile.findById(req.body.mobileId);
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
		order_date: req.body.order_date,
		total_price: req.body.total_price
	});

	order = await order.save();
	res.send(order);
});

module.exports = router;
