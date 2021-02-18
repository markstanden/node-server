import express from "express"
import { signup } from "./controllers/authentication"

export function router (app: express.Express) {

  app.post("/signup", signup)
  

}