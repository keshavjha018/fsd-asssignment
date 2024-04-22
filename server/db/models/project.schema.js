const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true
  },

},
  { timestamps: true }
);


module.exports = mongoose.model("Projects", projectSchema);