const express = require('express');
const EnrollController = require('../controllers/EnrollController');
const router = express.Router();
const authMiddleware = require('../middlewares/auth')

router.post("/enroll/:course_id", authMiddleware, EnrollController.createEnroll)
router.get("/get-enrollList", EnrollController.getEnrollList)
router.post("/confirm-status", EnrollController.confirmStatus)
router.get("/get-enroll-by-id", authMiddleware, EnrollController.getEnrollByUser)

module.exports = router