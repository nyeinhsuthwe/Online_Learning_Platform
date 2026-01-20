import { AboutCourse } from "./AboutCourse"
import { DescriptPeriod } from "./DescriptPeriod"
import { SimpleVd } from "./SimpleVd"
import { CourseDescription } from "./CourseDescription"

export function CourseDetailFeature() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-11 items-start px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
            <div className="space-y-14 ">
                <CourseDescription />
                <DescriptPeriod />
                <AboutCourse />
            </div>

            <SimpleVd />
        </div>
    )
}
