import { FaStar } from "react-icons/fa"

export const ReviewSummary = ({ totalReviews }: { totalReviews: number }) => {

  return (
    <div className="flex items-center gap-4 mb-6">
      <span className="text-sm flex gap-2 text-muted-foreground">
        <FaStar className="text-yellow-500"/>{totalReviews} review{totalReviews !== 1 ? "s" : ""}
      </span>
    </div>
  )
}
