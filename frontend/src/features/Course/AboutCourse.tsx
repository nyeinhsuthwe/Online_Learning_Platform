import { Input } from "@/components/ui/input";
import { Accordian } from "./Accordian";

export function AboutCourse() {
    return (
        <div className="space-y-4 px-2 sm:px-4 md:px-6 lg:px-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 items-center">
                <span className="text-lg sm:text-xl md:text-2xl font-bold text-text-yellow">
                    Course Outline
                </span>
                <Input
                    type="text"
                    className="h-12 w-full"
                    placeholder="Search for lessons"
                />
            </div>

            <div className="">
                <Accordian />
            </div>
        </div>
    )
}
