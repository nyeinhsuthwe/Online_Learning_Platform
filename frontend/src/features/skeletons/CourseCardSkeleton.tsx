import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

export function CourseCardSkeleton() {
  return (
    <Card className="h-150 w-90 px-4 py-4 gap-4 shadow-sky-200">
      {/* Thumbnail */}
      <Skeleton className="h-40 w-full rounded-lg" />

      {/* Topic badges */}
      <div className="flex gap-1 mt-2">
        <Skeleton className="h-5 w-16 rounded-full" />
        <Skeleton className="h-5 w-14 rounded-full" />
        <Skeleton className="h-5 w-12 rounded-full" />
      </div>

      {/* Title */}
      <Skeleton className="h-6 w-3/4 mt-3" />

      {/* Chapters / Episodes */}
      <div className="flex gap-3 mt-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-24" />
      </div>

      {/* Rating */}
      <Skeleton className="h-4 w-40 mt-2" />

      {/* Progress */}
      <div className="mt-3">
        <Skeleton className="h-4 w-24 mb-2" />
        <Skeleton className="h-2 w-full rounded-full" />
      </div>

      {/* Enroll row */}
      <div className="flex items-center mt-4">
        <Skeleton className="h-4 w-28" />
        <Separator orientation="vertical" className="mx-3" />
        <Skeleton className="h-9 w-24 rounded-lg" />
      </div>
    </Card>
  );
}
