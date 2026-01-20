import { useCourse } from "@/common/api";
import { Card } from "@/components/ui/card";
import { useParams } from "react-router-dom";

export function DescriptPeriod() {
    const { id } = useParams();
    const { data } = useCourse();
    const course = data?.data?.find((course) => course._id === id);

    if (!course) {
        return <div>Course not found</div>;
    }

    return (
        <div className="space-y-4">
            <Card className="grid grid-cols-2 sm:grid-cols-2 py-2 px-4 sm:px-7 shadow-[0_-1px_5px_rgba(0,0,0,0.04),0_1px_5px_rgba(0,0,0,0.04)] h-25 shadow-sky-200 items-center">
                <div className="flex flex-col justify-center space-y-1">
                    <span className="text-[14px] text-foreground">Instructor Name</span>
                    <span className="font-semibold text-accent-foreground">John Doe</span>
                </div>
                <div className="flex justify-center sm:justify-end mt-2 sm:mt-0">
                    <img src="/profile.jpg" className="w-20 h-20 rounded-lg" alt="Instructor" />
                </div>
            </Card>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <Card className="py-2 px-4 sm:px-7 sm:h-25 h-20 flex flex-col justify-center items-center gap-1 border-0 shadow border-b-3 border-r-3 border-text-yellow">
                    <span className="text-[14px] text-foreground">Time Period</span>
                    <span className="font-semibold text-accent-foreground">
                        {course.timePeriod ?? "No time period"}
                    </span>
                </Card>

                <Card className="py-2 px-4 sm:px-7 h-20 flex sm:h-25 flex-col justify-center items-center gap-1 border-0 shadow border-b-3 border-l-3 border-green-400">
                    <span className="text-[14px] text-foreground">Course Fee</span>
                    <span className="font-semibold text-[21px] md:text-[20px] lg:text-[20px] text-green-500">
                        {course.price ?? "No Price"} MMK
                    </span>
                </Card>

                <Card className="py-2 px-4 sm:px-7 h-20 sm:h-25 flex flex-col justify-center items-center gap-1 border-0 shadow border-l-3 border-t-3  border-primary-hover">
                    <span className="text-[14px] text-foreground">Course Duration</span>
                    <span className="font-semibold text-accent-foreground">
                        {course.courseDuration ?? "No course duration"}
                    </span>
                </Card>

                
            </div>
        </div>
    );
}
