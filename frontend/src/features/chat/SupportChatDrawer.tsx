import { useEffect, useMemo, useRef, useState, type KeyboardEventHandler } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useApiQuery } from "@/hooks/useQuery";
import { getSocketClient } from "@/lib/socket";
import type { ChatMessage, ChatThread } from "@/types/type";
import { useUserStore } from "@/store/user";

interface SupportChatDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface SocketAck<T> {
  ok: boolean;
  error?: string;
  data?: T;
}

interface IncomingMessageEvent {
  threadId: string;
  data: ChatMessage;
}

function formatMessageTime(dateValue: string) {
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

export function SupportChatDrawer({ open, onOpenChange }: SupportChatDrawerProps) {
  const { courseId, episodeId } = useParams<{ courseId: string; episodeId: string }>();
  const { user } = useUserStore();
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isSending, setIsSending] = useState(false);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const threadEndpoint = useMemo(() => {
    const params = new URLSearchParams();
    if (courseId) {
      params.append("course_id", courseId);
    }
    if (episodeId) {
      params.append("episode_id", episodeId);
    }

    const query = params.toString();
    return `${import.meta.env.VITE_API_URL}/chat/support/my-thread${query ? `?${query}` : ""}`;
  }, [courseId, episodeId]);

  const { data: threadResponse, isLoading: isThreadLoading } = useApiQuery<{ data: ChatThread }>({
    queryKey: ["support-thread", courseId, episodeId, open],
    endpoint: threadEndpoint,
    enabled: open,
  });

  const threadId = threadResponse?.data?._id || "";

  const { data: messageResponse, isLoading: isMessagesLoading } = useApiQuery<{ data: ChatMessage[] }>({
    queryKey: ["support-thread-messages", threadId],
    endpoint: `${import.meta.env.VITE_API_URL}/chat/thread/${threadId}/messages?limit=50`,
    enabled: open && Boolean(threadId),
  });

  useEffect(() => {
    if (messageResponse?.data) {
      setMessages(messageResponse.data);
    }
  }, [messageResponse]);

  useEffect(() => {
    if (!open || !threadId) {
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
  }, [open, threadId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, open]);

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

  const handleEnterToSend: KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  const loading = isThreadLoading || isMessagesLoading;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-lg" side="right">
        <SheetHeader className="border-b">
          <SheetTitle>Support Chat</SheetTitle>
          <SheetDescription>Ask admin/teacher about this lesson.</SheetDescription>
        </SheetHeader>

        <div className="flex h-full flex-col px-4 pb-4">
          <div className="my-3 flex-1 space-y-3 overflow-y-auto rounded-md border bg-muted/20 p-3">
            {loading && <p className="text-sm text-muted-foreground">Loading messages...</p>}

            {!loading && messages.length === 0 && (
              <p className="text-sm text-muted-foreground">Start the conversation with admin.</p>
            )}

            {messages.map((message) => {
              const isMine = message.sender_id._id === user?._id;

              return (
                <div key={message._id} className={`flex ${isMine ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] rounded-xl px-3 py-2 text-sm ${
                      isMine ? "bg-primary text-primary-foreground" : "bg-card border"
                    }`}
                  >
                    <p>{message.content}</p>
                    <p className={`mt-1 text-[10px] ${isMine ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                      {formatMessageTime(message.createdAt)}
                    </p>
                  </div>
                </div>
              );
            })}

            <div ref={bottomRef} />
          </div>

          <div className="mt-auto flex items-center gap-2 border-t pt-3">
            <Input
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              placeholder="Type your message..."
              onKeyDown={handleEnterToSend}
              disabled={loading || !threadId}
            />
            <Button onClick={handleSend} disabled={!draft.trim() || loading || isSending || !threadId}>
              <Send className="size-4" />
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
