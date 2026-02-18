const express = require('express');
const CourseController = require('../controllers/CourseController');
const router = express.Router();
const upload = require('../middlewares/upload');
const authMiddleware = require('../middlewares/auth');
const WatchedEpisode = require('../models/WatchedEpisode');

router.post("/create-course", upload.single("thumbnailUrl"), CourseController.createCourse)
router.get("/get-course",authMiddleware, CourseController.getCourse)
router.get("/get-courseById/:id", CourseController.getCourseById)
router.delete("/delete-course/:id", CourseController.delete)

router.post(
    "/course/:courseId/episode/:episodeId/watch",
    authMiddleware, 
    async (req, res) => {
        try {
            const userId = req.user.id; 
            const { courseId, episodeId } = req.params;
            const exists = await WatchedEpisode.findOne({ user_id: userId, course_id: courseId, episode_id: episodeId });
            if (exists) {
                return res.status(200).json({ message: "Episode already marked as watched" });
            }

            await WatchedEpisode.create({ user_id: userId, course_id: courseId, episode_id: episodeId });
            res.status(201).json({ message: "Episode marked as watched" });
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }
);

module.exports = router