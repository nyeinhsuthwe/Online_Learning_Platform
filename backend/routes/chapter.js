const express = require('express');
const ChapterController = require('../controllers/ChapterController');
const router = express.Router();

router.post('/create-chapter', ChapterController.create)
router.delete('/delete-chapter/:id', ChapterController.delete)
router.get('/get-chapter-list', ChapterController.chapterList)

module.exports = router