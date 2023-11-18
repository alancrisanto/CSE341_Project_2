const express = require("express");
const router = express.Router();
const userController = require("../controllers/users.controller");
const { validationResult } = require("express-validator");
const { createUserVal, updateUserVal } = require("../validator");

router.get("/", userController.getAll);
router.get("/:id", userController.getSingle);

router.post("/", createUserVal, async (req, res) => {
	const result = validationResult(req);
	if (result.isEmpty()) {
		await userController.createUser(req, res);
	} else {
		res.send({ errors: result.array() });
	}
});

router.put("/:id", updateUserVal, async (req, res) => {
	const result = validationResult(req);
	if (result.isEmpty()) {
		await userController.updateUser(req, res);
	} else {
		res.send({ errors: result.array() });
	}
});

router.delete("/:id", userController.deleteUser);

module.exports = router;
