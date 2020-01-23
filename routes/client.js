const express = require("express");
const { Client, validate } = require("../models/client");

const router = express.Router();

//Get Request For Client

router.get("/", async (req, res) => {
	const client = await Client.find().sort("name");
	res.send(client);
});

//HTTP-GET Client by Id

router.get("/:id", async (req, res) => {
	const client = await Client.findById(req.params.id);
	if (!client) {
		return res.status(404).send("No Client At this Id");
	}
	res.send(client);
});

//HTTP-POST Request

router.post("/", async (req, res) => {
	const { error } = validate(req.body);
	if (error) {
		res.status(400).send(error.details[0].message);
	}

	let client = new Client({
		name: req.body.name,
		email: req.body.email,
		phone: req.body.phone,
		address: req.body.address
	});
	client = await client.save();
	res.send(client);
});

//HTTP_PUT Request

router.put("/:id", async (req, res) => {
	const { error } = validate(req.body);
	if (error) {
		res.status(400).send(error.details[0].message);
	}

	const client = await Client.findByIdAndUpdate(
		req.params.id,
		{
			name: req.body.name,
			email: req.body.email,
			phone: req.body.phone,
			address: req.body.address
		},
		{ new: true }
	);
	if (!client) {
		return res.status(404).send("No Data on That Id...");
	}
	res.send(client);
});

// HTTP-DELETE Request

router.delete("/:id", async (req, res) => {
	const client = await Client.findByIdAndRemove(req.params.id);
	if (!client) {
		return res.status(404).send("No Client Data Across that Id...!");
	}
	client.save();
});

module.exports = router;
