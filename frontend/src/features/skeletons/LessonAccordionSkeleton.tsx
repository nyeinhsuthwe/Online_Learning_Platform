import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function LessonAccordionSkeleton() {
  return (
    <div className="space-y-5 animate-pulse">
      {/* Course Header Skeleton */}
      <Card className="p-6 rounded-xl bg-slate-200 dark:bg-slate-800">
        <Skeleton className="h-8 w-2/3 rounded-md" />
        <Skeleton className="h-4 w-40 mt-3 rounded-md" />
      </Card>

      {/* Chapters Skeleton */}
      {[1, 2, 3].map((chapter) => (
        <Card
          key={chapter}
          className="p-4 rounded-lg space-y-4 bg-white dark:bg-slate-900"
        >
          {/* Chapter Title */}
          <div className="flex items-center gap-3">
            <Skeleton className="h-5 w-48 rounded-md" />
            <Skeleton className="h-4 w-1 rounded-md" />
            <Skeleton className="h-4 w-56 rounded-md" />
          </div>

         
        </Card>
      ))}
    </div>
  );
}
