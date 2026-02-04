const Comment = require("../models/Comment")
const buildCommentTree = require("../helper/comment")
const CommentController = {
    createComment: async (req, res) => {
        const { episode_id, course_id } = req.params
        const user_id = req.user.id
        const { content, parent_comment_id } = req.body

        const data = await Comment.create({
            episode_id,
            course_id,
            user_id,
            content,
            parent_comment_id: parent_comment_id || null,
        })
        return res.status(200).json({
            message: "Comment Successed!",
            data: data
        })
    },

    getComment: async (req, res) => {
        try {
            const { episode_id, course_id } = req.params;

            if (!episode_id || !course_id) {
                return res.status(400).json({ message: "episodeId and courseId are required" });
            }

            const comments = await Comment.find({ episode_id, course_id })
                .populate("user_id", "name avatar")
                .sort({ createdAt: 1 });
            
             const nestedComments = buildCommentTree(comments);

            res.status(200).json(nestedComments);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    deleteComment: async (req, res) => {
        const { id } = req.params;
        const deleteComment = await Comment.findByIdAndDelete(id)
        return res.status(200).json({
            message : "Comment deleted successfully!"
        })
    }

}

module.exports = CommentController