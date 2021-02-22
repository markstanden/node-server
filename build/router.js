"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var authentication_1 = require("./controllers/authentication");
var passport_1 = __importDefault(require("passport"));
var myPassportService = require('./services/passport');
var requireAuth = passport_1.default.authenticate('jwt', { session: false });
function router(app) {
    app.get("/", requireAuth, function (req, res) {
        res.send({ hi: "there" });
    });
    app.post("/signup", authentication_1.signup);
}
exports.router = router;
