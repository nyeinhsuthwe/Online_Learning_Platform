const express = require('express');
const EpisodeController = require('../controllers/EpisodeController');
const upload = require('../middlewares/upload');
const router = express.Router();

router.post('/create-episode', upload.single("videoUrl"),EpisodeController.create)
router.put('/update-episode/:id', upload.single("videoUrl"), EpisodeController.update)
router.delete('/delete-episode/:id', EpisodeController.delete)
router.get('/get-episode-list', EpisodeController.EpisodeList)
router.get("/get-episode/:id", EpisodeController.getEpisodeById);
router.get("/get-episode-by-course", EpisodeController.EpisodeListByCourse)
router.post('/:episodeId/progress', EpisodeController.updateProgress);

module.exports = router
