import { useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { CourseReviews } from "../Review/CarouselReview";
import { useCourse } from "@/common/api";
import { SimpleVdSkeleton } from "../skeletons/SimpleVdSkeleton";


export function SimpleVd() {
  const { id: courseId } = useParams<{ id: string }>();
  const { isLoading } = useCourse();
  
  if (!courseId) {
    return null;
  }
  if (isLoading) {
    return <SimpleVdSkeleton />;
  }

  return (
    <div>
      <Card className="rounded-md overflow-hidden gap-3 py-0 text-white font-semibold text-[14px]">
        <span className="block bg-primary-dark px-3 py-2 rounded-t-md">
          Simple Lesson Video
        </span>

        <div className="p-3 pt-0">
          <video
            src="/simplevd.mp4"
            controls
            className="w-full rounded-md"
          />
        </div>
      </Card>

      <CourseReviews courseId={courseId} />
    </div>
  );
}
