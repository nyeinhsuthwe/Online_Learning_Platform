import { CommentSession } from "./CommentSession";
import { LessonAccordion } from "./LessonAccordion";
import { LessonDetailVd } from "./LessonDetailVd";

export function LessonDetail() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-10 px-4  md:px-8 lg:px-12 ">
            <div className="lg:col-span-2 h-full overflow-hidden">
                <div className="overflow-y-auto -mr-4 pr-4 space-y-6 h-[calc(100vh-64px)]">
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
