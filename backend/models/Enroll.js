const mongoose = require("mongoose");

const EnrollSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    course_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: ["kbz", "wave", "aya", "cb"],
      default: "kbz",
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Enroll", EnrollSchema);
