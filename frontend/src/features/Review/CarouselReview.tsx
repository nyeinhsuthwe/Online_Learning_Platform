import type { Review } from "@/types/type"
import { ReviewSummary } from "./ReviewSummary"
import { ReviewCarousel } from "./ReviewCarousel"
import { useGetReviewList } from "@/common/api"

interface CourseReviewsProps {
    courseId: string
}

export const CourseReviews = ({ courseId }: CourseReviewsProps) => {
    const { data, error } = useGetReviewList(courseId)
    const totalReviews = data?.totalReviews || 0;
    const reviews: Review[] = data?.data || [];

    if (error) return <p className="text-red-500">Failed to load reviews</p>

    return (
        <div className="mt-10 ">
            {totalReviews === 0 ? (
                <p className="text-muted-foreground"></p>
            ) : (
                <div>
                    <h2 className="text-xl font-semibold mb-2">Student Reviews</h2>

                    <ReviewSummary totalReviews={totalReviews} />
                    <ReviewCarousel reviews={reviews} />

                </div>
            )}
        </div>
    )
}
