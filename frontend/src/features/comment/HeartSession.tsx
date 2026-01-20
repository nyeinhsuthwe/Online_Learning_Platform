import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Heart } from "lucide-react";
import { useHeartStore } from "@/store/heart";
import { useUserStore } from "@/store/user";
import type { Comment } from "@/types/type";

interface CommentNodeProps {
    comment: Comment;
}

export function HeartSession({ comment }: CommentNodeProps) {
    const { heartedComments, toggleHeart } = useHeartStore();
    const { user } = useUserStore();
    const currentHearts = heartedComments[comment._id] || [];

    const handleHeartClick = () => {
        if (!user?._id) return;
        toggleHeart(comment._id, user._id);
    };

   const heartUserNames = currentHearts.includes(user?._id ?? "") && user?.name
  ? [user.name]
  : [];


    return (
        <TooltipProvider delayDuration={200}>
            <Tooltip>
                <TooltipTrigger asChild>
                    <button
                        onClick={handleHeartClick}
                        disabled={!user?._id}
                        className="text-sm text-red-600 mt-1 flex gap-2 items-center"
                    >
                        <Heart
                            size={20}
                            className={
                                currentHearts.includes(user?._id ?? "")
                                    ? "fill-red-600"
                                    : ""
                            }
                        />
                        {currentHearts.length}
                    </button>
                </TooltipTrigger>

                <TooltipContent side="top" align="center">
                    {heartUserNames.length > 0 ? (
                        <p className="max-w-55 text-xs text-center">
                            {heartUserNames.join(", ")}
                        </p>
                    ) : (
                        <p className="text-xs text-muted-foreground">
                            No hearts yet
                        </p>
                    )}
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}
