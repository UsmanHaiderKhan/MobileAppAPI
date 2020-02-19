// const validObjectId = require("../middleware/validObjectId");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const express = require("express");
const mongoose = require("mongoose");
const { Category, validate } = require("../models/category");
var router = express.Router();

//HTTP_GET Request
router.get("/", async (req, res) => {
	const categories = await Category.find().sort("name");
	res.send(categories);
});

// Get Data by Id
router.get("/:id", async (req, res) => {
	if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
		return res.status(404).send("Invalid ID.");
	}
	const category = await Category.findById(req.params.id);
	// const category = categories.find(c => c.id === parseInt(req.params.id));
	if (!category) {
		return res.status(404).send("Here is no Category Across that Id...");
	}
	res.send(category);
});

//HTTP_POST Request
router.post("/", auth, async (req, res) => {
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	let category = new Category({
		name: req.body.name
	});

	category = await category.save();
	res.send(category);
});

// Http Put Request
router.put("/:id", auth, async (req, res) => {
	// Validate the Incoming data
	const { error } = validate(req.body);
	if (error) {
		return res.status(400).send(error.details[0].message);
	}
	//
	const category = await Category.findByIdAndUpdate(
		req.params.id,
		{ name: req.body.name },
		{ new: true }
	);

	// // Getting Id From Array Of Mobile Categories
	// const category = Category.find(
	// 	req.params.id,
	// 	{
	// 		name: req.body.name
	// 	},
	// 	{ new: true }
	// );
	// If no category Available then:
	if (!category) {
		return res.status(404).send("Here No Category Across that Id...");
	}

	// Now update the data
	// category.name = req.body.name;
	// category.save();
	res.send(category);
});

//HTTp Delete Request
router.delete("/:id", [auth, admin], async (req, res) => {
	//This code Working with Array
	// var category = Category.find(c => c.id === parseInt(req.params.id));
	// const index = categories.indexOf(category);
	// categories.splice(index, 1);

	//This Code Work with database
	const category = await Category.findByIdAndRemove(req.params.id);
	if (!category) {
		res.status(404).send("We Did Find ANy Thing Across That Id....");
	}

	res.send(category);
});

module.exports = router;
