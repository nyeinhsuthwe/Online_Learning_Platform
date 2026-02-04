import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useApiMutation } from "@/hooks/useMutation";
import { toast } from "sonner";
import { useEpisodeStore } from "@/store/episode";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useUserStore } from "@/store/user";

interface ReplyInputProps {
  onCancel: () => void;
  parentCommentId?: string;
}

export function ReplyInput({ onCancel, parentCommentId }: ReplyInputProps) {
  const { episode } = useEpisodeStore();
  const [reply, setReply] = useState("");
  const queryClient = useQueryClient();
  const { courseId } = useParams<{ courseId: string }>();
  const user  = useUserStore();

  const replyMutation = useApiMutation({
    onSuccess: () => {
      toast.success("Reply successfully!");
      setReply("");
      onCancel();
      queryClient.invalidateQueries({ queryKey: ["comments", episode?._id] })
    },
    onError: (error: unknown) => {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Failed to submit reply!");
      }
    }
  });

  const handleSubmit = () => {
    if (!reply.trim()) return toast.error("Reply cannot be empty");

    replyMutation.mutate({
      endpoint: `${import.meta.env.VITE_API_URL}/create-comment/${courseId}/${episode?._id}`,
      method: "POST",
      body: {
        content: reply,
        parent_comment_id: parentCommentId,
      },
    });
  };

  return (
    <Card className="mt-4 bg-sky-50 dark:bg-transparent p-4">
      <div className="flex gap-3">
        <img
          src={user?.user?.avatar || "/ava1.jpg"}
          alt="User profile"
          className="w-10 h-10 rounded-full"
        />

        <div className="flex-1 flex flex-col gap-2">
          <Textarea
            placeholder="Write a reply..."
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            className="w-full h-24 bg-white text-text-primary dark:text-white resize-none"
          />

          <div className="flex justify-end gap-2">
            <Button variant="ghost" className="text-gray-600" onClick={onCancel}>
              Cancel
            </Button>
            <Button
              className="bg-primary-dark text-white hover:bg-primary-hover"
              onClick={handleSubmit}
            >
              Reply
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
