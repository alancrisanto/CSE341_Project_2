const express = require("express");
const passport = require("passport");
const router = express.Router();
const session = require("express-session");

router.get("/", (req, res) => {
	res.render("index.ejs", { user: req.session.user });
});

router.use("/", require("./swagger.routes"));
router.use("/users", require("./users.routes"));
router.use("/products", require("./product.routes"));

router.get(
	"/login",
	passport.authenticate("github", (req, res) => {}),
);

router.get("/logout", (req, res, next) => {
	req.logout((err) => {
		if (err) {
			return next(err);
		}
		res.redirect("/");
	});
});

module.exports = router;
