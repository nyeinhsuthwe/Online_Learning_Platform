const Course = require('../models/Course')

const CourseController = {
    createCourse: async (req, res) => {
        const { category_id, title, price, description, topics, timePeriod, courseDuration } = req.body
        const thumbnailUrl = req.file
            ? `/uploads/image/${req.file.filename}`
            : "";

        const courseData = await Course.create({
            category_id,
            title,
            price,
            description,
            topics: typeof topics === "string" ? JSON.parse(topics) : topics,
            thumbnailUrl,
            timePeriod,
            courseDuration
        })

        return res.json({
            message: "Course created successfully",
            data: courseData
        })
    },

    getCourse: async (req, res) => {
        try {
            const data = await Course.find()
            return res.status(200).json({
                data
            })
        } catch (error) {
            return res.status(400).json({
                error: error.message
            })
        }
    },

    delete: async (req, res) => {
        const { id } = req.params;
        const deleteCourse = await Course.findByIdAndDelete(id);
        return res.status(200).json({
            message: "Deleted Successfully!",
        })
    },

}

module.exports = CourseController