const mongoose = require("mongoose");

const ChatMessageSchema = new mongoose.Schema(
  {
    thread_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ChatThread",
      required: true,
      index: true,
    },
    sender_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
      maxlength: 2000,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("ChatMessage", ChatMessageSchema);
