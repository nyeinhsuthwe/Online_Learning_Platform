import { useEnrollList } from "@/common/api";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/store/user";
import type { Card, Enroll } from "@/types/type";
import { useNavigate } from "react-router-dom";

export function EnrollBtn({ course }: { course: Card }) {
    const navigate = useNavigate();
    const { data: enroll } = useEnrollList()
    const { user } = useUserStore()
    const userId = user?._id;

    const enrollRecord = enroll?.data?.find(
        (e: Enroll) =>
            e.course_id.toString() === course._id.toString() &&
            e.user_id.toString() === userId
    );

    const { text: buttonText, colorClass } = (() => {
        switch (enrollRecord?.paymentStatus) {
            case "paid":
                return { text: "Enrolled", colorClass: "bg-green-600  hover:bg-green-500" };
            case "pending":
                return { text: "Pending", colorClass: "bg-yellow-500 hover:bg-yellow-600" };
            default:
                return { text: "Enroll Now", colorClass: "bg-blue-600 hover:bg-blue-500" };
        }
    })();

    return (
        <div className="w-full">
            <Button type='submit'
                className={`bg-blue-600 text-white sm:h-12 text-[14px] sm:text-[16px] hover:bg-blue-500 h-12 w-full cursor-pointer ${colorClass}`}
                onClick={(e) => {
                    e.stopPropagation();
                    if (buttonText === "Enroll Now") {
                        navigate(`/user/enroll/${course._id}`);
                    }
                }}

            >
                {buttonText}
            </Button>
        </div>
    )
}