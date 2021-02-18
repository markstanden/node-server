import express from "express"

export function signup (req: express.Request, res: express.Response, next: express.NextFunction) {
  res.send({ success: 'true' })
}