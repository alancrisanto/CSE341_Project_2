const express = require("express");
const router = express.Router();
const productController = require("../controllers/products.controller");
const { validationResult } = require("express-validator");
const { createProdVal, updateProdVal } = require("../validator");

router.get("/", productController.getAllProducts);
router.get("/:id", productController.getSingleProduct);

router.post("/", createProdVal, async (req, res) => {
	const result = validationResult(req);
	if (result.isEmpty()) {
		await productController.createProduct(req, res);
	} else {
		res.send({ errors: result.array() });
	}
});

router.put("/:id", updateProdVal, async (req, res) => {
	const result = validationResult(req);
	if (result.isEmpty()) {
		await productController.updateProduct(req, res);
	} else {
		res.send({ errors: result.array() });
	}
});

router.delete("/:id", productController.deleteProduct);

module.exports = router;
