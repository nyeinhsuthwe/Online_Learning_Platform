import { CommentSession } from "../comment/CommentSession";
import { LessonAccordion } from "./LessonAccordion";
import { LessonDetailVd } from "./LessonDetailVd";

export function LessonDetail() {
    return (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-10">
            <div className="lg:col-span-2 h-full overflow-hidden">
                <div className="space-y-6 overflow-y-auto -mr-4 pr-4 h-[calc(100vh-64px)]">
                    <LessonDetailVd />
                    <CommentSession />
                </div>
            </div>

            <div className="lg:col-span-1 mt-6 lg:mt-0 ">
                <LessonAccordion />
            </div>
        </div>
    )
}
