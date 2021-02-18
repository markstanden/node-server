"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var authentication_1 = require("./controllers/authentication");
function router(app) {
    app.post("/signup", authentication_1.signup);
}
exports.router = router;
