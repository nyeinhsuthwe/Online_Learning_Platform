const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
  category_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  topics: {
    type: [String],
    default: []
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    default: ""
  },
  thumbnailUrl: {
    type: String,
    default: ""
  },
  timePeriod: {
    type: String
  },
  courseDuration: {
    type: String
  }

}, { timestamps: true });

module.exports = mongoose.model("Course", CourseSchema);
