"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signup = void 0;
var User = require('../models/user');
function signup(req, res, next) {
    var email = req.body.email;
    var password = req.body.password;
    if (!email || !password) {
        return res.status(422).send({ error: "You must provide email and password" });
    }
    // See if a user with the given email address exists
    User.findOne({ email: email }, function (err, existingUser) {
        if (err) {
            return next(err);
        }
        // If a user with email address does exist, return an error
        if (existingUser) {
            return res.status(422).send({ error: "email is in use" });
        }
        // If a user with email doesn't exist, create and save user record
        var user = new User({
            email: email,
            password: password
        });
        user.save(function (err) {
            if (err) {
                return next(err);
            }
            // Respond to request indicating the user was created
            res.json({ "success": true });
        });
    });
}
exports.signup = signup;
