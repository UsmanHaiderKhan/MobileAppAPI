const express = require("express");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const { User } = require("../models/user");

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
	if (!user) return res.status(400).send("Invalid Email or Password.");

	let checkPassword = await bcrypt.compare(req.body.password, user.password);
	if (!checkPassword) res.status(400).send("Invalid Email or Password.");

	const token = user.generateAuthToken();
	res.send(token);
});

function validate(req) {
	var Schema = {
		email: Joi.string()
			.trim()
			.email()
			.max(255)
			.required(),
		password: Joi.string()
			.min(5)
			.max(255)
			.required()
	};
	return Joi.validate(req, Schema);
}

module.exports = router;
