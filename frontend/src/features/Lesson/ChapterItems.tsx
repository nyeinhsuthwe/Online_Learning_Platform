import { useEpisode } from "@/common/api"
import { Card } from "@/components/ui/card"
import { AccordionContent, AccordionItem, AccordionTrigger } from "../../components/ui/accordion"
import { Lock, Play } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useEpisodeStore } from "@/store/episode"

interface Chapter {
    _id: string
    title: string
}

interface ChapterItemProps {
    chapter: Chapter
    courseId: string
    locked: boolean
}

interface Episode {
    _id: string
    title: string
    description: string
    videoUrl: string
    chapter_id: string
}

export function ChapterItem({ chapter, courseId, locked }: ChapterItemProps) {
    const { data: episodesResponse } = useEpisode(chapter._id || "")
    const setEpisode = useEpisodeStore((state) => state.setEpisode)
    const navigate = useNavigate()
    const episodes: Episode[] = episodesResponse?.data || []

    return (
        <AccordionItem value={chapter._id}>
            <AccordionTrigger className="text-[18px] text-gray-600 dark:text-white">
                <div className="flex justify-between items-center w-full">
                    <span>{chapter.title}</span>
                    <span className="text-[15px]">{episodes.length} lessons</span>
                </div>
            </AccordionTrigger>

            <AccordionContent className="flex flex-col gap-3">
                {episodes.map((ep: Episode, index: number) => (
                    <Card
                        key={ep._id}
                        className={`p-3 transition ${locked
                                ? "cursor-not-allowed opacity-60"
                                : "cursor-pointer hover:shadow-md"
                            }`}
                        onClick={() => {
                            if (locked) return;

                            setEpisode(ep);
                            navigate(`/user/lesson-detail/${courseId}/${ep._id}`);
                        }}
                    >
                        <div className="flex justify-between items-center w-full">
                            <div className="flex gap-3 items-center">
                                <span className="w-9 h-9 bg-sky-500 text-white font-bold flex items-center justify-center rounded">
                                    {index + 1}
                                </span>
                                <span className="font-semibold text-gray-600 dark:text-white hover:text-sky-600">{ep.title}</span>
                            </div>

                            <span
                                className={`w-11 h-9 flex items-center justify-center rounded ${locked ? "bg-gray-400" : "bg-primary-dark"
                                    }`}
                            >
                                {locked ? <Lock size={18} /> : <Play size={18} />}
                            </span>
                        </div>
                    </Card>
                ))}
            </AccordionContent>
        </AccordionItem>
    )
}