const express = require("express");
const ChatController = require("../controllers/ChatController");
const authMiddleware = require("../middlewares/auth");

const router = express.Router();

router.get("/chat/support/my-thread", authMiddleware, ChatController.getOrCreateMySupportThread);
router.get("/chat/support/threads", authMiddleware, ChatController.getSupportThreadsForAdmin);
router.post(
  "/chat/support/thread/:student_id",
  authMiddleware,
  ChatController.getOrCreateSupportThreadForStudent
);
router.get("/chat/thread/:thread_id/messages", authMiddleware, ChatController.getThreadMessages);

module.exports = router;
