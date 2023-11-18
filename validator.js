const { check } = require("express-validator");

exports.createUserVal = [
	check("firstName", "Please include a valid first name").not().isEmpty(),
	check("lastName", "Please include a valid last name").not().isEmpty(),
	check("email", "Please include a valid email").isEmail().normalizeEmail({ gmail_remove_dots: true }),
	check("birthday", "Please include a valid birthday").not().isEmpty(),
	check("password", "Please include a valid password").not().isEmpty(),
];

exports.updateUserVal = [
	check("firstName", "Please include a valid first name").not().isEmpty(),
	check("lastName", "Please include a valid last name").not().isEmpty(),
	check("email", "Please include a valid email").isEmail().normalizeEmail({ gmail_remove_dots: true }),
	check("birthday", "Please include a valid birthday").not().isEmpty(),
	check("password", "Please include a valid password").not().isEmpty(),
];

exports.createProdVal = [
	check("prodName", "Please include a valid product name").not().isEmpty(),
	check("description", "Please include a valid product description").not().isEmpty(),
	check("price", "Please include a valid price").notEmpty().isNumeric(),
	check("image", "Please include a valid url image").not().isEmpty(),
	check("category", "Please include a valid category").not().isEmpty(),
];

exports.updateProdVal = [
	check("prodName", "Please include a valid product name").not().isEmpty(),
	check("description", "Please include a valid product description").not().isEmpty(),
	check("price", "Please include a valid price").notEmpty().isNumeric(),
	check("image", "Please include a valid url image").not().isEmpty(),
	check("category", "Please include a valid category").not().isEmpty(),
];
