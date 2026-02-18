import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import type React from 'react'
import { CircleStar } from 'lucide-react'
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { useNavigate } from 'react-router-dom'
import type { Card as typeCard } from '@/types/type'
import { useCourse} from '@/common/api'
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
        <>
            <div className="grid space-y-5 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 md:gap-6 lg:grid-cols-3  [@media(min-width:1024px)_and_(max-width:1140px)]:grid-cols-2 [@media(min-width:1024px)_and_(max-width:1145px)]:gap-10 items-start justify-items-center">
                {
                    paginatedCourses?.map((course: typeCard) => {
                        const progressPercentage = course.episodeCount
                            ? Math.round((course.watchedEpisodesCount || 0) / course.episodeCount * 100)
                            : 0;

                        return (
                            <Card key={course._id} {...props} className="h-150 w-90 px-4 py-4 gap-4  hover:shadow-[0_4px_12px_rgba(0,0,0,0.03),0_-4px_12px_rgba(0,0,0,0.03)] shadow-sky-200" onClick={() => { clickCard(course._id) }}>
                                <div className="flex justify-center items-center">
                                    <img
                                        src={`${import.meta.env.VITE_API_URL.replace("/api", "")}${course.thumbnailUrl}`}
                                        className="h-70 w-100 rounded-lg mx-auto object-cover"
                                    />
                                </div>
                                <div className='flex gap-1'>
                                    {course.topics.map((topic, index) => (
                                        <Badge
                                            key={topic}
                                            className={topicColors[index % topicColors.length]}
                                        >
                                            {topic}
                                        </Badge>
                                    ))}
                                </div>
                                <p className='text-lg font-semibold text-foreground'>{course.title}</p>

                                <div className='flex gap-3'>
                                    <p>{course.chapterCount} Chapters</p>
                                    <p>{course.episodeCount} Episodes</p>
                                </div>

                                <div className='flex gap-1 font-semibold'>
                                    <CircleStar className=' text-green-600 ' size={16} />
                                    <p className='text-sm  text-red-600 '> 12 students certificated.</p>
                                </div>

                                {/* Updated progress section */}
                                <div>
                                    <p className='mb-3'>{progressPercentage}% Completed</p>
                                    <Progress value={progressPercentage} />
                                </div>

                                <div className='flex'>
                                    <p className='text-sm  text-center rounded-lg text-purple-500 py-2  font-semibold'>
                                        <span className="font-bold "> {course.enrollCount} students</span> enrolled.
                                    </p>
                                    <Separator orientation="vertical" className='mx-3  bg-gray-500' />
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
        </>
    )
}

export default CourseCard
