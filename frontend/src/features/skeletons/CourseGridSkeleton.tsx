import { CourseCardSkeleton } from "./CourseCardSkeleton";

export function CourseGridSkeleton() {
  return (
    <div className="grid space-y-5 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 md:gap-6 lg:grid-cols-3
      [@media(min-width:1024px)_and_(max-width:1140px)]:grid-cols-2
      [@media(min-width:1024px)_and_(max-width:1145px)]:gap-10
      items-start justify-items-center"
    >
      {Array.from({ length: 6 }).map((_, i) => (
        <CourseCardSkeleton key={i} />
      ))}
    </div>
  );
}
