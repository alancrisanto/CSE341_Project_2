const mongodb = require("../db/connection");
const ObjectId = require("mongodb").ObjectId;

const getAllProducts = async (req, res) => {
	// #swagger.tags=['Products']
	try {
		const result = await mongodb.getDatabase().db().collection("products").find();
		result.toArray().then((prod) => {
			res.setHeader("Content-Type", "application/json");
			res.status(200).json(prod);
		});
	} catch (error) {
		console.log(error);
	}
};

const getSingleProduct = async (req, res) => {
	// #swagger.tags=['Products']
	try {
		const userId = new ObjectId(req.params.id);
		const result = await mongodb.getDatabase().db().collection("products").find({ _id: userId });
		result.toArray().then((prod) => {
			res.setHeader("content-type", "application/json");
			res.status(200).json(prod[0]);
		});
	} catch (error) {
		console.log(error);
	}
};

const createProduct = async (req, res) => {
	// #swagger.tags=['Products']
	const user = {
		prodName: req.body.prodName,
		description: req.body.description,
		price: req.body.price,
		image: req.body.image,
		category: req.body.category,
	};

	try {
		const response = await mongodb.getDatabase().db().collection("products").insertOne(user);

		if (response.acknowledged > 0) {
			res.status(204).send();
		} else {
			res.status(500).json({ message: "Error creating product" });
		}
	} catch (error) {
		console.error("Error inserting user:", error);
		res.status(500).json({ message: "Internal server error" });
	}
};

const updateProduct = async (req, res) => {
	// #swagger.tags=['Products']
	const userId = new ObjectId(req.params.id);
	const user = {
		prodName: req.body.prodName,
		description: req.body.description,
		price: req.body.price,
		image: req.body.image,
		category: req.body.category,
	};

	try {
		const response = await mongodb.getDatabase().db().collection("products").replaceOne({ _id: userId }, user);

		if (response.modifiedCount > 0) {
			res.status(204).send();
		} else {
			res.status(500).json(response.error || "some error ocurred while updating the product");
		}
	} catch (error) {
		console.error("Error inserting user:", error);
		res.status(500).json({ message: "Internal server error" });
	}
};

const deleteProduct = async (req, res) => {
	// #swagger.tags=['Products']
	try {
		const userId = new ObjectId(req.params.id);
		const response = await mongodb.getDatabase().db().collection("products").deleteOne({ _id: userId });

		if (response.deletedCount > 0) {
			res.status(204).send();
		} else {
			res.status(500).json(response.error || "Some error occurred while deleting product");
		}
	} catch (error) {
		console.error("Error deleting user:", error);
		res.status(500).json({ message: "Internal server error" });
	}
};

module.exports = {
	getAllProducts,
	getSingleProduct,
	createProduct,
	updateProduct,
	deleteProduct,
};
