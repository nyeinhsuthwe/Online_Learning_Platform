import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import type React from 'react'
import { CircleStar } from 'lucide-react'
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { useNavigate } from 'react-router-dom'
import type { Card as typeCard } from '@/types/type'
import { useCourse } from '@/common/api'
import { useState } from "react"
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { EnrollBtn } from './EnrollBtn'
import { CourseGridSkeleton } from '../skeletons/CourseGridSkeleton'


const topicColors = [
    "bg-blue-500 text-white",
    "bg-yellow-500 text-black",
    "bg-green-500 text-white",
    "bg-purple-500 text-white",
]

const CourseCard = (props: React.ComponentProps<typeof Card>) => {
    const [currentPage, setCurrentPage] = useState(1)
    const navigate = useNavigate();
    const { data: courses, isLoading: courseLoading } = useCourse();

    const clickCard = (id: string) => {
        navigate(`/user/course-detail/${id}`)
    }
    if (courseLoading) {
        return <div> <CourseGridSkeleton /></div>
    }

    const ITEMS_PER_PAGE = 6
    const totalCourses = courses?.data.length || 0
    const totalPages = Math.ceil(totalCourses / ITEMS_PER_PAGE)
    const paginatedCourses = courses?.data.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    )

    return (
        <div className="space-y-8">
            <div className="flex flex-col gap-2">
                <h2 className="section-title">All Courses</h2>
                <p className="section-subtitle">Pick a track and start building skills today.</p>
            </div>

            <div className="grid grid-cols-1 items-start justify-items-center gap-6 sm:grid-cols-2 lg:grid-cols-3 [@media(min-width:1024px)_and_(max-width:1140px)]:grid-cols-2">
                {
                    paginatedCourses?.map((course: typeCard) => {
                        const progressPercentage = course.progress ?? 0;
                        console.log(progressPercentage)
                        return (
                            <Card key={course._id} {...props} className="glass-card hover-lift w-full max-w-sm cursor-pointer gap-4 border-0 p-4" onClick={() => { clickCard(course._id) }}>
                                <div className="relative flex justify-center items-center overflow-hidden rounded-2xl">
                                    <img
                                        src={`${import.meta.env.VITE_API_URL.replace("/api", "")}${course.thumbnailUrl}`}
                                        className="h-44 w-full object-cover transition duration-500 hover:scale-105"
                                    />
                                </div>
                                <div className='flex flex-wrap gap-1'>
                                    {course.topics.slice(0, 4).map((topic, index) => (
                                        <Badge
                                            key={topic}
                                            className={`${topicColors[index % topicColors.length]} rounded-full px-2 py-0.5 text-[11px] font-semibold`}
                                        >
                                            {topic}
                                        </Badge>
                                    ))}
                                </div>
                                <p className='text-lg font-semibold text-foreground line-clamp-2'>{course.title}</p>

                                <div className='flex gap-3 text-sm text-muted-foreground'>
                                    <p>{course.chapterCount} Chapters</p>
                                    <p>{course.episodeCount} Episodes</p>
                                </div>

                                <div className='flex items-center gap-2 text-sm font-semibold text-foreground'>
                                    <CircleStar className='text-emerald-500' size={16} />
                                    <p>12 students certified.</p>
                                </div>

                                {/* Updated progress section */}
                                <div>

                                    <Progress value={progressPercentage} />
                                    <p className='mt-3 text-sm text-muted-foreground'>{progressPercentage}% Completed</p>
                                </div>

                                <div className='flex items-center justify-between gap-3'>
                                    <p className='text-sm font-semibold text-primary'>
                                        <span className="font-bold "> {course.enrollCount} learners</span> enrolled.
                                    </p>
                                    <Separator orientation="vertical" className='mx-2 h-6 bg-border/80' />
                                    <EnrollBtn course={course} />
                                </div>
                            </Card>
                        )
                    })
                }
            </div>
            <Pagination className="mt-10 flex justify-center">
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                            className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                        />
                    </PaginationItem>

                    {[...Array(totalPages)].map((_, index) => {
                        const page = index + 1
                        return (
                            <PaginationItem key={page}>
                                <PaginationLink
                                    isActive={page === currentPage}
                                    onClick={() => setCurrentPage(page)}
                                >
                                    {page}
                                </PaginationLink>
                            </PaginationItem>
                        )
                    })}

                    <PaginationItem>
                        <PaginationNext
                            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                            className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    )
}

export default CourseCard
