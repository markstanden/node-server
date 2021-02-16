"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = function (app) {
    app.get('/', function (req, res, next) {
        res.send(["1", "2", "3"]);
    });
};
