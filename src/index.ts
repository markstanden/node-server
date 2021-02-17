/*****************
 * 	Imports
 *****************/

const express = require('express')
const http = require('http')
const bodyParser = require("body-parser")
const morgan = require('morgan')
const router = require("./router")
const mongoose = require("mongoose")

// DB Setup
mongoose.connect("mongodb://localhost:auth/auth")

// Create an instance of express
const app = express()


/******************
 * 	App Setupp
 ******************/
// Middlewares - All incoming requests to express
// also pass through these.
// Morgan is a logger for enhanced logging
app.use(morgan("combined"))
//bodyParser parses json
app.use(bodyParser.json({ type: "*/*" }))
// Call our router function, pass the express instance as an argument
router(app)


/**********************
 * 	Server Setup
 **********************/

// check environment variables for a port
// if not present default to 8080
const port = process.env.PORT || 8080

// Create an http server,
// forward requests to our instance of express
const server = http.createServer(app)

// Tell the server to listen to requests on
// our chosen port.
server.listen(port)
// Log port to console
console.log("Server listening on port: ", port)

