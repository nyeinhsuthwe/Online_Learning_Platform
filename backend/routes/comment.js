const express = require('express');
const CommentController = require("../controllers/CommentController");
const authMiddleware = require('../middlewares/auth');
const router = express.Router()

router.post("/create-comment/:course_id/:episode_id", authMiddleware, CommentController.createComment)
router.get("/get-all-comments/:course_id/:episode_id", CommentController.getComment)
router.delete("/delete-comment/:id", CommentController.deleteComment)

module.exports = router