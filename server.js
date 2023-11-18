const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const mongodb = require("./db/connection");
const bodyParser = require("body-parser");
require("dotenv").config();

// PORT
const PORT = process.env.PORT ?? 3300;

// app.set("views", path.join(__dirname, "views"));

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(cors());
app.use(bodyParser.json());

// Headers configuration
app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Z-Key");
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
	next();
});

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
