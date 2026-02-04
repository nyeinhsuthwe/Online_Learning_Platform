const Episode = require('../models/Episode')

const EpisodeController = {
    create: async (req, res) => {
        const { chapter_id, title, description, course_id } = req.body;
        const videoUrl = req.file
            ? `/uploads/video/${req.file.filename}`
            : "";
        const data = await Episode.create({
            chapter_id, title, videoUrl, description, course_id
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

    getEpisodeById: async (req, res) => {
        try {
            const { id } = req.params;
            const episode = await Episode.findById(id).populate("chapter_id", "title");
            if (!episode) return res.status(404).json({ message: "Episode not found" });
            return res.status(200).json({ data: episode });
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }

}

module.exports = EpisodeController