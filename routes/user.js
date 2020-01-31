const express = require("express");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const { User, validate } = require("../models/user");

const router = express.Router();

//Get Request For user

router.get("/", async (req, res) => {
	const user = await User.find().sort("name");
	res.send(user);
});

//HTTP-GET user by Id

router.get("/:id", async (req, res) => {
	const user = await User.findById(req.params.id);
	if (!user) {
		return res.status(404).send("No user At this Id");
	}
	res.send(user);
});

//HTTP-POST Request

router.post("/", async (req, res) => {
	const { error } = validate(req.body);
	if (error) {
		res.status(400).send(error.details[0].message);
	}

	let user = await User.findOne({ email: req.body.email });
	if (user) return res.status(400).send("User Already Registered...!");

	user = new User(_.pick(req.body, ["name", "email", "password", "phone", "address"]));

	const salt = await bcrypt.genSalt(10);
	user.password = await bcrypt.hash(user.password, salt);

	user = await user.save();

	const token = user.generateAuthToken();
	res
		.header("x-auth-token", token)
		.send(_.pick(user, ["_id", "name", "email", "phone", "address"]));
});

//HTTP_PUT Request

router.put("/:id", async (req, res) => {
	const { error } = validate(req.body);
	if (error) {
		res.status(400).send(error.details[0].message);
	}

	const user = await User.findByIdAndUpdate(
		req.params.id,
		{
			name: req.body.name,
			email: req.body.email,
			password: req.body.password,
			phone: req.body.phone,
			address: req.body.address
		},
		{ new: true }
	);
	if (!user) {
		return res.status(404).send("No Data on That Id...");
	}
	res.send(user);
});

// HTTP-DELETE Request

router.delete("/:id", async (req, res) => {
	const user = await User.findByIdAndRemove(req.params.id);
	if (!user) {
		return res.status(404).send("No user Data Across that Id...!");
	}
	user.save();
});

module.exports = router;
