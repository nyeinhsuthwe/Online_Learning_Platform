import { useCourse } from "@/common/api";
import { useParams } from "react-router-dom";
import { DescriptPeriodSkeleton } from "../skeletons/DescriptPeriodSkeleton";
import type { Course } from "@/types/type";
import { Clock3, Coins, Timer } from "lucide-react";

export function DescriptPeriod() {
    const { id } = useParams();
    const { data , isLoading } = useCourse();
    const course = data?.data?.find((course :Course ) => course._id === id);

    if (isLoading) {
        return <DescriptPeriodSkeleton />;
    }

    return (
        <div className="space-y-6">
            <div className="rounded-2xl border border-border/60 bg-background/70 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">Instructor</p>
                <div className="mt-3 flex items-center gap-3">
                    <img
                        src="/profile.jpg"
                        className="h-14 w-14 rounded-xl object-cover border border-border/60"
                        alt="Instructor"
                    />
                    <div className="space-y-1">
                        <p className="text-lg font-semibold text-foreground">John Doe</p>
                        <p className="text-sm text-muted-foreground">Course mentor</p>
                    </div>
                </div>
            </div>

            <div className="space-y-3 rounded-2xl border border-border/60 bg-background/65 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">Course Details</p>

                <div className="flex items-center justify-between rounded-xl bg-background/90 px-3 py-2">
                    <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock3 className="h-4 w-4 text-sky-500" />
                        Time Period
                    </div>
                    <p className="text-sm font-semibold text-foreground">{course.timePeriod ?? "No time period"}</p>
                </div>

                <div className="flex items-center justify-between rounded-xl bg-background/90 px-3 py-2">
                    <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                        <Coins className="h-4 w-4 text-emerald-500" />
                        Course Fee
                    </div>
                    <p className="text-sm font-semibold text-foreground">{course.price ?? "No Price"} MMK</p>
                </div>

                <div className="flex items-center justify-between rounded-xl bg-background/90 px-3 py-2">
                    <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                        <Timer className="h-4 w-4 text-amber-500" />
                        Duration
                    </div>
                    <p className="text-sm font-semibold text-foreground">{course.courseDuration ?? "No course duration"}</p>
                </div>
            </div>
        </div>
    );
}
