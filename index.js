const winston = require("winston");
const express = require("express");
var app = express();

require("./startup/logging")();
require("./startup/routes")(app);
require("./startup/db")();
require("./startup/config");
require("./startup/validation")();
// mongoose.Promise = global.Promise;

//port on that it will listen
var port = process.env.PORT || 3000;
app.listen(port, () => winston.info(`Server Listen On PORT: ${port}...`));
