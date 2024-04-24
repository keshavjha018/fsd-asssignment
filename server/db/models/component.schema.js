const mongoose = require("mongoose");

const componentSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  
  name: {
    type: String,
    required: true,
    trim: true,
  },

  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Projects',
    required: true
  },

  type: { 
    type: String, 
    enum: ['BUTTON', 'INPUT', 'SELECT'], 
    required: true 
  },

  styles: {
    height: {type: Number, default: 55},
    width: {type: Number, default: 100},
    backgroundColor: {type: String, default: "white"},
    textColor: {type: String, default: "black"},
    borderColor: {type: String, default: "white"},
    borderRadius: { type: Number, default: 1 },
    margin: {type: Number, default: 0},
    paddingX: { type: Number, default: 0 },
    paddingY: { type: Number, default: 0 },
  },

  options: [String],

  // Bonus: Variants
  variants: [{
    name: String,
    // variant-specific styles
    styles: {
      backgroundColor: String,
      // more styles for this variant
    },
  }],
},

  { timestamps: true }
);


module.exports = mongoose.model("Components", componentSchema);