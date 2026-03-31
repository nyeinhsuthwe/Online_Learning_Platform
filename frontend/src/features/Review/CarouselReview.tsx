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
        <div className="space-y-5 p-5 md:p-6">
            {totalReviews === 0 ? (
                <p className="text-sm text-muted-foreground">No reviews yet.</p>
            ) : (
                <div className="space-y-4">
                    <div className="space-y-2 border-b border-border/60 pb-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">Community Feedback</p>
                        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Student Reviews</h2>
                        <p className="text-sm text-muted-foreground">Real comments from learners who took this course.</p>
                    </div>

                    <ReviewSummary totalReviews={totalReviews} />
                    <ReviewCarousel reviews={reviews} />
                </div>
            )}
        </div>
    )
}
