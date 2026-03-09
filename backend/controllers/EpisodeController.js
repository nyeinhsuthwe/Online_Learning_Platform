const Episode = require('../models/Episode')
const Chapter = require("../models/Chapter")
const getVideoDuration = require("../helper/videoDuration");

const EpisodeController = {
    create: async (req, res) => {
        const { chapter_id, title, description, course_id } = req.body;
        let videoUrl = "";
        let duration = 0;

        if (req.file) {
            videoUrl = `/uploads/video/${req.file.filename}`;
            const videoPath = req.file.path;
            duration = await getVideoDuration(videoPath);
        }

        const data = await Episode.create({
            chapter_id, title, videoUrl, description, course_id, duration
        })
        return res.status(200).json({
            message: "Episode Created Successfully!",
            data
        })
    },

    delete: async (req, res) => {
        const { id } = req.params;
        const deleteEpisode = await Episode.findByIdAndDelete(id);
        return res.status(200).json({
            message: "Deleted Successfully!",
        })
    },

    EpisodeList: async (req, res) => {
        try {
            const { chapterId } = req.query;

            if (!chapterId) {
                return res.status(400).json({ message: "chapterId is required" });
            }

            const data = await Episode.find({ chapter_id: chapterId }).populate("chapter_id", "title");
            return res.status(200).json({ data });

        } catch (error) {
            return res.status(400).json({
                message: error.message
            })
        }
    },

    EpisodeListByCourse: async (req, res) => {
        try {
            const { courseId } = req.query;

            if (!courseId) {
                return res.status(400).json({ message: "courseId is required" });
            }
            const chapters = await Chapter.find({ course_id: courseId }).select("_id");

            const chapterIds = chapters.map(ch => ch._id);
            const episodes = await Episode.find({
                chapter_id: { $in: chapterIds }
            }).populate("chapter_id", "title");

            return res.status(200).json({ data: episodes });

        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    },


    getEpisodeById: async (req, res) => {
        try {
            const { id } = req.params;
            const episode = await Episode.findById(id).populate("chapter_id", "title");
            if (!episode) return res.status(404).json({ message: "Episode not found" });
            return res.status(200).json({ data: episode });
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    },

    update: async (req, res) => {
        try {
            const { id } = req.params;
            const { chapter_id, title, description, course_id } = req.body;

            const episode = await Episode.findById(id);
            if (!episode) {
                return res.status(404).json({ message: "Episode not found" });
            }

            if (chapter_id !== undefined) episode.chapter_id = chapter_id;
            if (course_id !== undefined) episode.course_id = course_id;
            if (title !== undefined) episode.title = title;
            if (description !== undefined) episode.description = description;

            if (req.file) {
                const videoPath = req.file.path;
                const duration = await getVideoDuration(videoPath);
                episode.videoUrl = `/uploads/video/${req.file.filename}`;
                episode.duration = duration;
            }

            await episode.save();

            return res.status(200).json({
                message: "Episode updated successfully",
                data: episode
            });
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    },

    updateProgress: async (req, res) => {
        try {
            const { userId, courseId, episodeId, progress } = req.body;

            if (!userId || !courseId || !episodeId) {
                return res.status(400).json({ message: "Missing required fields" });
            }

            let watched = await WatchedEpisode.findOne({ user_id: userId, episode_id: episodeId });

            if (!watched) {
                watched = new WatchedEpisode({ user_id: userId, course_id: courseId, episode_id: episodeId });
            }

            watched.progress = progress;
            watched.completed = progress >= 90;
            await watched.save();

            res.status(200).json({ message: "Progress updated", watched });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

}

module.exports = EpisodeController
