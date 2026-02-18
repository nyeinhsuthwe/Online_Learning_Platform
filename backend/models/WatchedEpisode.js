const mongoose = require('mongoose');

const watchedEpisodeSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    course_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    episode_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Episode', required: true },
    watchedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('WatchedEpisode', watchedEpisodeSchema);
