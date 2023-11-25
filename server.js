const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const mongodb = require("./db/connection");
const bodyParser = require("body-parser");
const passport = require("passport");
const session = require("express-session");
const gitHubEstrategy = require("passport-github2").Strategy;
require("dotenv").config();

// PORT
const PORT = process.env.PORT ?? 3300;

// app.set("views", path.join(__dirname, "views"));

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(cors());
app.use(bodyParser.json());
// this is the basic express session({...}) initialization
app.use(
	session({
		secret: "secret",
		resave: false,
		saveUninitialized: true,
	}),
);
// init passport on every route call
app.use(passport.initialize());
// allow passport to use "express-session"
app.use(passport.session());

// Headers configuration
app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Z-Key");
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
	next();
});

// call routes
app.use("/", require("./routes/index.routes"));

//
passport.use(
	new gitHubEstrategy(
		{
			clientID: process.env.GITHUB_CLIENT_ID,
			clientSecret: process.env.GITHUB_CLIENT_SECRET,
			callbackURL: process.env.CALLBACK_URL,
		},
		function (accesToken, refreshToken, profile, done) {
			// user.findOrCreate({githubId: profile.id}, function(err, user){
			return done(null, profile);
			// })
		},
	),
);

passport.serializeUser((user, done) => {
	done(null, user);
});

passport.deserializeUser((user, done) => {
	done(null, user);
});

// app.get("/", (req, res) => {
// 	res.render("index.ejs");
// 	// res.send(req.session.user !== undefined ? `Logged in as ${req.session.user.displayName}` : "Logged out");
// });

app.get(
	"/github/callback",
	passport.authenticate("github", {
		failureRedirect: "/api-docs",
		session: false,
	}),
	(req, res) => {
		req.session.user = req.user;
		res.redirect("/");
	},
);

// Connection to dabatabase and start server
mongodb.initDb((err) => {
	if (err) {
		console.error(err);
	} else {
		app.listen(PORT, () => {
			console.log("Database connected and server running on port " + PORT);
		});
	}
});
