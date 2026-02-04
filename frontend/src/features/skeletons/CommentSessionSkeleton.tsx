import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ReplySkeleton } from "./ReplySkeleton";

export function CommentSessionSkeleton() {
  return (
    <Card className="p-4 sm:p-6 md:p-8 space-y-6 animate-pulse bg-slate-200 dark:bg-slate-900">
      {/* Title */}
      <div className="text-center space-y-2">
        <Skeleton className="h-7 w-64 mx-auto" />
        <Skeleton className="h-4 w-80 mx-auto" />
      </div>

      {/* Comment Box */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Avatar */}
        <Skeleton className="w-12 h-12 sm:w-14 sm:h-14 rounded-full mx-auto sm:mx-0" />

        <div className="flex-1 space-y-3">
          {/* Textarea */}
          <Skeleton className="h-32 sm:h-40 w-full rounded-md" />

          {/* Footer */}
          <div className="flex flex-col sm:flex-row justify-between gap-3">
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-4 rounded-sm" />
              <Skeleton className="h-4 w-56" />
            </div>

            <Skeleton className="h-10 sm:h-12 w-full sm:w-40 rounded-lg" />
          </div>
        </div>
      </div>

      {/* Replies */}
      <div className="ml-6 pl-9 space-y-4">
        <ReplySkeleton />
        <ReplySkeleton />
      </div>
    </Card>
  );
}
