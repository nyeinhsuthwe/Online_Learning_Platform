import { Button } from "@/components/ui/button";
import { useApiQuery } from "@/hooks/useQuery";
import type { Card } from "@/types/type";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom"

export function CourseDescription() {
    const [expanded, setExpanded] = useState(false)
    const { id } = useParams()
    const navigate = useNavigate()
    const { data } = useApiQuery({
        queryKey: ["course"],
        endpoint: `${import.meta.env.VITE_API_URL}/get-course`,
    })

    const course = data?.data?.find((course: Card) => course._id === id)

    const description = course?.description?.trim() || ""
    const canToggle = description.length > 120


    return (
        <div className="space-y-5">
           
                {course ? (
                    <h1 className="text-4xl font-semibold text-text-yellow">
                        {course.title}
                    </h1>
                ) : (
                    <p className="italic text-muted-foreground">Course not found.</p>
                )}

            
            <p className="text-justify text-text-skyblue dark:text-sky-400 text-[16px]">
                <span className={expanded ? "" : "line-clamp-3"}>
                    {course?.description}
                </span>

                {canToggle && (
                    <button
                        onClick={() => setExpanded(!expanded)}
                        className={`inline text-text-skyblue font-medium hover:underline ${expanded ? "ml-1" : ""
                            }`}
                    >
                        {expanded ? "see less" : "see more..."}
                    </button>
                )}
            </p>

            <div className=" grid grid-cols-2 gap-3 ">
                <Button className="bg-primary-dark h-12 text-[16px] text-white rounded-lg hover:bg-primary-hover animate-bounce">Enrolled Now</Button>
                <Button className="bg-text-yellow h-12 text-[16px] rounded-lg text-white hover:bg-yellow-500"> Watch Now</Button>
            </div>
            <Button onClick={() => navigate(-1)} className="border dark:bg-black dark:text-white bg-bg-navbar dark:hover:bg-transparent hover:bg-bg-navbar text-text-secondary border-text-yellow w-full h-12 text-[16px] rounded-lg"> Watch Later</Button>
        </div>
    )
}