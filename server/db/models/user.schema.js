const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
  },

  password: {
      type: String,
      default:""
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