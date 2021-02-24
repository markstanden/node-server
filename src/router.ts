import express from "express"
import * as authentication from "./controllers/authentication"
import passport from "passport"
const myPassportService = require('./services/passport');


const requireAuth = passport.authenticate('jwt', {session: false})
const requireSignin = passport.authenticate("local", {session: false})

export function router (app: express.Express) {
  app.get("/", requireAuth, function (req, res) {
    res.send({hi: "there"})
  })
  app.post("/signin", requireSignin, authentication.signin)
  app.post("/signup", authentication.signup)
  
}