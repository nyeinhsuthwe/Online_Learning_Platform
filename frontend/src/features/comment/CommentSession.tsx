import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Reply } from "./Reply";
import { useApiMutation } from "@/hooks/useMutation";
import { toast } from "sonner";
import { useEpisodeStore } from "@/store/episode";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useUserStore } from "@/store/user";

export function CommentSession() {
    const { episode } = useEpisodeStore();
    const [comment, setComment] = useState("");
    const queryClient = useQueryClient();
    const { courseId } = useParams<{ courseId: string }>();
    const user = useUserStore();

    const commentMutation = useApiMutation({
        onSuccess: () => {
            toast.success("Comment successfully!")
            setComment("");
            queryClient.invalidateQueries({
                queryKey: ["comments", episode?._id]
            })
        },
        onError: (err) => {
            toast.error(err.message)
        },
    })

    const onSubmit = () => {
        commentMutation.mutate({
            endpoint: `${import.meta.env.VITE_API_URL}/create-comment/${courseId}/${episode?._id}`,
            method: "POST",
            body: {
                content: comment
            }
        })
    }

   

    return (
        <div>
            <Card className="glass-card text-center gap-2 p-4 sm:p-6 md:p-8">
                {/* Title */}
                <div className="space-y-1 flex flex-col">
                    <span className="text-xl sm:text-2xl md:text-3xl font-semibold text-foreground">
                        Answer & Questions
                    </span>

                    <span className="text-sm sm:text-base text-muted-foreground">
                        If you have a question, you can ask here!
                    </span>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 mt-4 sm:mt-6">
                    <img
                        src={user?.user?.avatar || "/ava1.jpg"}
                        alt="User profile"
                        className="w-12 h-12 sm:w-14 sm:h-14 rounded-full mx-auto sm:mx-0"
                    />

                    <div className="flex flex-col flex-1">
                        <Textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Type your message here."
                            id="message-2"
                            className="h-32 w-full resize-none rounded-xl bg-background/70 text-foreground sm:h-40"
                        />

                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-2 gap-2 sm:gap-0">
                            <p className="text-muted-foreground text-sm flex items-center gap-2">
                                <Checkbox
                                    defaultChecked
                                    className="w-4 h-4 data-[state=checked]:border-sky-600 data-[state=checked]:bg-sky-600 data-[state=checked]:text-white"
                                />
                                Subscribe to get reply email notifications
                            </p>

                            <Button onClick={() => onSubmit()} className="w-full sm:w-40 h-10 sm:h-12 text-[14px] sm:text-[16px] rounded-xl bg-gradient-to-r from-sky-600 to-emerald-500 text-white shadow-sm hover:shadow-md">
                                Comment
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="ml-6  pl-9 ">
                    <Reply />
                </div>

            </Card>
        </div>
    )
}
