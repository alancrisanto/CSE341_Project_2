const mongodb = require("../db/connection");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
	// #swagger.tags=['Users']
	try {
		const result = await mongodb.getDatabase().db().collection("users").find();
		result.toArray().then((users) => {
			res.setHeader("Content-Type", "application/json");
			res.status(200).json(users);
		});
	} catch (error) {
		console.log(error);
	}
};

const getSingle = async (req, res) => {
	// #swagger.tags=['Users']
	try {
		const userId = new ObjectId(req.params.id);
		const result = await mongodb.getDatabase().db().collection("users").find({ _id: userId });
		result.toArray().then((users) => {
			res.setHeader("content-type", "application/json");
			res.status(200).json(users[0]);
		});
	} catch (error) {
		console.log(error);
	}
};

const createUser = async (req, res) => {
	// #swagger.tags=['Users']
	const user = {
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		email: req.body.email,
		birthday: req.body.birthday,
		password: req.body.password,
	};

	try {
		const response = await mongodb.getDatabase().db().collection("users").insertOne(user);

		if (response.acknowledged > 0) {
			res.status(204).send();
		} else {
			res.status(500).json({ message: "Error creating user" });
		}
	} catch (error) {
		console.error("Error inserting user:", error);
		res.status(500).json({ message: "Internal server error" });
	}
};

const updateUser = async (req, res) => {
	// #swagger.tags=['Users']
	const userId = new ObjectId(req.params.id);
	const user = {
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		email: req.body.email,
		birthday: req.body.birthday,
		password: req.body.password,
	};

	try {
		const response = await mongodb.getDatabase().db().collection("users").replaceOne({ _id: userId }, user);

		if (response.modifiedCount > 0) {
			res.status(204).send();
		} else {
			res.status(500).json(response.error || "some error ocurred while updating the user");
		}
	} catch (error) {
		console.error("Error inserting user:", error);
		res.status(500).json({ message: "Internal server error" });
	}
};

const deleteUser = async (req, res) => {
	// #swagger.tags=['Users']
	try {
		const userId = new ObjectId(req.params.id);
		const response = await mongodb.getDatabase().db().collection("users").deleteOne({ _id: userId });

		if (response.deletedCount > 0) {
			res.status(204).send();
		} else {
			res.status(500).json(response.error || "Some error occurred while deleting user");
		}
	} catch (error) {
		console.error("Error deleting user:", error);
		res.status(500).json({ message: "Internal server error" });
	}
};

module.exports = {
	getAll,
	getSingle,
	createUser,
	updateUser,
	deleteUser,
};
