const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
	res.render("index.ejs");
});

router.use("/", require("./swagger.routes"));
router.use("/users", require("./users.routes"));
router.use("/products", require("./product.routes"));

module.exports = router;
