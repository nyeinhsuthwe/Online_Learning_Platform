import { Input } from "@/components/ui/input";
import { Accordian } from "./Accordian";

export function AboutCourse() {
    return (
        <div className=" space-y-2">
            <div className="grid grid-cols-2">
                <span className="text-[20px] text-text-yellow font-bold ">Course Outline</span>
                <Input type="text" className="h-12" placeholder="Search for lessons" />
            </div>

            <div className="">
                <Accordian />
            </div>
        </div>

    )
}