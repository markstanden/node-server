"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var passport_jwt_1 = require("passport-jwt");
var user_1 = require("../models/user");
// setup options for jwt strategy
var wtOptions = {};
// create JWT strategy
var jwtLogin = new passport_jwt_1.Strategy(jwtOptions, function (payload, done) {
    // See if the user ID in the payload exists in our database
    user_1.User.findById(payload.sub, function (err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            done(null, user);
        }
        else {
            done(null, false);
        }
    });
    // If it dows, call "done" with that user
    // otherwise, call done without a user object
});
// Tell passprt to user this strategy
