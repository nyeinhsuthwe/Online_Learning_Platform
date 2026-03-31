import { Input } from "@/components/ui/input";
import { Accordian } from "./Accordian";
import { useParams } from "react-router-dom";
import { useChapter } from "@/common/api";

export function AboutCourse() {
    const { id: courseId } = useParams<{ id: string }>();
    const { data: chaptersResponse, isLoading } = useChapter(courseId || "");

    const hasChapters = chaptersResponse?.data?.length > 0;

    return (
        <section className="overflow-hidden rounded-3xl border border-border/60 bg-card/80 shadow-sm backdrop-blur">

            {hasChapters && (
                <div className="flex flex-col gap-4 border-b border-border/60 bg-background/60 px-5 py-5 sm:flex-row sm:items-end sm:justify-between md:px-6">
                    <div className="space-y-1">
                        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">Course Workspace</p>
                        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Course Outline</h2>
                    </div>
                    <Input
                        type="text"
                        className="h-12 w-full rounded-2xl border-border/60 bg-background sm:max-w-sm"
                        placeholder="Search for lessons"
                    />
                </div>
            )}

            {!isLoading && hasChapters && (
                <div className="p-4 md:p-5">
                    <Accordian chapters={chaptersResponse.data} />
                </div>
            )}
        </section>
    );
}
