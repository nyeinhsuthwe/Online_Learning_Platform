import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function ReplySkeleton() {
  return (
    <Card className="p-4 space-y-3 animate-pulse">
      <div className="flex gap-3 items-start">
        {/* Avatar */}
        <Skeleton className="h-10 w-10 rounded-full" />

        <div className="flex-1 space-y-2">
          {/* Username */}
          <Skeleton className="h-4 w-32" />

          {/* Comment content */}
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />

          {/* Actions */}
          <div className="flex gap-4 mt-2">
            <Skeleton className="h-3 w-12" />
            <Skeleton className="h-3 w-16" />
          </div>
        </div>
      </div>
    </Card>
  );
}
