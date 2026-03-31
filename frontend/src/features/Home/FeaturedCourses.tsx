import { useCourse } from "@/common/api"
import { FeaturedCourseCard } from "./FeaturedCourseCard"
import { useNavigate } from "react-router-dom"
import type { Course  } from "@/types/type"

export function FeaturedCourses() {
    const { data: courses, isLoading } = useCourse()
    const navigate = useNavigate()

  if (isLoading) {
    return <div className="text-center">Loading...</div>
  }

  return (
    <section className="mx-auto max-w-7xl space-y-10 px-2 sm:px-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-2">
          <h2 className="section-title">Featured Courses</h2>
          <p className="section-subtitle">Curated picks to help you level up quickly.</p>
        </div>

        <button
          onClick={() => navigate('/user/course')}
          className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition hover:text-primary/80"
        >
          View All
        </button>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {courses?.data.slice(0, 3).map((course : Course) => (
          <FeaturedCourseCard
            key={course._id}
            course={course}
          />
        ))}
      </div>
    </section>
  )
}
