const mongoose = require('mongoose');
const CommentSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    episode_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Episode",
        required: true
    },
    course_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true
    },
    content: {
        type: String,
        required: true,
        trim: true,
    },
    parent_comment_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
        default: null,
    },
},
    {
        timestamps: true

    })

module.exports = mongoose.model("Comment", CommentSchema)