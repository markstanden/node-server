"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var bcrypt_nodejs_1 = __importDefault(require("bcrypt-nodejs"));
var Schema = mongoose_1.default.Schema;
// Define our model
var userSchema = new Schema({
    email: { type: String, unique: true, lowercase: true },
    password: String
});
// On Save Hook, encrypt password
// Bafore saving a model, run this function
userSchema.pre('save', function (next) {
    // get access to the user model
    var user = this;
    //generate a salt - This may take some time, when complete run callback
    bcrypt_nodejs_1.default.genSalt(10, function (err, salt) {
        if (err) {
            return next(err);
        }
        //hash our password using the created salt, this will also take some time.  When complete, run callback.
        bcrypt_nodejs_1.default.hash(user.password, salt, null, function (err, hash) {
            if (err) {
                return next(err);
            }
            // overwrite plain text password with encrypted password. 
            user.password = hash;
            next();
        });
    });
});
userSchema.methods.comparePassword = function (candidatePassword, callback) {
    bcrypt_nodejs_1.default.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) {
            return callback(err);
        }
        callback(null, isMatch);
    });
};
// Create the model class
var ModelClass = mongoose_1.default.model('user', userSchema);
exports.User = ModelClass;
