const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
	res.render("index.ejs");
});

router.use("/users", require("./users.routes"));

module.exports = router;
