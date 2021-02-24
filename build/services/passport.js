"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtLogin = void 0;
var passport_1 = __importDefault(require("passport"));
var passport_jwt_1 = require("passport-jwt");
var passport_local_1 = require("passport-local");
var user_1 = require("../models/user");
var config_1 = require("../config");
// Create local strategy
var localOptions = {
    usernameField: "email",
};
var localLogin = new passport_local_1.Strategy(localOptions, function (email, password, done) {
    // verify this username and password, call done with the user
    // if it is correct username and password
    // otherwise call done with false
    user_1.User.findOne({ email: email }, function (err, user) {
        if (err) {
            return done(err);
        }
        if (!user) {
            return done(null, false);
        }
        // compare passwords
        // is "password" = user.password
        user.comparePassword(password, function (err, isMatch) {
            if (err) {
                return done(err);
            }
            if (!isMatch) {
                return done(null, false);
            }
            return done(null, user);
        });
    });
});
// setup options for jwt strategy
var jwtOptions = {
    jwtFromRequest: passport_jwt_1.ExtractJwt.fromHeader('authorization'),
    secretOrKey: config_1.config.secret
};
// create JWT strategy
exports.jwtLogin = new passport_jwt_1.Strategy(jwtOptions, function (payload, done) {
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
    // If it does, call "done" with that user
    // otherwise, call done without a user object
});
// Tell passprt to user this strategy
passport_1.default.use(exports.jwtLogin);
passport_1.default.use(localLogin);
