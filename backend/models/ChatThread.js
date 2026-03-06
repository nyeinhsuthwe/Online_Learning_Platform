const mongoose = require("mongoose");

const ChatThreadSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["support"],
      default: "support",
    },
    student_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    admin_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    course_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      default: null,
    },
    episode_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Episode",
      default: null,
    },
    last_message: {
      type: String,
      default: "",
      trim: true,
    },
    last_message_at: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

ChatThreadSchema.index({ student_id: 1, admin_id: 1, type: 1 }, { unique: true });

module.exports = mongoose.model("ChatThread", ChatThreadSchema);
