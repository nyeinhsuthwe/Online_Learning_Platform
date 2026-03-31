import { useGetCourseById } from "@/common/api"
import { Card } from "@/components/ui/card"
import { FaStar } from "react-icons/fa";
import { useParams } from "react-router-dom"

export function PaymentDetail() {
    const { id } = useParams()
    const { data: course, isLoading } = useGetCourseById(id || "")

    const courseData = course?.data

    if (isLoading) {
        return (
            <Card className="w-full p-6 flex justify-center items-center">
                <p className="text-gray-500">Loading payment details...</p>
            </Card>
        )
    }

    return (
        <Card className="glass-card w-full max-w-lg mx-auto p-6">
            {/* Thumbnail */}
            <div className="w-full h-56 overflow-hidden rounded-2xl mb-6">
                <img
                    className="w-full h-full object-cover"
                    src={`${import.meta.env.VITE_API_URL.replace(
                        "/api",
                        ""
                    )}${courseData?.thumbnailUrl}`}
                    alt={courseData?.title}
                />
            </div>

            {/* Course Info */}
            <div className="space-y-3">
                <h2 className="text-2xl font-semibold text-foreground">
                    {courseData?.title}
                </h2>

                <p className="text-sm text-muted-foreground line-clamp-3">
                    {courseData?.description || "There is no description"}
                </p>
            </div>

            {/* Divider */}
            <div className="border-t my-3" />

            {/* Price Summary */}
            <div className="flex items-center justify-between">
                <span className="text-xl font-semibold text-foreground">Course Price</span>
                <span className="text-2xl font-bold text-emerald-500">
                    {courseData?.price} MMK
                </span>
            </div>

            <div className="flex flex-col gap-3 mt-3">
                <span className="text-xl text-emerald-500 font-semibold">
                   LifeTime Provided Services
                </span>
                <span className="font-semibold flex gap-2 items-center text-foreground">
                   <FaStar className="text-amber-500"/> LifeTime Update Access
                </span>
                <span className="font-semibold flex gap-2 items-center text-foreground">
                   <FaStar className="text-amber-500"/> One By One Meeting
                </span>
                <span className="font-semibold flex gap-2 items-center text-foreground">
                   <FaStar className="text-amber-500"/> Unlimited Download
                </span>
            </div>
        </Card>
    )
}
