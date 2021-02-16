/*****************
 * 	Imports
 *****************/

import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import http from "http"
import morgan from "morgan"


// Create an instance of express
const app = express()


/******************
 * 	App Setup
 ******************/
// Middlewares - All incoming requests to express
// also pass through these.
// Morgan is a logger for enhanced logging
app.use(morgan("combined"))
//bodyParser parses json
app.use(bodyParser.json({ type: "*/*" }))



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

