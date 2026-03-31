import { useEffect } from "react"
import Navbar from '@/features/Navbar'
import FloatingSupportChat from '@/features/chat/FloatingSupportChat'
import { Outlet } from 'react-router'
import { getSocketClient } from "@/lib/socket"
import { toast } from "sonner"
import { useUserStore } from "@/store/user"
import { useChatNotifications } from "@/store/chatNotifications"
import type { ChatMessage } from "@/types/type"

const LayoutForUser = () => {
  const { user } = useUserStore()
  const { increment, isChatOpen } = useChatNotifications()

  useEffect(() => {
    if (!user?._id) return

    const socket = getSocketClient()
    if (!socket.connected) {
      socket.connect()
    }

    const handleIncoming = (payload: { threadId: string; data: ChatMessage }) => {
      const sender = payload.data.sender_id as ChatMessage["sender_id"] | string | undefined
      const senderId = typeof sender === "string" ? sender : sender?._id
      if (senderId && senderId === user._id) return

      if (!isChatOpen) {
        increment()
        toast.message("New chat message", {
          description: payload.data.content?.slice(0, 80),
        })
      }
    }

    socket.on("chat:new_message", handleIncoming)
    return () => {
      socket.off("chat:new_message", handleIncoming)
    }
  }, [user?._id, increment, isChatOpen])

  return (
    <div className='min-h-screen app-shell text-foreground'>
      <Navbar />
      <div className='mx-auto w-full max-w-7xl px-4 pb-16 pt-10 sm:px-6 lg:px-8'>
        <Outlet />
      </div>
      <FloatingSupportChat />
    </div>
  )
}

export default LayoutForUser
