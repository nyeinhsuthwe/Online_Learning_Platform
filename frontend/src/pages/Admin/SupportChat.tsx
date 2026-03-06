import { useEffect, useMemo, useRef, useState, type KeyboardEventHandler } from "react";
import { Send } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useApiQuery } from "@/hooks/useQuery";
import { getSocketClient } from "@/lib/socket";
import type { ChatMessage, ChatThread } from "@/types/type";

interface SocketAck<T> {
  ok: boolean;
  error?: string;
  data?: T;
}

interface IncomingMessageEvent {
  threadId: string;
  data: ChatMessage;
}

function appendUniqueMessage(messages: ChatMessage[], message: ChatMessage) {
  if (messages.some((item) => item._id === message._id)) {
    return messages;
  }

  return [...messages, message];
}

function formatTime(dateValue: string) {
  return new Date(dateValue).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

const SupportChat = () => {
  const [selectedThreadId, setSelectedThreadId] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [draft, setDraft] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [threads, setThreads] = useState<ChatThread[]>([]);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const { data: threadsResponse, isLoading: isThreadLoading } = useApiQuery<{ data: ChatThread[] }>({
    queryKey: ["admin-support-threads"],
    endpoint: `${import.meta.env.VITE_API_URL}/chat/support/threads`,
  });

  useEffect(() => {
    if (!threadsResponse?.data) {
      return;
    }

    const sortedThreads = [...threadsResponse.data].sort((a, b) => {
      return new Date(b.last_message_at).getTime() - new Date(a.last_message_at).getTime();
    });

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setThreads(sortedThreads);

    if (!selectedThreadId && sortedThreads.length > 0) {
      setSelectedThreadId(sortedThreads[0]._id);
    }
  }, [threadsResponse, selectedThreadId]);

  const activeThread = useMemo(
    () => threads.find((thread) => thread._id === selectedThreadId) || null,
    [threads, selectedThreadId]
  );

  const { data: messageResponse, isLoading: isMessagesLoading } = useApiQuery<{ data: ChatMessage[] }>({
    queryKey: ["admin-support-thread-messages", selectedThreadId],
    endpoint: `${import.meta.env.VITE_API_URL}/chat/thread/${selectedThreadId}/messages?limit=50`,
    enabled: Boolean(selectedThreadId),
  });

  useEffect(() => {
    if (messageResponse?.data) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setMessages(messageResponse.data);
    }
  }, [messageResponse]);

  useEffect(() => {
    if (threads.length === 0) {
      return;
    }

    const socket = getSocketClient();
    if (!socket.connected) {
      socket.connect();
    }

    threads.forEach((thread) => {
      socket.emit("chat:join", { threadId: thread._id }, () => undefined);
    });

    const handleIncomingMessage = (payload: IncomingMessageEvent) => {
      setThreads((prev) => {
        const next = prev.map((thread) => {
          if (thread._id !== payload.threadId) {
            return thread;
          }

          return {
            ...thread,
            last_message: payload.data.content,
            last_message_at: payload.data.createdAt,
          };
        });

        return next.sort((a, b) => {
          return new Date(b.last_message_at).getTime() - new Date(a.last_message_at).getTime();
        });
      });

      if (payload.threadId !== selectedThreadId) {
        return;
      }

      setMessages((prev) => appendUniqueMessage(prev, payload.data));
    };

    socket.on("chat:new_message", handleIncomingMessage);

    return () => {
      socket.off("chat:new_message", handleIncomingMessage);
    };
  }, [threads, selectedThreadId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, selectedThreadId]);

  const handleSend = () => {
    const content = draft.trim();
    if (!content || !selectedThreadId || isSending) {
      return;
    }

    const socket = getSocketClient();
    if (!socket.connected) {
      socket.connect();
    }

    setIsSending(true);
    socket.emit("chat:send", { threadId: selectedThreadId, content }, (ack: SocketAck<ChatMessage>) => {
      setIsSending(false);

      if (!ack.ok) {
        toast.error(ack.error || "Failed to send message");
        return;
      }

      setDraft("");
    });
  };

  const onInputKeyDown: KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold">Support Chat</h1>
        <p className="text-sm text-muted-foreground">Reply to student support questions in real time.</p>
      </div>

      <div className="grid min-h-[70vh] grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="rounded-lg border bg-card p-3 lg:col-span-1">
          <p className="mb-3 text-sm font-medium">Students</p>
          <div className="space-y-2">
            {isThreadLoading && <p className="text-sm text-muted-foreground">Loading threads...</p>}

            {!isThreadLoading && threads.length === 0 && (
              <p className="text-sm text-muted-foreground">No support chats yet.</p>
            )}

            {threads.map((thread) => {
              const isActive = thread._id === selectedThreadId;
              return (
                <button
                  key={thread._id}
                  type="button"
                  onClick={() => setSelectedThreadId(thread._id)}
                  className={`w-full rounded-md border px-3 py-2 text-left transition ${
                    isActive ? "border-primary bg-primary/10" : "hover:bg-muted/40"
                  }`}
                >
                  <p className="font-medium">{thread.student_id?.name || "Student"}</p>
                  <p className="mt-1 line-clamp-1 text-xs text-muted-foreground">{thread.last_message || "No message yet"}</p>
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col rounded-lg border bg-card lg:col-span-2">
          <div className="border-b px-4 py-3">
            <p className="font-medium">{activeThread?.student_id?.name || "Select a student"}</p>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto p-4">
            {!selectedThreadId && <p className="text-sm text-muted-foreground">Select a thread to start chatting.</p>}
            {isMessagesLoading && selectedThreadId && <p className="text-sm text-muted-foreground">Loading messages...</p>}

            {!isMessagesLoading &&
              selectedThreadId &&
              messages.map((message) => {
                const isAdminMessage = message.sender_id?.role === "admin";
                return (
                  <div key={message._id} className={`flex ${isAdminMessage ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[80%] rounded-xl px-3 py-2 text-sm ${
                        isAdminMessage ? "bg-primary text-primary-foreground" : "border bg-muted/40"
                      }`}
                    >
                      <p>{message.content}</p>
                      <p className={`mt-1 text-[10px] ${isAdminMessage ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                        {formatTime(message.createdAt)}
                      </p>
                    </div>
                  </div>
                );
              })}
            <div ref={bottomRef} />
          </div>

          <div className="flex items-center gap-2 border-t p-3">
            <Input
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              onKeyDown={onInputKeyDown}
              placeholder={selectedThreadId ? "Type your reply..." : "Select a thread first"}
              disabled={!selectedThreadId || isMessagesLoading}
            />
            <Button onClick={handleSend} disabled={!selectedThreadId || !draft.trim() || isSending}>
              <Send className="size-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportChat;
