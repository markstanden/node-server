/*****************
 * 	Imports
 *****************/

import express from "express"
import http from "http"
import bodyParser from "body-parser"
import morgan from "morgan"
import { router } from "./router"
import mongoose from "mongoose"

// DB Setup
// From https://mongoosejs.com/docs/deprecations.html
// ALSO NOTE:
//    Replace update() with updateOne(), updateMany(), or replaceOne()
//    Replace remove() with deleteOne() or deleteMany().
//    Replace count() with countDocuments(), unless you want to 
//    count how many documents are in the whole collection
//    (no /filter). In the latter case, use estimatedDocumentCount().
mongoose.connect('mongodb://localhost:27017/auth', {useNewUrlParser: true, useUnifiedTopology: true});
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

