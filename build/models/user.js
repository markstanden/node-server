"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModelClass = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var Schema = mongoose_1.default.Schema;
// Define our model
var userSchema = new Schema({
    email: { type: String, unique: true, lowercase: true },
    password: String
});
// Create the model class
exports.ModelClass = mongoose_1.default.model('user', userSchema);
