import mongoose from 'mongoose'
import bcrypt from "bcrypt-nodejs"
const Schema = mongoose.Schema

// Define our model
const userSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: String
})

// On Save Hook, encrypt password
// Bafore saving a model, run this function
userSchema.pre('save', function (next) {
  // get access to the user model
  const user = this
  
  //generate a salt - This may take some time, when complete run callback
  bcrypt.genSalt(10, function (err, salt) {
    if (err) { return next(err); }

    //hash our password using the created salt, this will also take some time.  When complete, run callback.
    bcrypt.hash(user.password, salt, null, function (err, hash) {
      if (err) { return next(err) }
      
      // overwrite plain text password with encrypted password.
      user.password = hash
      next()
    
    })

  })
})


// Create the model class
const ModelClass = mongoose.model('user', userSchema)
module.exports = ModelClass