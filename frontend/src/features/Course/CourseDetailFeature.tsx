import { AboutCourse } from "./AboutCourse"
import { DescriptPeriod } from "./DescriptPeriod"
import { SimpleVd } from "./SimpleVd"
import { CourseDescription } from "./CourseDescription"

export function CourseDetailFeature() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-11 items-start px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
            <div className="space-y-8">
                <CourseDescription />

                <section className="rounded-xl  bg-muted/20 dark:bg-muted/30 border  p-6 shadow-sm">
                    <DescriptPeriod />
                </section>

                    <AboutCourse />
            </div>


            <SimpleVd />
        </div>
    )
}
