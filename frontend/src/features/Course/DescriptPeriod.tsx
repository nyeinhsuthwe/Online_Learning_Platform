import { useCourse } from "@/common/api";
import { Card } from "@/components/ui/card";
import { useParams } from "react-router-dom";

export function DescriptPeriod() {
    const { id } = useParams();
    const { data } = useCourse();
    const course = data?.data?.find((course) => course._id === id);

    if (!course) {
        return <div className="text-center text-muted-foreground">Course not found</div>;
    }

    return (
        <div className="space-y-6 ">
            <div className="flex items-center justify-between p-5 rounded-xl transition">
                <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Instructor</p>
                    <p className="text-lg font-semibold">John Doe</p>
                </div>

                <img
                    src="/profile.jpg"
                    className="w-16 h-16 rounded-full object-cover border"
                    alt="Instructor"
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Card className="p-5 rounded-xl bg-linear-to-br dark:from-blue-950 dark:to-blue-900 dark:ring-blue-800  from-blue-50 to-blue-100 ring-1 ring-blue-200 shadow-sm hover:shadow-md transition">
                    <p className="text-sm text-blue-600 dark:text-blue-400">Time Period</p>
                    <p className="font-semibold text-base text-blue-900 dark:text-blue-100 mt-1">
                        {course.timePeriod ?? "No time period"}
                    </p>
                </Card>

                <Card className="p-5 rounded-xl bg-linear-to-br  dark:from-green-950 dark:ring-green-800 dark:to-green-900 from-green-50  to-green-100 ring-1 ring-green-200 shadow-sm hover:shadow-md transition">
                    <p className="text-sm dark:text-green-400 text-green-600 ">Course Fee</p>
                    <p className="font-bold text-xl text-green-700 dark:text-green-300 mt-1">
                        {course.price ?? "No Price"} MMK
                    </p>
                </Card>

                <Card className="p-5 rounded-xl  dark:from-purple-950 dark:to-purple-900 dark:ring-purple-800 bg-linear-to-br from-purple-50 to-purple-100 ring-1 ring-purple-200 shadow-sm hover:shadow-md transition">
                    <p className="text-sm dark:text-purple-400 text-purple-600">Course Duration</p>
                    <p className="font-semibold text-base dark:text-purple-100 text-purple-900 mt-1">
                        {course.courseDuration ?? "No course duration"}
                    </p>
                </Card>
            </div>

        </div>
    );
}
