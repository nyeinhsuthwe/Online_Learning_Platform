import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

/* =========================
   Hero Section Skeleton
========================= */
export function HeroSectionSkeleton() {
  return (
    <section className="bg-muted/40 rounded-md shadow">
      <div className="mx-auto max-w-7xl px-10 py-24 grid lg:grid-cols-2 gap-14 items-center">
        <div className="space-y-6">
          <Skeleton className="h-12 w-3/4" />
          <Skeleton className="h-6 w-2/3" />
          <Skeleton className="h-12 w-40 rounded-md" />
        </div>

        <div className="hidden lg:block">
          <Skeleton className="h-64 w-full rounded-lg" />
        </div>
      </div>
    </section>
  )
}

/* =========================
   CTA Section Skeleton
========================= */
export function CTASectionSkeleton() {
  return (
    <section className="bg-muted/40 rounded-md">
      <div className="mx-auto max-w-7xl px-6 py-24 text-center space-y-6">
        <Skeleton className="h-8 w-64 mx-auto" />
        <Skeleton className="h-5 w-80 mx-auto" />
        <Skeleton className="h-12 w-40 mx-auto rounded-md" />
      </div>
    </section>
  )
}

/* =========================
   Featured Course Card Skeleton
========================= */
function FeaturedCourseCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <Skeleton className="h-44 w-full" />

      <div className="p-4 space-y-3">
        <div className="flex gap-2">
          <Skeleton className="h-5 w-14 rounded-full" />
          <Skeleton className="h-5 w-16 rounded-full" />
          <Skeleton className="h-5 w-12 rounded-full" />
        </div>

        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-4/5" />

        <div className="flex gap-4">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-24" />
        </div>

        <Skeleton className="h-4 w-40" />
      </div>
    </Card>
  )
}

/* =========================
   Featured Courses Skeleton
========================= */
export function FeaturedCoursesSkeleton() {
  return (
    <section className="mx-auto max-w-7xl px-6 space-y-10">
      <div className="flex items-center justify-between">
        <Skeleton className="h-7 w-48" />
        <Skeleton className="h-5 w-20" />
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <FeaturedCourseCardSkeleton key={i} />
        ))}
      </div>
    </section>
  )
}

/* =========================
   How It Works Skeleton
========================= */
export function HowItWorksSkeleton() {
  return (
    <section className="mx-auto max-w-7xl px-6 space-y-12">
      <Skeleton className="h-8 w-48 mx-auto" />

      <div className="grid sm:grid-cols-3 gap-8">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="rounded-2xl border p-6 text-center space-y-4"
          >
            <Skeleton className="h-12 w-12 rounded-full mx-auto" />
            <Skeleton className="h-5 w-32 mx-auto" />
            <Skeleton className="h-4 w-40 mx-auto" />
          </div>
        ))}
      </div>
    </section>
  )
}

/* =========================
   Why Choose Us Skeleton
========================= */
export function WhyChooseUsSkeleton() {
  return (
    <section className="bg-muted/40 rounded-md">
      <div className="mx-auto max-w-7xl px-6 py-10 space-y-12">
        <Skeleton className="h-8 w-56 mx-auto" />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="rounded-2xl border bg-card p-6 text-center space-y-4"
            >
              <Skeleton className="h-12 w-12 rounded-full mx-auto" />
              <Skeleton className="h-5 w-32 mx-auto" />
              <Skeleton className="h-4 w-40 mx-auto" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* =========================
   Full Page Skeleton (Optional)
========================= */
export function HomePageSkeleton() {
  return (
    <div className="space-y-20">
      <HeroSectionSkeleton />
      <FeaturedCoursesSkeleton />
      <HowItWorksSkeleton />
      <WhyChooseUsSkeleton />
      <CTASectionSkeleton />
    </div>
  )
}
