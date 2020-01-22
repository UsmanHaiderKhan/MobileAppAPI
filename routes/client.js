const express = require("express");
const { Client, validate } = require("../models/client");
const app = express();

const router = express.Router();

//Get Request For Client

router.get("/", async (req, res) => {
	const client = await Client.find().sort("name");
	res.send(client);
});

//HTTP-GET Client by Id

router.get("/:id", async (req, res) => {
	const client = await Client.findById(req.params.id);
	res.send(client);
});

//HTTP-POST Request

router.post("/", async (req, res) => {
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
	const client = await Client.findById(req.params.id);
	if (!client) {
		return res.status(400).send("No Data on That Id...");
	}
	client = client.save();
	res.send(client);
});

// HTTP-DELETE Request
