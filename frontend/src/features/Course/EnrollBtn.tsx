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
                return { text: "Enrolled", colorClass: "bg-emerald-500 hover:bg-emerald-600" };
            case "pending":
                return { text: "Pending", colorClass: "bg-amber-500 hover:bg-amber-600" };
            default:
                return { text: "Enroll Now", colorClass: "bg-gradient-to-r from-sky-600 to-cyan-500 hover:from-sky-500 hover:to-cyan-400" };
        }
    })();

    return (
        <div className="w-full">
            <Button type='submit'
                className={`h-12 w-full cursor-pointer rounded-2xl text-[14px] text-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md sm:text-[16px] ${colorClass}`}
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
