import { CommentSession } from "./CommentSession";
import { LessonAccordion } from "./LessonAccordion";
import { LessonDetailVd } from "./LessonDetailVd";

export function LessonDetail() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-10 px-4 sm:px-6 md:px-8 lg:px-12">
            <div className="grid grid-cols-1 lg:col-span-2 space-y-6 lg:space-y-8">
                <LessonDetailVd />
                <CommentSession />
            </div>

            <div className="lg:col-span-1 mt-6 lg:mt-0">
                <LessonAccordion />
            </div>
        </div>
    )
}
