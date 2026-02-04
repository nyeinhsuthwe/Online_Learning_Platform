import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function SimpleVdSkeleton() {
  return (
    <div className="space-y-4">
      {/* Video Card */}
      <Card className="rounded-md overflow-hidden gap-3 py-0">
        {/* Header */}
        <Skeleton className="h-9 w-full rounded-none" />

        {/* Video placeholder */}
        <div className="p-3 pt-0">
          <Skeleton className="w-full h-50 sm:h-65 md:h-80 rounded-md" />
        </div>
      </Card>

      {/* Reviews skeleton */}
      <div className="space-y-3">
        <Skeleton className="h-5 w-40" />

        <div className="flex gap-3 overflow-hidden">
          <Skeleton className="h-28 w-64 rounded-lg" />
          <Skeleton className="h-28 w-64 rounded-lg" />
          <Skeleton className="h-28 w-64 rounded-lg" />
        </div>
      </div>
    </div>
  );
}
