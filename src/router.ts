import express from "express"
import { signup } from "./controllers/authentication"
import passport from "passport"
const  myPassportService = require('./services/passport');
const requireAuth = passport.authenticate('jwt', {session: false})


export function router (app: express.Express) {
  app.get("/", requireAuth, function (req, res) {
    res.send({hi: "there"})
  })
  app.post("/signup", signup)
  
}