// Server.js
const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
const mysql = require("mysql");

const morgan = require("morgan");
const bodyParser = require("body-parser");

const path = require("path");

// MySQL db config
const conn = mysql.createConnection({
	host: "icopoghru9oezxh8.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
	port: "3306",
	user: "rar6ja2qszl9a1vd",
	password: "gjk40u3ns83k5aqz",
	database: "viok5nbocwhl73hs"
});

// Connect to MySQL database
conn.connect(function(err) {
	if (err) throw err;
	console.log("Connected to MySQL database.");
});

// SETUP EXPRESS application
app.use(morgan("dev")); // log every request to the console
app.use(bodyParser.urlencoded({ extended: true })); // get info from HTML forms
app.use(bodyParser.json());

// sets up ejs as view engine
app.set("view engine", "ejs");

// path to all public files (CSS, JS, etc.)
app.use(express.static(__dirname + "/public"));

// APP ROUTES
const routes = require("./app/routes/routes")(app, express, conn);

// CONNECT
app.listen(port);
console.log("The magic happens on port" + port);