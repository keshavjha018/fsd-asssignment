const mongoose = require("mongoose");

const componentSchema = new mongoose.Schema({
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
    backgroundColor: {type: String},
    textColor: {type: String},
    borderColor: {type: String},
    borderRadius: { type: Number, default: 1 },
    paddingX: { type: Number, default: 0 },
    paddingY: { type: Number, default: 0 },
  },

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