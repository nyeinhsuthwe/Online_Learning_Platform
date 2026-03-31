import { useState } from "react";
import { MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/store/user";
import { SupportChatDrawer } from "@/features/chat/SupportChatDrawer";
import { useChatNotifications } from "@/store/chatNotifications";

const FloatingSupportChat = () => {
  const { user } = useUserStore();
  const [open, setOpen] = useState(false);
  const { unreadCount } = useChatNotifications();

  if (!user) {
    return null;
  }

  return (
    <>
      <div className="fixed bottom-6 right-6 z-40">
        <Button
          type="button"
          onClick={() => setOpen(true)}
          className="relative h-12 w-12 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90"
          aria-label="Open support chat"
        >
          <MessageSquare className="size-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 inline-flex min-w-5 items-center justify-center rounded-full bg-rose-500 px-1.5 text-[10px] font-semibold text-white">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </Button>
      </div>
      <SupportChatDrawer open={open} onOpenChange={setOpen} />
    </>
  );
};

export default FloatingSupportChat;
