import express from "express"
import { User } from "../models/user"
import jwt from "jwt-simple"
import { config } from "../config"

function tokenForUser(user) {
  const timestamp = new Date().getTime()
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret)
}

export function signin(req, res, next) {
  // User has already been authenticated.
  // We just need to issue a token
  res.send({ token: tokenForUser(req.user) })
}

export function signup(req: express.Request, res: express.Response, next: express.NextFunction) {
  const email = req.body.email;
  const password = req.body.password;
  
  if (!email || !password) {
    return res.status(422).send({ error: "You must provide email and password"})
  }

  // See if a user with the given email address exists
  User.findOne({ email: email }, function(err, existingUser) {
    if (err) { return next(err) }

    // If a user with email address does exist, return an error
    if (existingUser) {
      return res.status(422).send({ error: "email is in use" })
    }

      // If a user with email doesn't exist, create and save user record
    const user = new User({
      email: email,
      password: password
    })
    
    user.save(function (err) {
      if (err) { return next(err) }
    
      // Respond to request indicating the user was created
      res.json({ token: tokenForUser(user) })
  })
    })
  

  

  

}

