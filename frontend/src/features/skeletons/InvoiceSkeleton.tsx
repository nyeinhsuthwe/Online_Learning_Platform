import { Skeleton } from "@/components/ui/skeleton"

export function InvoiceSkeleton({ rows = 6 }: { rows?: number }) {
  return (
    <div className="rounded-xl border bg-background">
      <div className="p-4">
        {/* Table header */}
        <div className="grid grid-cols-5 gap-4 mb-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-4 w-full" />
          ))}
        </div>

        {/* Table rows */}
        <div className="space-y-3">
          {Array.from({ length: rows }).map((_, i) => (
            <Skeleton key={i} className="h-10 w-full rounded-md" />
          ))}
        </div>
      </div>
    </div>
  )
}
