import passport from "passport"
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt"
import * as LocalStrategy from "passport-local"
import { User } from "../models/user"
import { config } from "../config"

// Create local strategy
const localOptions = {
  usernameField: "email",
}
const localLogin = new LocalStrategy(localOptions, function (email, password, done) {
  
})

// setup options for jwt strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret
}

// create JWT strategy
export const jwtLogin = new JwtStrategy(jwtOptions, function (payload, done) {
  // See if the user ID in the payload exists in our database
  User.findById(payload.sub, function (err, user) {
    if (err) {return done(err, false) }
  
    if (user) {
      done(null, user)
    } else {
      done(null, false)
    }

  
  })


  // If it does, call "done" with that user
  // otherwise, call done without a user object

})

// Tell passprt to user this strategy
passport.use(jwtLogin)