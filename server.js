const express = require("express");
const cors = require("cors");
const path = require("path");
const mongodb = require("./db/connection");
const bodyParser = require("body-parser");
require("dotenv").config();

const PORT = process.env.PORT ?? 3300;

const app = express();

// app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(cors());
app.use(bodyParser.json());

// call routes
app.use("/", require("./routes/index.routes"));

// Connection to dabatabase and start server
mongodb.initDb((err) => {
	if (err) {
		console.error(err);
	} else {
		app.listen(PORT, () => {
			console.log("Database connected and server running on port " + PORT);
		});
	}
});
