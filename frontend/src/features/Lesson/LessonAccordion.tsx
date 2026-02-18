import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { Clock } from "lucide-react";
import { VideoIndicator } from "./VideoIndicator";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { EpisodeItem, useChapter, useEpisodesByChapters, useGetCourseById } from "@/common/api";
import { LessonAccordionSkeleton } from "../skeletons/LessonAccordionSkeleton";

interface Chapter { _id: string; title: string; }

export function LessonAccordion() {
    const { courseId, episodeId } = useParams<{ courseId: string; episodeId: string }>();

    const navigate = useNavigate();

    const { data: chaptersResponse, isLoading } = useChapter(courseId || "");
    const firstChapterId = chaptersResponse?.data?.[0]?._id || "";

    const chapterIds = (chaptersResponse?.data ?? []).map((chapter: Chapter) => chapter._id);
    const { episodes, isLoading: isEpisodeLoading } = useEpisodesByChapters(chapterIds);

    const currentChapterId = episodes.find((ep: EpisodeItem) => ep._id === episodeId)?.chapter_id._id;
    const [openChapter, setOpenChapter] = useState<string | null>(currentChapterId || firstChapterId || null);

    const grouped: Record<string, { title: string; episodes: EpisodeItem[] }> = {};
    chaptersResponse?.data?.forEach((chapter: Chapter) => grouped[chapter._id] = { title: chapter.title, episodes: [] });
    episodes.forEach((ep: EpisodeItem) => {
        const chapterId = ep.chapter_id._id;
        if (grouped[chapterId]) grouped[chapterId].episodes.push(ep);
    });

    const course = useGetCourseById(courseId || "")
    const [progressMap, setProgressMap] = useState<Record<string, number>>({});
    useEffect(() => {
        const handler = (e: CustomEvent) => {
            const { episodeId, progress } = e.detail;
            setProgressMap(prev => ({ ...prev, [episodeId]: progress }));
        };
        window.addEventListener("episode-progress-update", handler as EventListener);
        return () => window.removeEventListener("episode-progress-update", handler as EventListener);
    }, []);

    useEffect(() => {
        const map: Record<string, number> = {};
        episodes.forEach((ep: EpisodeItem) => {
            const saved = localStorage.getItem(`episode-progress-${ep._id}`);
            if (saved) map[ep._id] = parseFloat(saved);
        });
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setProgressMap(map);
    }, [episodes]);


    const handleClick = (epId: string) => {
        if (epId !== episodeId) navigate(`/user/lesson-detail/${courseId}/${epId}`);
    };

    if (isLoading || isEpisodeLoading) {
        return <div><LessonAccordionSkeleton /></div>;
    }



    return (
        <div className="space-y-5">
            <Card
                className=" p-6 rounded-xl transition bg-linear-to-br from-blue-500 to-blue-200 dark:from-slate-900 dark:to-slate-800 shadow-sm hover:shadow-md hover:-translate-y-0.5">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-100 dark:text-blue-400">
                    {course?.data?.data?.title}
                </h1>

                <p className="mt-2 text-sm font-medium text-blue-100 dark:text-slate-300">
                    Publish Date –{" "}
                    {new Date(course?.data?.data?.createdAt).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                    })}
                </p>
            </Card>


            <Accordion
                type="single"
                collapsible
                className="w-full space-y-3 "
                value={openChapter ?? currentChapterId ?? firstChapterId ?? ""}
                onValueChange={val => setOpenChapter(val || null)}
            >
                {Object.entries(grouped).map(([chapterId, chapter]) => (
                    <AccordionItem key={chapterId} value={chapterId}>
                        <AccordionTrigger className="text-[16px] text-gray-600 dark:text-white">
                            <div className="flex items-center gap-3">
                                <span>{chapter.title}</span>
                                <div className="h-5 w-0.5 bg-gray-400" />
                                <span>{chapter.episodes[0]?.description ?? "No description"}</span>
                            </div>
                        </AccordionTrigger>

                        <AccordionContent className="flex flex-col gap-3 mt-2 px-2">
                            {chapter.episodes.map((ep, index) => (
                                <Card
                                    key={ep._id}
                                    className="gap-3 p-3 shadow-[0_-1px_5px_rgba(0,0,0,0.04),0_1px_5px_rgba(0,0,0,0.04)] shadow-sky-200 cursor-pointer"
                                    onClick={() => handleClick(ep._id)}
                                >
                                    <div className="flex justify-between items-center w-full">
                                        <div className="flex gap-3 items-center">
                                            <VideoIndicator index={index} isPlaying={episodeId === ep._id} progress={progressMap[ep._id] || 0} />
                                            <span className="flex hover:text-text-skyblue text-[16px] dark:text-white text-text-secondary font-semibold items-center">
                                                {ep.title}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Clock size={16} /> 12mins
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    );
}
