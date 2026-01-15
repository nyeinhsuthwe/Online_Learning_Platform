const Review = require('../models/Review')

const ReviewController = {
    createReview: async (req, res) => {
        try {
            const { comment } = req.body
            const { courseId } = req.params
            const userId = req.user?.id

            if (!comment) {
                return res.status(400).json({ message: "Comment is required" })
            }

            const review = await Review.create({
                course: courseId,
                user: userId,
                comment,
            })

            return res.status(201).json({
                message: "Review created successfully",
                data: review,
            })
        } catch (error) {
            console.error("Create review error:", error)
            return res.status(500).json({
                message: "Internal server error",
            })
        }
    },

    getReviewList: async (req, res) => {
        try {
            const { courseId } = req.params
            const page = parseInt(req.query.page) || 1
            const limit = parseInt(req.query.limit) || 5

            if (!courseId) {
                return res.status(400).json({ message: "Course ID is required" })
            }

            const totalReviews = await Review.countDocuments({ course: courseId })

            const reviews = await Review.find({ course: courseId })
                .populate("user", "name avatar")
                .sort({ createdAt: -1 })
                .skip((page - 1) * limit)
                .limit(limit)

            return res.status(200).json({
                totalReviews,
                currentPage: page,
                totalPages: Math.ceil(totalReviews / limit),
                data: reviews,
            })
        } catch (error) {
            console.error("Get review list error:", error)
            return res.status(500).json({ message: "Internal server error" })
        }
    },
}

module.exports = ReviewController
