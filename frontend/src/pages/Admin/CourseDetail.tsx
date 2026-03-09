import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useAdminChapters, useAdminCourseById, useAdminEpisodesByCourse } from "@/common/adminApi";

const formatDuration = (seconds: number) => {
  if (!seconds) return "0m";
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainSeconds = seconds % 60;

  if (hours > 0) return `${hours}h ${minutes}m`;
  if (minutes > 0) return `${minutes}m ${remainSeconds}s`;
  return `${remainSeconds}s`;
};

const AdminCourseDetail = () => {
  const navigate = useNavigate();
  const { id = "" } = useParams<{ id: string }>();

  const { data: courseRes, isLoading: isCourseLoading } = useAdminCourseById(id);
  const { data: chaptersRes, isLoading: isChaptersLoading } = useAdminChapters(id);
  const { data: episodesRes, isLoading: isEpisodesLoading } = useAdminEpisodesByCourse(id);

  const chapters = chaptersRes?.data ?? [];
  const episodes = episodesRes?.data ?? [];

  const chapterMap = useMemo(() => {
    return new Map(chapters.map((chapter) => [chapter._id, chapter.title]));
  }, [chapters]);

  const groupedEpisodes = useMemo(() => {
    const map = new Map<string, typeof episodes>();

    for (const episode of episodes) {
      const chapterId = typeof episode.chapter_id === "string" ? episode.chapter_id : episode.chapter_id?._id;
      const key = chapterId || "unknown";
      if (!map.has(key)) map.set(key, []);
      map.get(key)?.push(episode);
    }

    return map;
  }, [episodes]);

  const totalDurationSeconds = episodes.reduce((sum, episode) => sum + (episode.duration || 0), 0);
  const isLoading = isCourseLoading || isChaptersLoading || isEpisodesLoading;
  const course = courseRes?.data;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Course Detail</h1>
          <p className="text-sm text-muted-foreground">Full overview of this course content.</p>
        </div>
        <Button variant="outline" onClick={() => navigate("/admin/courses")}>Back to Courses</Button>
      </div>

      {isLoading ? (
        <Card>
          <CardContent className="py-6">
            <p className="text-sm text-muted-foreground">Loading course detail...</p>
          </CardContent>
        </Card>
      ) : !course ? (
        <Card>
          <CardContent className="py-6">
            <p className="text-sm text-muted-foreground">Course not found.</p>
          </CardContent>
        </Card>
      ) : (
        <>
          <Card>
            <CardHeader>
              <CardTitle>{course.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {course.thumbnailUrl ? (
                <img
                  src={`${import.meta.env.VITE_API_URL.replace("/api", "")}${course.thumbnailUrl}`}
                  alt={course.title}
                  className="h-44 w-full rounded-md object-cover md:w-96"
                />
              ) : null}

              <p className="text-sm text-muted-foreground">{course.description || "No description"}</p>
              <p className="text-sm">Price: {course.price}</p>
              <p className="text-sm">Time Period: {course.timePeriod || "-"}</p>
              <p className="text-sm">Course Duration: {course.courseDuration || "-"}</p>

              <div className="flex flex-wrap gap-2">
                {(course.topics ?? []).length > 0 ? (
                  (course.topics ?? []).map((topic) => (
                    <Badge key={topic} variant="secondary">
                      {topic}
                    </Badge>
                  ))
                ) : (
                  <span className="text-sm text-muted-foreground">No topics</span>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Totals</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-3 md:grid-cols-3">
              <div className="rounded-md border p-3">
                <p className="text-xs text-muted-foreground">Chapters</p>
                <p className="text-xl font-semibold">{chapters.length}</p>
              </div>
              <div className="rounded-md border p-3">
                <p className="text-xs text-muted-foreground">Episodes</p>
                <p className="text-xl font-semibold">{episodes.length}</p>
              </div>
              <div className="rounded-md border p-3">
                <p className="text-xs text-muted-foreground">Total Episode Duration</p>
                <p className="text-xl font-semibold">{formatDuration(totalDurationSeconds)}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Chapters & Episodes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {chapters.length === 0 ? (
                <p className="text-sm text-muted-foreground">No chapters yet.</p>
              ) : (
                <Accordion type="single" collapsible className="w-full space-y-2">
                  {chapters.map((chapter) => {
                    const chapterEpisodes = groupedEpisodes.get(chapter._id) ?? [];

                    return (
                      <AccordionItem key={chapter._id} value={chapter._id} className="rounded-md border px-3">
                        <AccordionTrigger iconPosition="right" className="py-3">
                          <span className="font-semibold">{chapter.title}</span>
                          <span className="ml-2 text-xs font-normal text-muted-foreground">
                            ({chapterEpisodes.length} episodes)
                          </span>
                        </AccordionTrigger>
                        <AccordionContent>
                          {chapterEpisodes.length === 0 ? (
                            <p className="text-sm text-muted-foreground">No episodes in this chapter.</p>
                          ) : (
                            <div className="space-y-2">
                              {chapterEpisodes.map((episode) => (
                                <div key={episode._id} className="rounded-md border p-2">
                                  <p className="font-medium">{episode.title}</p>
                                  <p className="text-xs text-muted-foreground">Duration: {formatDuration(episode.duration || 0)}</p>
                                  <p className="text-sm text-muted-foreground">{episode.description || "No description"}</p>
                                </div>
                              ))}
                            </div>
                          )}
                        </AccordionContent>
                      </AccordionItem>
                    );
                  })}
                </Accordion>
              )}

              {episodes.length > 0 && groupedEpisodes.has("unknown") ? (
                <div className="rounded-md border p-3">
                  <p className="font-semibold">Unlinked Episodes</p>
                  <p className="text-xs text-muted-foreground">Chapter not found</p>
                  <div className="mt-2 space-y-2">
                    {(groupedEpisodes.get("unknown") ?? []).map((episode) => (
                      <div key={episode._id} className="rounded-md border p-2">
                        <p className="font-medium">{episode.title}</p>
                        <p className="text-xs text-muted-foreground">
                          Chapter: {typeof episode.chapter_id === "string" ? chapterMap.get(episode.chapter_id) || "Unknown" : episode.chapter_id?.title || "Unknown"}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default AdminCourseDetail;
