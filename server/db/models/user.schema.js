const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: "Default Name"
  },
  
  email: {
    type: String,
    required: true,
    trim: true,
  },

  password: {
    type: String
  },

  photoURL: {
    type: String
  },

  OAuth: {
    type: Boolean,
    default: false
  },

  isVerified: {
    type: Boolean,
    default: false,
  },

  verificationToken: {
    type: String,
  },

},
  { timestamps: true }
);


module.exports = mongoose.model("Users", userSchema);