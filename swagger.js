const swaggerAutogen = require("swagger-autogen")();

const doc = {
	info: {
		title: "Users API",
		description: "Description",
	},
	host: "localhost:5500",
	schemes: ["http", "https"],
};

const outputFile = "./swagger.json";
const routes = ["./routes/index.routes.js"];

swaggerAutogen(outputFile, routes, doc);
