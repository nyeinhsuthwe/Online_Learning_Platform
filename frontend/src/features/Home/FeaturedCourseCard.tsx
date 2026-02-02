import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CircleStar } from "lucide-react"
import { useNavigate } from "react-router-dom"
import type { Card as Course } from "@/types/type"

const topicColors = [
  "bg-blue-500 text-white",
  "bg-yellow-500 text-black",
  "bg-green-500 text-white",
  "bg-purple-500 text-white",
]

interface Props {
  course: Course
}

export function FeaturedCourseCard({ course }: Props) {
  const navigate = useNavigate()

  return (
    <Card
      onClick={() => navigate(`/user/course-detail/${course._id}`)}
      className="
        w-full cursor-pointer overflow-hidden
        transition-all duration-300 py-0
        hover:-translate-y-1 hover:shadow-lg
      "
    >
      {/* Thumbnail */}
      <div className="relative">
        <img
          src={`${import.meta.env.VITE_API_URL.replace(
            "/api",
            ""
          )}${course.thumbnailUrl}`}
          alt={course.title}
          className="h-44 w-100 object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Topics */}
        <div className="flex flex-wrap gap-1">
          {course.topics.slice(0, 3).map((topic, index) => (
            <Badge
              key={topic}
              className={topicColors[index % topicColors.length]}
            >
              {topic}
            </Badge>
          ))}
        </div>

        {/* Title */}
        <h3 className="line-clamp-2 text-lg font-semibold">
          {course.title}
        </h3>

        {/* Meta */}
        <div className="flex text-sm text-muted-foreground gap-4">
          <span>{course.chapterCount} Chapters</span>
          <span>{course.episodeCount} Episodes</span>
        </div>

        {/* Students */}
        <div className="flex items-center gap-2 text-sm font-medium">
          <CircleStar className="h-4 w-4 text-green-600" />
          <span>{course.enrollCount} students enrolled</span>
        </div>
      </div>
    </Card>
  )
}
