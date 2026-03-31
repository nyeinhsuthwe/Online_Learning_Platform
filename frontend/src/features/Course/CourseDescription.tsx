import { useCourse } from "@/common/api";
import { Button } from "@/components/ui/button";
import type { Card } from "@/types/type";
import { useState } from "react";
import { BookOpen, Clock3, GraduationCap, Sparkles } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom"
import { EnrollBtn } from "./EnrollBtn";
import { CourseDescriptionSkeleton } from "../skeletons/CourseDescriptionSkeleton";

export function CourseDescription() {
    const [expanded, setExpanded] = useState(false)
    const { id } = useParams()
    const navigate = useNavigate()
    const { data, isLoading } = useCourse()
    const course = data?.data?.find((course: Card) => course._id === id)
    const description = course?.description?.trim() || ""
    const canToggle = description.length > 120


    if (isLoading) {
        return <CourseDescriptionSkeleton />;
    }

    return (
        <section className="space-y-7">
            <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-primary">
                    <Sparkles className="h-3.5 w-3.5" />
                    New Learning Path
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/80 px-3 py-1 text-xs font-medium text-muted-foreground">
                    <GraduationCap className="h-3.5 w-3.5 text-emerald-500" />
                    Project-ready skills
                </span>
            </div>

            <div className="space-y-4">
                <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                    {course.title}
                </h1>
                <p className="max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base md:text-lg">
                    <span className={expanded ? "" : "line-clamp-3"}>
                        {course?.description || "There is no description!"}
                    </span>

                    {canToggle && (
                        <button
                            onClick={() => setExpanded(!expanded)}
                            className="ml-1 inline font-medium text-primary hover:underline"
                        >
                            {expanded ? "See less" : "See more"}
                        </button>
                    )}
                </p>
            </div>

            <div className="grid grid-cols-1 gap-4 rounded-2xl border border-border/60 bg-background/70 p-4 text-sm text-muted-foreground sm:grid-cols-3">
                <div className="inline-flex items-center gap-2">
                    <Clock3 className="h-4 w-4 text-primary" />
                    Self-paced schedule
                </div>
                <div className="inline-flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-primary" />
                    Step-by-step modules
                </div>
                <div className="inline-flex items-center gap-2">
                    <GraduationCap className="h-4 w-4 text-primary" />
                    Practical outcomes
                </div>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <EnrollBtn course={course} />
                <Button
                    onClick={() => navigate(-1)}
                    variant="outline"
                    className="h-12 w-full rounded-2xl border-border/70 bg-background/75 text-[14px] text-foreground shadow-sm hover:bg-accent sm:text-[16px]"
                >
                    Watch Later
                </Button>
            </div>
        </section>
    )
}
