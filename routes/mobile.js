const mongoose = require("mongoose");
const express = require("express");
const { Mobile, validate } = require("../models/mobile");
const { Category } = require("../models/category");
const router = express.Router();

//Get All Mobiles

router.get("/", async (req, res) => {
	const mobiles = await Mobile.find().sort("name");
	res.send(mobiles);
});

// Get Mobile by Id

router.get("/:id", async (req, res) => {
	const mobile = await Mobile.findById(req.params.id);

	if (!mobile) {
		res.status(400).send("No Mobile Found On That Id.");
	}
	res.send(mobile);
});

// Post Mobiles data

router.post("/", async (req, res) => {
	//TODO : Apply JOI validation
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const category = await Category.findById(req.body.categoryId);
	if (!category) {
		return res.status(400).send("Invalid Category...!");
	}

	//GET : // Get Data
	const mobile = new Mobile({
		name: req.body.name,
		price: req.body.price,
		color: req.body.color,
		category: {
			_id: category._id,
			name: category.name
		},
		description: req.body.description,
		isAvailable: req.body.isAvailable
	});
	// SAVE : Save into database
	await mobile.save();
	//SEND : Send Response to Client
	res.send(mobile);
});

//Update Mobile Data

router.put("/:id", async (req, res) => {
	//
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const category = await Category.findById(req.params.id);
	if (!category) {
		return res.status(400).send("Invalid category...!");
	}

	const mobile = await Mobile.findByIdAndUpdate(
		req.params.id,
		{
			name: req.body.name,
			price: req.body.price,
			color: req.body.color,
			category: {
				_id: category._id,
				name: category.name
			},
			description: req.body.description,
			isAvailable: req.body.isAvailable
		},
		{ new: true }
	);
	if (!mobile) {
		return res.status(400).send("No Mobile Phone data Available on That Id");
	}
	res.send(mobile);
});

//Delete Request

router.delete("/:id", async (req, res) => {
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const mobile = await Mobile.findByIdAndRemove(req.params.id);
	if (!mobile) {
		return res.status(400).send("No Available Id Across that Request.");
	}
	res.send(mobile);
});

module.exports = router;
