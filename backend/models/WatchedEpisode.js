const mongoose = require("mongoose");

const watchedEpisodeSchema = new mongoose.Schema(
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
    episode_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Episode",
      required: true,
    },

    watchedSeconds: {
      type: Number,
      default: 0,
    },

    totalSeconds: {
      type: Number,
      required: true,
    },

    progress: {
      type: Number,
      default: 0, 
    },

    completed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

watchedEpisodeSchema.index(
  { user_id: 1, episode_id: 1 },
  { unique: true }
);

module.exports = mongoose.model("WatchedEpisode", watchedEpisodeSchema);
