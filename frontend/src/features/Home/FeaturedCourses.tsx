import { useCourse } from "@/common/api"
import { FeaturedCourseCard } from "./FeaturedCourseCard"
import { useNavigate } from "react-router-dom"

export function FeaturedCourses() {
    const { data: courses, isLoading } = useCourse()
    const navigate = useNavigate()

  if (isLoading) {
    return <div className="text-center">Loading...</div>
  }

  return (
    <section className="mx-auto max-w-7xl px-6 space-y-10">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold tracking-tight">
          Featured Courses
        </h2>

        <a
         onClick={()=>navigate('/user/course')}
          className="text-primary font-medium"
        >
          View All
        </a>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses?.data.slice(0, 3).map((course) => (
          <FeaturedCourseCard
            key={course._id}
            course={course}
          />
        ))}
      </div>
    </section>
  )
}
