import { CommentSession } from "./CommentSession";
import { LessonAccordion } from "./LessonAccordion";
import { LessonDetailVd } from "./LessonDetailVd";

export function LessonDetail() {
    return (
        <div className="grid grid-cols-3 gap-10">

            <div className="grid grid-cols-1 col-span-2 space-y-8 ">
            <LessonDetailVd />
            <CommentSession/>
            </div>
            
            <div className="col-span-1 ">
                <LessonAccordion/>
            </div>
        </div>
    )
}