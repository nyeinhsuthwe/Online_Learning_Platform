const Chapter = require('../models/Chapter')

const ChapterController = {
    create: async ( req, res) => {
        const { course_id, title } = req.body;
        const chapterData = await Chapter.create({
            course_id, title
        })
        return res.status(200).json({
            message: "Chapter Created Successfully!",
            chapterData
        })
    },

    delete: async (req, res) => {
        const { id } = req.params;
        const deleteChapter = await Chapter.findByIdAndDelete(id);
         return res.status(200).json({
            message: "Chapter Deleted Successfully!",
        })
    },

    chapterList: async (req, res) => {
    try {
        const { course_id } = req.query; 
        if (!course_id) {
            return res.status(400).json({ message: "courseId is required" });
        }
        const data = await Chapter.find({ course_id }); 

        return res.status(200).json({ data });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

}

module.exports = ChapterController