import { useState } from "react";
import type { Comment } from "@/types/type";
import { ReplyInput } from "./ReplyInput";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { useApiMutation } from "@/hooks/useMutation";
import { HeartSession } from "./HeartSession";

interface CommentNodeProps {
  comment: Comment;
  episodeId: string;
}


export function CommentNode({ comment, episodeId }: CommentNodeProps) {
  const [showReply, setShowReply] = useState(false);
  const [viewComment, setViewComment] = useState(false)
  const queryClient = useQueryClient();

  const mutation = useApiMutation<null, null>({
    onSuccess: () => {
      toast.success("Comment deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["comments", episodeId] });
    },
    onError: (error: unknown) => {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Failed to delete comment");
      }
    }

  });

  const handleDelete = () => {
    mutation.mutate({
      endpoint: `${import.meta.env.VITE_API_URL}/delete-comment/${comment._id}`,
      method: "DELETE",
    });
  };

  return (
    <div className="mt-4 rounded-2xl border border-border/60 bg-background/70 p-5 shadow-sm">
      <div className="flex gap-3">
        <img
          src={comment.user_id?.avatar || "/ava1.jpg"}
          alt={comment.user_id?.name}
          className="w-10 h-10 rounded-full border border-border/60"
        />


        <div className="flex-1 space-y-1 ">
          {/* User Name & Time */}
          <div className="flex items-center justify-between">
            <p className="font-semibold text-foreground">
              {comment.user_id?.name || "Anonymous"}
            </p>
            <span className="text-xs text-muted-foreground">
              {new Date(comment.createdAt).toLocaleDateString()}
            </span>
          </div>

          <p className="text-justify text-sm text-foreground">{comment.content}</p>

          <div className="flex items-center gap-4 mt-1">
            <button
              onClick={() => setShowReply(!showReply)}
              className="text-sm text-primary hover:underline"
            >
              {showReply ? "Cancel" : "Reply"}
            </button>

            <HeartSession comment={comment} />

            <button
              onClick={handleDelete}
              className="text-sm text-red-600 flex items-center gap-1 hover:text-red-700"
            >
              <Trash2 size={16} />
              Delete
            </button>
          </div>

          {comment.replies.length > 0 && !viewComment && (
            <button
              onClick={() => setViewComment(true)}
              className="text-sm  mt-2 text-[15px] flex text-justify"
            >
              View more....
            </button>
          )}

        </div>
      </div>

      {showReply && (
        <div className="ml-12 mt-2">
          <ReplyInput onCancel={() => setShowReply(false)} parentCommentId={comment._id} />
        </div>
      )}

      {comment.replies && comment.replies.length > 0 && (
        viewComment && (
          <div className="ml-12 mt-3 space-y-3   pl-4">
            {comment.replies.map((reply) => (
              <CommentNode
                key={reply._id}
                comment={reply}
                episodeId={episodeId}
              />

            ))}
          </div>
        )
      )}
    </div>
  );
}
