const jwt = require("jsonwebtoken");
const ChatMessage = require("../models/ChatMessage");
const ChatThread = require("../models/ChatThread");
const User = require("../models/User");

function extractCookieValue(cookieHeader, key) {
  if (!cookieHeader) {
    return null;
  }

  const cookies = cookieHeader.split(";").map((item) => item.trim());
  const target = cookies.find((item) => item.startsWith(`${key}=`));
  if (!target) {
    return null;
  }

  return decodeURIComponent(target.slice(key.length + 1));
}

function getThreadRoom(threadId) {
  return `thread:${threadId}`;
}

function registerChatSocket(io) {
  io.use(async (socket, next) => {
    try {
      const token = extractCookieValue(socket.handshake.headers.cookie, "jwt");
      if (!token) {
        return next(new Error("Unauthorized"));
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded._id).select("_id name avatar role");
      if (!user) {
        return next(new Error("Unauthorized"));
      }

      socket.user = {
        id: String(user._id),
        name: user.name,
        avatar: user.avatar,
        role: user.role,
      };

      return next();
    } catch (error) {
      return next(new Error("Unauthorized"));
    }
  });

  io.on("connection", (socket) => {
    socket.on("chat:join", async (payload, ack) => {
      try {
        const threadId = payload?.threadId;
        if (!threadId) {
          ack?.({ ok: false, error: "threadId is required" });
          return;
        }

        const thread = await ChatThread.findById(threadId).select("student_id admin_id");
        if (!thread) {
          ack?.({ ok: false, error: "Thread not found" });
          return;
        }

        const userId = socket.user.id;
        const allowed =
          userId === String(thread.student_id) || userId === String(thread.admin_id);

        if (!allowed) {
          ack?.({ ok: false, error: "Forbidden" });
          return;
        }

        await socket.join(getThreadRoom(threadId));
        ack?.({ ok: true });
      } catch (error) {
        ack?.({ ok: false, error: "Failed to join thread" });
      }
    });

    socket.on("chat:send", async (payload, ack) => {
      try {
        const threadId = payload?.threadId;
        const content = (payload?.content || "").trim();

        if (!threadId || !content) {
          ack?.({ ok: false, error: "threadId and content are required" });
          return;
        }

        const thread = await ChatThread.findById(threadId).select("student_id admin_id");
        if (!thread) {
          ack?.({ ok: false, error: "Thread not found" });
          return;
        }

        const userId = socket.user.id;
        const allowed =
          userId === String(thread.student_id) || userId === String(thread.admin_id);

        if (!allowed) {
          ack?.({ ok: false, error: "Forbidden" });
          return;
        }

        const message = await ChatMessage.create({
          thread_id: threadId,
          sender_id: userId,
          content,
        });

        await ChatThread.findByIdAndUpdate(threadId, {
          last_message: content,
          last_message_at: new Date(),
        });

        const populated = await ChatMessage.findById(message._id).populate(
          "sender_id",
          "name avatar role"
        );

        const eventPayload = {
          threadId,
          data: populated,
        };

        io.to(getThreadRoom(threadId)).emit("chat:new_message", eventPayload);
        ack?.({ ok: true, data: populated });
      } catch (error) {
        ack?.({ ok: false, error: "Failed to send message" });
      }
    });
  });
}

module.exports = {
  registerChatSocket,
};
