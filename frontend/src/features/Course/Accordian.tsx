import {
  Accordion,
} from "@/components/ui/accordion"
import { useNavigate, useParams } from "react-router-dom"
import { useChapter} from "@/common/api"
import { useEffect, useState } from "react"
import { ChapterItem } from "../Lesson/ChapterItems"

interface Chapter {
  _id: string
  title: string
}

interface Episode {
  _id: string
  title: string
  description: string
  videoUrl: string
  chapter_id: Chapter
}

export function Accordian() {
  const navigate = useNavigate()
  const { id: courseId } = useParams<{ id: string }>()
  const { data: chaptersResponse } = useChapter(courseId || "")
  
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [episodesByChapter, setEpisodesByChapter] = useState<Record<string, Episode[]>>({})

  useEffect(() => {
    if (chaptersResponse?.data) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setEpisodesByChapter({})
    }
  }, [chaptersResponse])

  if (!chaptersResponse || chaptersResponse.data.length === 0) {
    return (
      <div className="text-center text-gray-400 py-10">
        No lessons available for this course.
      </div>
    )
  }
  
  return (
    <Accordion type="single" collapsible className="w-full">
      {chaptersResponse.data.map((chapter: Chapter) => {
        return (
          <ChapterItem
            key={chapter._id} 
            chapter={chapter} 
            courseId={courseId || ""}
            navigate={navigate}
          />
        )
      })}
    </Accordion>
  )
}

