import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useApiMutation } from "@/hooks/useMutation";
import { CircleStar } from "lucide-react";
import { toast } from "sonner";

interface ReviewDialogProps {
  courseId?: string;
}

export function ReviewDialog({ courseId }: ReviewDialogProps) {
  const [reviewText, setReviewText] = useState("");

  const reviewMutation = useApiMutation({
    onSuccess: () => {
      toast.success("Your review is submitted successfully!");
      setReviewText("");
    },
    onError: (err: any) => {
      toast.error(err.message || "Something went wrong!");
    },
  });

  const onSubmit = () => {
    if (!courseId) return;

    reviewMutation.mutate({
      endpoint: `${import.meta.env.VITE_API_URL}/create-review/${courseId}`,
      method: "POST",
      body: { comment: reviewText },
    });
  };

  if (!courseId) return null;

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="bg-primary-dark h-11 sm:h-12 text-[14px] sm:text-[16px] hover:bg-primary-hover text-white flex gap-2">
          <CircleStar className="w-5 h-5" />
          Review
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="dark:bg-background bg-sky-100">
        <AlertDialogHeader>
          <AlertDialogTitle className="mb-10 text-center">
            Tell us about your experience!
          </AlertDialogTitle>
          <AlertDialogDescription>
            <Textarea
              className="h-60 bg-white dark:text-white text-gray-700 dark:placeholder:text-white"
              placeholder="Write your experience ..."
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
            />
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel className="bg-red-500 text-white hover:bg-red-600 w-25 h-10">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onSubmit}
            className="bg-blue-500 text-white hover:bg-blue-600 w-25 h-10"
          >
            Submit
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
