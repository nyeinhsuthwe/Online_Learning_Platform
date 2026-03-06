import { useEffect, useMemo, useRef, useState, type KeyboardEventHandler } from "react";
import { Send } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useApiQuery } from "@/hooks/useQuery";
import { getSocketClient } from "@/lib/socket";
import { useUserStore } from "@/store/user";
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

function formatTime(dateValue: string) {
  return new Date(dateValue).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function appendUniqueMessage(messages: ChatMessage[], message: ChatMessage) {
  if (messages.some((item) => item._id === message._id)) {
    return messages;
  }

  return [...messages, message];
}

const ChatPage = () => {
  const { user } = useUserStore();
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isSending, setIsSending] = useState(false);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const { data: threadResponse, isLoading: isThreadLoading } = useApiQuery<{ data: ChatThread }>({
    queryKey: ["user-support-thread"],
    endpoint: `${import.meta.env.VITE_API_URL}/chat/support/my-thread`,
  });

  const threadId = threadResponse?.data?._id || "";

  const { data: messageResponse, isLoading: isMessagesLoading } = useApiQuery<{ data: ChatMessage[] }>({
    queryKey: ["user-support-messages", threadId],
    endpoint: `${import.meta.env.VITE_API_URL}/chat/thread/${threadId}/messages?limit=50`,
    enabled: Boolean(threadId),
  });

  useEffect(() => {
    if (messageResponse?.data) {
      setMessages(messageResponse.data);
    }
  }, [messageResponse]);

  useEffect(() => {
    if (!threadId) {
      return;
    }

    const socket = getSocketClient();
    if (!socket.connected) {
      socket.connect();
    }

    socket.emit("chat:join", { threadId }, (ack: SocketAck<null>) => {
      if (!ack.ok) {
        toast.error(ack.error || "Failed to join support chat");
      }
    });

    const handleIncomingMessage = (payload: IncomingMessageEvent) => {
      if (payload.threadId !== threadId) {
        return;
      }

      setMessages((prev) => appendUniqueMessage(prev, payload.data));
    };

    socket.on("chat:new_message", handleIncomingMessage);

    return () => {
      socket.off("chat:new_message", handleIncomingMessage);
    };
  }, [threadId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages]);

  const handleSend = () => {
    const content = draft.trim();
    if (!content || !threadId || isSending) {
      return;
    }

    const socket = getSocketClient();
    if (!socket.connected) {
      socket.connect();
    }

    setIsSending(true);
    socket.emit("chat:send", { threadId, content }, (ack: SocketAck<ChatMessage>) => {
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

  const loading = useMemo(() => isThreadLoading || isMessagesLoading, [isThreadLoading, isMessagesLoading]);

  return (
    <div className="w-full max-w-5xl">
      <Card className="flex min-h-[70vh] flex-col p-0">
        <div className="border-b px-6 py-4">
          <h2 className="text-xl font-semibold">Support Chat</h2>
          <p className="text-sm text-muted-foreground">Chat with admin/teacher here.</p>
        </div>

        <div className="flex-1 space-y-3 overflow-y-auto px-6 py-4">
          {loading && <p className="text-sm text-muted-foreground">Loading messages...</p>}

          {!loading && messages.length === 0 && (
            <p className="text-sm text-muted-foreground">No messages yet. Start chatting.</p>
          )}

          {messages.map((message) => {
            const isMine = message.sender_id._id === user?._id;

            return (
              <div key={message._id} className={`flex ${isMine ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[75%] rounded-xl px-3 py-2 text-sm ${
                    isMine ? "bg-primary text-primary-foreground" : "border bg-muted/40"
                  }`}
                >
                  <p>{message.content}</p>
                  <p className={`mt-1 text-[10px] ${isMine ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                    {formatTime(message.createdAt)}
                  </p>
                </div>
              </div>
            );
          })}
          <div ref={bottomRef} />
        </div>

        <div className="flex items-center gap-2 border-t px-6 py-4">
          <Input
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            onKeyDown={onInputKeyDown}
            placeholder="Type your message..."
            disabled={loading || !threadId}
          />
          <Button onClick={handleSend} disabled={!draft.trim() || loading || isSending || !threadId}>
            <Send className="size-4" />
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default ChatPage;
