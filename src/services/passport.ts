import passport from "passport"
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt"
import { Strategy as LocalStrategy } from "passport-local"
import { User } from "../models/user"
import { config } from "../config"

// Create local strategy
const localOptions = {
  usernameField: "email",
}
const localLogin = new LocalStrategy(localOptions, function (email, password, done) {
  
  // verify this username and password, call done with the user
  // if it is correct username and password
  // otherwise call done with false
  User.findOne({ email: email }, function (err, user) {
    if (err) { return done(err) }
    if (!user) { return done(null, false) }

    // compare passwords
    // is "password" = user.password
    user.comparePassword(password, function (err, isMatch) {
      if (err) { return done(err) }
      if (!isMatch) { return done(null, false) }
      return done(null, user)
    })
  })
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
passport.use(localLogin)