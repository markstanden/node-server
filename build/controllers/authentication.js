"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signup = void 0;
function signup(req, res, next) {
    console.log(req.body);
    // See if a user with the given email address exists
    // If a user with email address does exist, return an error
    // If a user with email doesn't exist, create and save user record
    // Respond to request indicating the user was created
}
exports.signup = signup;
