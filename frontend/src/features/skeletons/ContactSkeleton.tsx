import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function ContactSkeleton() {
  return (
    <Card className="p-6 rounded-md space-y-6 animate-pulse bg-transparent">
      {/* Title */}
      <Skeleton className="h-6 w-52" />

      {/* Name */}
      <div className="space-y-3">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-12 w-full rounded-md" />
      </div>

      {/* Email */}
      <div className="space-y-3">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-12 w-full rounded-md" />
      </div>

      {/* Phone */}
      <div className="space-y-3">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-12 w-full rounded-md" />
      </div>

      {/* Payment Method Skeleton */}
      <div className="space-y-3 pt-4">
        <Skeleton className="h-5 w-40" />
        <Skeleton className="h-12 w-full rounded-md" />
      </div>
    </Card>
  );
}
