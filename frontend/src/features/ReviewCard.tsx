import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { Review } from "@/types/type"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export const ReviewCard = ({ review }: { review: Review }) => {
  return (
    <Card className="p-5 h-full flex flex-col gap-3  dark:bg-transparent">
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarImage src={review.user.avatar} />
          <AvatarFallback className="dark:bg-muted bg-green-200">{review.user.name[0]}</AvatarFallback>
        </Avatar>

        <div>
          <p className="font-semibold ">{review.user.name}</p>
        </div>
      </div>

      <Tooltip >
        <TooltipTrigger asChild>
          <p className="text-sm dark:text-green-500 text-green-600 font-bold line-clamp-3">
            {review.comment}
          </p>
        </TooltipTrigger>
        <TooltipContent className="max-w-xs text-justify bg-gray-800 border border-gray-200 dark:bg-white text-gray-50 dark:text-gray-600  text-sm">
          <p className="text-sm">{review.comment}</p>
        </TooltipContent>
      </Tooltip>


      <span className="text-xs ">
        {new Date(review.createdAt).toLocaleDateString()}
      </span>
    </Card>
  )
}
