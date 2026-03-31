import { useParams } from "react-router-dom";
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
    <div className="space-y-4 p-5 md:p-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">Preview Lesson</p>
        <h2 className="mt-1 text-2xl font-semibold tracking-tight text-foreground">Watch before you enroll</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Get a quick feel for the teaching style and lesson pacing.
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border/60 p-2 shadow-sm">
        <video
          src="/simplevd.mp4"
          autoPlay
          muted
          playsInline
          controls
          className="aspect-video w-full rounded-xl bg-black object-cover"
        />
      </div>
    </div>
  );
}
