"use strict";
/*****************
 * 	Imports
 *****************/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var http_1 = __importDefault(require("http"));
var body_parser_1 = __importDefault(require("body-parser"));
var morgan_1 = __importDefault(require("morgan"));
var router_1 = require("./router");
var mongoose_1 = __importDefault(require("mongoose"));
// DB Setup
// From https://mongoosejs.com/docs/deprecations.html
// ALSO NOTE:
//    Replace update() with updateOne(), updateMany(), or replaceOne()
//    Replace remove() with deleteOne() or deleteMany().
//    Replace count() with countDocuments(), unless you want to 
//    count how many documents are in the whole collection
//    (no /filter). In the latter case, use estimatedDocumentCount().
mongoose_1.default.connect('mongodb://localhost:27017/auth', { useNewUrlParser: true, useUnifiedTopology: true });
// Create an instance of express
var app = express_1.default();
/******************
 * 	App Setup
 ******************/
// Middlewares - All incoming requests to express
// also pass through these.
// Morgan is a logger for enhanced logging
app.use(morgan_1.default("combined"));
//bodyParser parses json
app.use(body_parser_1.default.json({ type: "*/*" }));
// Call our router function, pass the express instance as an argument
router_1.router(app);
/**********************
 * 	Server Setup
 **********************/
// check environment variables for a port
// if not present default to 8080
var port = process.env.PORT || 8080;
// Create an http server,
// forward requests to our instance of express
var server = http_1.default.createServer(app);
// Tell the server to listen to requests on
// our chosen port.
server.listen(port);
// Log port to console
console.log("Server listening on port: ", port);
