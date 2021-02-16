"use strict";
/*****************
 * 	Imports
 *****************/
var express = require('express');
var http = require('http');
var bodyParser = require("body-parser");
var morgan = require('morgan');
var router = require("./router");
// Create an instance of express
var app = express();
/******************
 * 	App Setup
 ******************/
// Middlewares - All incoming requests to express
// also pass through these.
// Morgan is a logger for enhanced logging
app.use(morgan("combined"));
//bodyParser parses json
app.use(bodyParser.json({ type: "*/*" }));
// Call our router function, pass the express instance as an argument
router(app);
/**********************
 * 	Server Setup
 **********************/
// check environment variables for a port
// if not present default to 8080
var port = process.env.PORT || 8080;
// Create an http server,
// forward requests to our instance of express
var server = http.createServer(app);
// Tell the server to listen to requests on
// our chosen port.
server.listen(port);
// Log port to console
console.log("Server listening on port: ", port);
