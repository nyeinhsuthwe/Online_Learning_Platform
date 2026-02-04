import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function DescriptPeriodSkeleton() {
  return (
    <div className="space-y-6">
      {/* Instructor */}
      <div className="flex items-center justify-between p-5 rounded-xl">
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-6 w-32" />
        </div>

        <Skeleton className="w-16 h-16 rounded-full" />
      </div>

      {/* Info cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-5 rounded-xl">
          <Skeleton className="h-4 w-24 mb-2" />
          <Skeleton className="h-5 w-32" />
        </Card>

        <Card className="p-5 rounded-xl">
          <Skeleton className="h-4 w-24 mb-2" />
          <Skeleton className="h-7 w-20" />
        </Card>

        <Card className="p-5 rounded-xl">
          <Skeleton className="h-4 w-32 mb-2" />
          <Skeleton className="h-5 w-28" />
        </Card>
      </div>
    </div>
  );
}
