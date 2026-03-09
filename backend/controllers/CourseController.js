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
            const userId = new mongoose.Types.ObjectId(req.user.id);

            const courses = await Course.aggregate([
                // join chapters
                {
                    $lookup: {
                        from: "chapters",
                        localField: "_id",
                        foreignField: "course_id",
                        as: "chapters",
                    },
                },
                // join episodes
                {
                    $lookup: {
                        from: "episodes",
                        localField: "chapters._id",
                        foreignField: "chapter_id",
                        as: "episodes",
                    },
                },
                // join enrolls
                {
                    $lookup: {
                        from: "enrolls",
                        let: { courseId: "$_id" },
                        pipeline: [
                            { $match: { $expr: { $and: [{ $eq: ["$course_id", "$$courseId"] }, { $eq: ["$paymentStatus", "paid"] }] } } }
                        ],
                        as: "paidEnrolls",
                    },
                },
                // join watched episodes
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
                                            { $eq: ["$user_id", userId] }
                                        ]
                                    }
                                }
                            },
                            { $project: { progress: 1, completed: 1 } }
                        ],
                        as: "userWatchedEpisodes"
                    }
                },
                // calculate counts and progress
                {
                    $addFields: {
                        chapterCount: { $size: "$chapters" },
                        episodeCount: { $size: "$episodes" },
                        enrollCount: { $size: "$paidEnrolls" },
                        completedEpisodeCount: {
                            $size: "$userWatchedEpisodes"
                        },
                        progress: {
                            $cond: [
                                { $eq: [{ $size: "$episodes" }, 0] },
                                0,
                                {
                                    $round: [
                                        {
                                            $multiply: [
                                                {
                                                    $divide: [
                                                        { $size: "$userWatchedEpisodes" },
                                                        { $size: "$episodes" }
                                                    ]
                                                },
                                                100
                                            ]
                                        },
                                        0
                                    ]
                                }
                            ]
                        }
                    }
                },
                {
                    $project: {
                        chapters: 0,
                        episodes: 0,
                        paidEnrolls: 0,
                        userWatchedEpisodes: 0,
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

    update: async (req, res) => {
        try {
            const { id } = req.params;
            const { category_id, title, price, description, topics, timePeriod, courseDuration } = req.body;

            const course = await Course.findById(id);
            if (!course) {
                return res.status(404).json({ message: "Course not found" });
            }

            const nextTopics =
                typeof topics === "string"
                    ? (() => {
                        try {
                            return JSON.parse(topics);
                        } catch (_) {
                            return topics
                                .split(",")
                                .map((topic) => topic.trim())
                                .filter(Boolean);
                        }
                    })()
                    : topics;

            if (category_id !== undefined) course.category_id = category_id;
            if (title !== undefined) course.title = title;
            if (price !== undefined) course.price = price;
            if (description !== undefined) course.description = description;
            if (nextTopics !== undefined) course.topics = nextTopics;
            if (timePeriod !== undefined) course.timePeriod = timePeriod;
            if (courseDuration !== undefined) course.courseDuration = courseDuration;
            if (req.file) {
                course.thumbnailUrl = `/uploads/image/${req.file.filename}`;
            }

            await course.save();

            return res.status(200).json({
                message: "Course updated successfully",
                data: course
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
