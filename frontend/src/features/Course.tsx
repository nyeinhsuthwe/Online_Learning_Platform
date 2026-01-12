import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import type React from 'react'
import Navigation from './NavigationMenu'
import { CircleStar } from 'lucide-react'
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'
import type { Card as typeCard } from '@/types/type'
import { useCourse } from '@/common/api'

const topicColors = [
    "bg-blue-500 text-white",
    "bg-yellow-500 text-black",
    "bg-green-500 text-white",
    "bg-purple-500 text-white",
]

const CourseCard = (props: React.ComponentProps<typeof Card>) => {

    const navigate = useNavigate();
    const { data: courses } = useCourse();
    const clickCard = (id: string) => {
        navigate(`/user/course-detail/${id}`)
    }


    return (
        <div className="grid space-y-5 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 md:gap-6 lg:grid-cols-3  [@media(min-width:1024px)_and_(max-width:1140px)]:grid-cols-2 [@media(min-width:1024px)_and_(max-width:1145px)]:gap-10 items-start justify-items-center">
            {
            courses?.data.map((course: typeCard) => (
                <Card key={course._id} {...props} className="h-150 w-90 px-4 py-4 gap-4  hover:shadow-[0_4px_12px_rgba(0,0,0,0.03),0_-4px_12px_rgba(0,0,0,0.03)] shadow-sky-200" onClick={() => { clickCard(course._id) }}>
                    <div className="flex justify-center items-center">
                        <img
                            src={`${import.meta.env.VITE_API_URL.replace("/api", "")}${course.thumbnailUrl}`}
                            className="h-70 w-100 rounded-lg mx-auto "
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

                    <Navigation courseId={course._id} />

                    <div className='flex gap-1 font-semibold'>
                        <CircleStar className=' text-green-600 ' size={16} />
                        <p className='text-sm  text-red-600 '> 12 students certificated.</p>
                    </div>

                    <div>
                        <p className='mb-3'>20% Completed</p>
                        <Progress value={33} />
                    </div>

                    <div className='flex'>
                        <p className='text-sm  text-center rounded-lg text-purple-500 py-2  font-semibold'>
                            <span className="font-bold "> 19 students</span> enrolled.
                        </p>
                        <Separator orientation="vertical" className='mx-3  bg-gray-500' />
                        <Button className='bg-blue-600 hover:bg-blue-500'>Enroll Now</Button>
                    </div>
                </Card>
            ))
        }
        </div>


    )
}

export default CourseCard