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
      className="glass-card hover-lift group w-full cursor-pointer overflow-hidden border-0 py-0"
    >
      {/* Thumbnail */}
      <div className="relative overflow-hidden">
        <img
          src={`${import.meta.env.VITE_API_URL.replace(
            "/api",
            ""
          )}${course.thumbnailUrl}`}
          alt={course.title}
          className="h-44 w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/45 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
      </div>

      {/* Content */}
      <div className="space-y-3 p-5">
        {/* Topics */}
        <div className="flex flex-wrap gap-1">
          {course.topics.slice(0, 3).map((topic, index) => (
            <Badge
              key={topic}
              className={`${topicColors[index % topicColors.length]} rounded-full px-2 py-0.5 text-[11px] font-semibold`}
            >
              {topic}
            </Badge>
          ))}
        </div>

        {/* Title */}
        <h3 className="line-clamp-2 text-lg font-semibold text-foreground">
          {course.title}
        </h3>

        {/* Meta */}
        <div className="flex gap-4 text-sm text-muted-foreground">
          <span>{course.chapterCount} Chapters</span>
          <span>{course.episodeCount} Episodes</span>
        </div>

        {/* Students */}
        <div className="flex items-center gap-2 text-sm font-medium text-foreground">
          <CircleStar className="h-4 w-4 text-emerald-500" />
          <span>{course.enrollCount} learners enrolled</span>
        </div>
      </div>
    </Card>
  )
}
