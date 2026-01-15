const express = require('express');
const ReviewController = require('../controllers/ReviewController');
const authMiddleware = require('../middlewares/auth');
const router = express.Router();

router.post('/create-review/:courseId', authMiddleware, ReviewController.createReview)
router.get("/reviewList/:courseId", ReviewController.getReviewList)

module.exports = router