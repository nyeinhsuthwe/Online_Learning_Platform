import { Skeleton } from "@/components/ui/skeleton"

export function EditAccSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      {/* Avatar */}
      <div className="flex flex-col gap-2 items-center">
        <Skeleton className="w-24 h-24 rounded-full" />
        <Skeleton className="w-32 h-10 rounded-md" />
      </div>

      {/* Name */}
      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-12 w-full" />
      </div>

      {/* Email */}
      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-12 w-full" />
      </div>

      {/* Phone */}
      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-12 w-full" />
      </div>

      {/* Bio */}
      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-12 w-full" />
      </div>

      {/* Save button */}
      <div className="flex flex-col items-end">
        <Skeleton className="w-60 h-12 rounded-md" />
      </div>
    </div>
  )
}
