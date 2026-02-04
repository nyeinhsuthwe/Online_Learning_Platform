import { Skeleton } from "@/components/ui/skeleton";

export function CourseDescriptionSkeleton() {
  return (
    <div className="space-y-5">
      <Skeleton className="h-10 w-3/4" />

      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Skeleton className="h-12 w-full rounded-lg" />
        <Skeleton className="h-12 w-full rounded-lg" />
      </div>
    </div>
  );
}
