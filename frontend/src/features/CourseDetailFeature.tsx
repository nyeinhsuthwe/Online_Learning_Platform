import { AboutCourse } from "./AboutCourse"
import { DescriptPeriod } from "./DescriptPeriod"
import { SimpleVd } from "./SimpleVd"
import { CourseDescription } from "./CourseDescription"

export function CourseDetailFeature() {

    return (
        <div className="grid grid-cols-2 gap-11 items-start">
            <div className=" space-y-9">
               <CourseDescription/>
                <DescriptPeriod/>
                <AboutCourse />
            </div>
            
            <SimpleVd/>
        </div>
    )
}
