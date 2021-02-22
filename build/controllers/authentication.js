"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signup = void 0;
var user_1 = require("../models/user");
var jwt_simple_1 = __importDefault(require("jwt-simple"));
var config_1 = require("../config");
function tokenForUser(user) {
    var timestamp = new Date().getTime();
    return jwt_simple_1.default.encode({ sub: user.id, iat: timestamp }, config_1.config.secret);
}
function signup(req, res, next) {
    var email = req.body.email;
    var password = req.body.password;
    if (!email || !password) {
        return res.status(422).send({ error: "You must provide email and password" });
    }
    // See if a user with the given email address exists
    user_1.User.findOne({ email: email }, function (err, existingUser) {
        if (err) {
            return next(err);
        }
        // If a user with email address does exist, return an error
        if (existingUser) {
            return res.status(422).send({ error: "email is in use" });
        }
        // If a user with email doesn't exist, create and save user record
        var user = new user_1.User({
            email: email,
            password: password
        });
        user.save(function (err) {
            if (err) {
                return next(err);
            }
            // Respond to request indicating the user was created
            res.json({ token: tokenForUser(user) });
        });
    });
}
exports.signup = signup;
