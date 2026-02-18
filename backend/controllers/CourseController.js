const Course = require('../models/Course');
const Episode = require('../models/Episode');
const Chapter = require("../models/Chapter");
const mongoose = require('mongoose');

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
            const userId = req.user.id;
            const courses = await Course.aggregate([
                {
                    $lookup: {
                        from: "chapters",
                        localField: "_id",
                        foreignField: "course_id",
                        as: "chapters"
                    }
                },
                {
                    $lookup: {
                        from: "episodes",
                        localField: "chapters._id",
                        foreignField: "chapter_id",
                        as: "episodes"
                    }
                },
                {
                    $lookup: {
                        from: "enrolls",
                        let: { courseId: "$_id" },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $and: [
                                            { $eq: ["$course_id", "$$courseId"] },
                                            { $eq: ["$paymentStatus", "paid"] }
                                        ]
                                    }
                                }
                            }
                        ],
                        as: "paidEnrolls"
                    }
                },
                {
                    $lookup: {
                        from: "watchedepisodes",
                        let: { courseId: "$_id" },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $and: [
                                            { $eq: ["$course_id", "$$courseId"] },
                                            { $eq: ["$user_id", new mongoose.Types.ObjectId(userId)] }
                                        ]
                                    }
                                }
                            }
                        ],
                        as: "watchedEpisodes"
                    }
                },
                {
                    $addFields: {
                        chapterCount: { $size: "$chapters" },
                        episodeCount: { $size: "$episodes" },
                        enrollCount: { $size: "$paidEnrolls" },
                        watchedEpisodesCount: { $size: "$watchedEpisodes" }
                    }
                },
                {
                    $project: {
                        chapters: 0,
                        episodes: 0,
                        paidEnrolls: 0,
                        watchedEpisodes: 0
                    }
                }
            ]);

            return res.status(200).json({ data: courses });

        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    },


    getCourseById: async (req, res) => {
        try {
            const { id } = req.params;
            const course = await Course.findById(id);
            const chapterCount = await Chapter.countDocuments({
                course_id: id
            });

            const episodeCount = await Episode.countDocuments({
                course_id: id
            });
            if (!course) return res.status(404).json({ message: "Course not found" });

            return res.status(200).json({
                data: course,
                counts: {
                    chapters: chapterCount,
                    episodes: episodeCount
                }
            });
        } catch (error) {
            return res.status(400).json({ message: error.message });
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