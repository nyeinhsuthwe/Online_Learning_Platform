const express = require('express');
const EnrollController = require('../controllers/EnrollController');
const router = express.Router();
const authMiddleware = require('../middlewares/auth')

router.post("/enroll/:course_id", authMiddleware, EnrollController.createEnroll)
router.get("/get-enrollList", EnrollController.getEnrollList)

module.exports = router