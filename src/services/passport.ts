import passport from "passport"
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt"
import { User } from "../models/user"
import { config } from "../config"

// setup options for jwt strategy
const wtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret
}

// create JWT strategy
const jwtLogin = new JwtStrategy(jwtOptions, function (payload, done) {
  // See if the user ID in the payload exists in our database
  User.findById(payload.sub, function (err, user) {
    if (err) {return done(err, false) }
  
    if (user) {
      done(null, user)
    } else {
      done(null, false)
    }

  
  })


  // If it dows, call "done" with that user
  // otherwise, call done without a user object

})

// Tell passprt to user this strategy
passport.use(jwtLogin)