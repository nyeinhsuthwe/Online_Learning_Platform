import { AboutCourse } from "./AboutCourse"
import { DescriptPeriod } from "./DescriptPeriod"
import { SimpleVd } from "./SimpleVd"
import { CourseDescription } from "./CourseDescription"
import { CourseReviews } from "../Review/CarouselReview"
import { useParams } from "react-router-dom"

export function CourseDetailFeature() {
    const { id: courseId } = useParams<{ id: string }>()

    return (
        <div className="space-y-10 pb-6">
            <section className="relative overflow-hidden rounded-[38px]  bg-gradient-to-br from-background via-card to-amber-50/40 p-5 shadow-sm md:p-8">
                <div className="pointer-events-none absolute -left-24 -top-20 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />
                <div className="pointer-events-none absolute right-0 top-1/3 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-24 left-1/3 h-72 w-72 rounded-full bg-orange-500/15 blur-3xl" />

                <div className="relative grid grid-cols-1 gap-6 xl:grid-cols-12">
                    <div className="space-y-6 xl:col-span-8">
                        

                            <CourseDescription />
                    </div>

                    <div className="xl:col-span-4 xl:flex ">
                        <section className="h-full w-full rounded-3xl  bg-card/80 shadow-sm backdrop-blur">
                            {courseId && <CourseReviews courseId={courseId} />}
                        </section>
                    </div>

                    <div className="xl:col-span-12">
                        <div className="grid grid-cols-1 gap-4 xl:grid-cols-12">
                            <section className="rounded-3xl  bg-card/80 p-3 shadow-sm backdrop-blur md:p-4 xl:col-span-8">
                                <SimpleVd />
                            </section>

                            <section className="rounded-3xl  bg-card/80 p-5 shadow-sm backdrop-blur md:p-6 xl:col-span-4">
                                <DescriptPeriod />
                            </section>
                        </div>
                    </div>
                </div>
            </section>

            <div className="grid grid-cols-1 items-start gap-8 lg:gap-10">
                <div className="space-y-8">
                    <section className="space-y-2">
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">Learning Journey</p>
                        <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">Course roadmap and lesson flow</h2>
                        <p className="text-sm text-muted-foreground sm:text-base">
                            Explore each chapter, preview the learning sequence, and follow a path designed for confident progress.
                        </p>
                    </section>

                    <AboutCourse />
                </div>
            </div>
        </div>
    )
}
