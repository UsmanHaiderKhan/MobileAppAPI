function error(err, res, req, next) {
	res.status(500).send("SomeThing Failed.");
}

module.exports.error = error;
