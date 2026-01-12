const express = require('express');
const CourseController = require('../controllers/CourseController');
const router = express.Router();
const upload = require('../middlewares/upload')

router.post("/create-course", upload.single("thumbnailUrl"), CourseController.createCourse)
router.get("/get-course", CourseController.getCourse)
router.delete("/delete-course/:id", CourseController.delete)

module.exports = router