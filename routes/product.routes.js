const express = require("express");
const router = express.Router();
const productController = require("../controllers/products.controller");
const { validationResult } = require("express-validator");
const { createProdVal, updateProdVal } = require("../validator");

const { isAuthenticated } = require("../middleware/authenticate");

router.get("/", productController.getAllProducts);
router.get("/:id", productController.getSingleProduct);

router.post("/", isAuthenticated, createProdVal, async (req, res) => {
	const result = validationResult(req);
	if (result.isEmpty()) {
		await productController.createProduct(req, res);
	} else {
		res.send({ errors: result.array() });
	}
});

router.put("/:id", isAuthenticated, updateProdVal, async (req, res) => {
	const result = validationResult(req);
	if (result.isEmpty()) {
		await productController.updateProduct(req, res);
	} else {
		res.send({ errors: result.array() });
	}
});

router.delete("/:id", isAuthenticated, productController.deleteProduct);

module.exports = router;
