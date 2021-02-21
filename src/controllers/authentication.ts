import express from "express"

export function signup (req: express.Request, res: express.Response, next: express.NextFunction) {
  console.log (req.body)
  // See if a user with the given email address exists
  
  // If a user with email address does exist, return an error

  // If a user with email doesn't exist, create and save user record

  // Respond to request indicating the user was created

}

