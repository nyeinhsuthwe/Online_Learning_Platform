const ChatMessage = require("../models/ChatMessage");
const ChatThread = require("../models/ChatThread");
const User = require("../models/User");

async function getRequester(req) {
  if (!req.user?.id) {
    return null;
  }

  return User.findById(req.user.id).select("_id role");
}

async function getDefaultAdminId() {
  const admin = await User.findOne({ role: "admin" }).sort({ createdAt: 1 }).select("_id");
  return admin?._id || null;
}

async function ensureSupportThread({ studentId, adminId, courseId = null, episodeId = null }) {
  let thread = await ChatThread.findOne({
    type: "support",
    student_id: studentId,
    admin_id: adminId,
  });

  if (!thread) {
    thread = await ChatThread.create({
      type: "support",
      student_id: studentId,
      admin_id: adminId,
      course_id: courseId || null,
      episode_id: episodeId || null,
    });
  }

  return thread;
}

const ChatController = {
  getOrCreateMySupportThread: async (req, res) => {
    try {
      const requester = await getRequester(req);
      if (!requester) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      if (requester.role !== "user") {
        return res.status(403).json({ error: "Only students can use this endpoint" });
      }

      const adminId = await getDefaultAdminId();
      if (!adminId) {
        return res.status(400).json({ error: "No admin account found" });
      }

      const { course_id: courseId, episode_id: episodeId } = req.query;
      const thread = await ensureSupportThread({
        studentId: requester._id,
        adminId,
        courseId,
        episodeId,
      });

      const populated = await ChatThread.findById(thread._id)
        .populate("student_id", "name avatar role")
        .populate("admin_id", "name avatar role");

      return res.status(200).json({ data: populated });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  getSupportThreadsForAdmin: async (req, res) => {
    try {
      const requester = await getRequester(req);
      if (!requester) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      if (requester.role !== "admin") {
        return res.status(403).json({ error: "Only admin can access support threads" });
      }

      const threads = await ChatThread.find({
        type: "support",
        admin_id: requester._id,
      })
        .populate("student_id", "name avatar role")
        .populate("admin_id", "name avatar role")
        .sort({ last_message_at: -1 });

      return res.status(200).json({ data: threads });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  getOrCreateSupportThreadForStudent: async (req, res) => {
    try {
      const requester = await getRequester(req);
      if (!requester) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      if (requester.role !== "admin") {
        return res.status(403).json({ error: "Only admin can create support thread" });
      }

      const student = await User.findById(req.params.student_id).select("_id role");
      if (!student || student.role !== "user") {
        return res.status(404).json({ error: "Student not found" });
      }

      const thread = await ensureSupportThread({
        studentId: student._id,
        adminId: requester._id,
      });

      const populated = await ChatThread.findById(thread._id)
        .populate("student_id", "name avatar role")
        .populate("admin_id", "name avatar role");

      return res.status(200).json({ data: populated });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  getThreadMessages: async (req, res) => {
    try {
      const requester = await getRequester(req);
      if (!requester) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      const { thread_id: threadId } = req.params;
      const page = Math.max(Number(req.query.page) || 1, 1);
      const limit = Math.min(Math.max(Number(req.query.limit) || 30, 1), 100);
      const skip = (page - 1) * limit;

      const thread = await ChatThread.findById(threadId).select("student_id admin_id");
      if (!thread) {
        return res.status(404).json({ error: "Thread not found" });
      }

      const requesterId = String(requester._id);
      const isMember =
        requesterId === String(thread.student_id) || requesterId === String(thread.admin_id);

      if (!isMember) {
        return res.status(403).json({ error: "Forbidden" });
      }

      const [messages, total] = await Promise.all([
        ChatMessage.find({ thread_id: threadId })
          .populate("sender_id", "name avatar role")
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(limit),
        ChatMessage.countDocuments({ thread_id: threadId }),
      ]);

      return res.status(200).json({
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        data: messages.reverse(),
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
};

module.exports = ChatController;
