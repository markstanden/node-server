import express from "express"

module.exports = function (app: express.Express) {
  app.get('/', function (req: express.Request, res: express.Response, next: express.NextFunction) {
    res.send(["1","2","3"])
  })
  

}