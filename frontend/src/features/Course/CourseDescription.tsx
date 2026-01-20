import { useCourse } from "@/common/api";
import { Button } from "@/components/ui/button";
import type { Card } from "@/types/type";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom"

export function CourseDescription() {
    const [expanded, setExpanded] = useState(false)
    const { id } = useParams()
    const navigate = useNavigate()
    const { data } = useCourse()

    const course = data?.data?.find((course: Card) => course._id === id)

    const description = course?.description?.trim() || ""
    const canToggle = description.length > 120

    return (
        <div className="space-y-5 ">
           
            {course ? (
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-text-yellow">
                    {course.title}
                </h1>
            ) : (
                <p className="italic text-muted-foreground text-base sm:text-lg">Course not found.</p>
            )}

            <p className="text-justify text-text-skyblue dark:text-sky-400 text-sm sm:text-base md:text-lg">
                <span className={expanded ? "" : "line-clamp-3"}>
                    {course?.description}
                </span>

                {canToggle && (
                    <button
                        onClick={() => setExpanded(!expanded)}
                        className={`inline text-text-skyblue font-medium hover:underline ml-1`}
                    >
                        {expanded ? "see less" : "see more..."}
                    </button>
                )}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Button onClick={()=> navigate(`/user/enroll/${course._id}`) } className="bg-primary-dark h-12 sm:h-12 text-[14px] sm:text-[16px] text-white rounded-lg hover:bg-primary-hover animate-bounce w-full">
                    Enrolled Now
                </Button>
                <Button className="bg-text-yellow h-12 sm:h-12 text-[14px] sm:text-[16px] rounded-lg text-white hover:bg-yellow-500 w-full">
                    Watch Now
                </Button>
            </div>

            <Button
                onClick={() => navigate(-1)}
                className="border z-0 dark:bg-black dark:text-white bg-bg-navbar dark:hover:bg-transparent hover:bg-bg-navbar text-text-secondary border-text-yellow w-full h-12 text-[14px] sm:text-[16px] rounded-lg"
            >
                Watch Later
            </Button>
        </div>
    )
}
