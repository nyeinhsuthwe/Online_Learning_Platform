import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useApiMutation } from "@/hooks/useMutation";
import { toast } from "sonner";
import { useAdminChapters, useAdminCourses, useAdminEpisodes } from "@/common/adminApi";

const ChaptersEpisodes = () => {
  const queryClient = useQueryClient();
  const { data: coursesRes } = useAdminCourses();

  const [courseId, setCourseId] = useState("");
  const [chapterId, setChapterId] = useState("");
  const [chapterTitle, setChapterTitle] = useState("");
  const [episodeForm, setEpisodeForm] = useState({ title: "", description: "" });
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [editingEpisodeId, setEditingEpisodeId] = useState<string | null>(null);
  const [editEpisodeForm, setEditEpisodeForm] = useState({ title: "", description: "" });
  const [editVideoFile, setEditVideoFile] = useState<File | null>(null);

  const { data: chaptersRes } = useAdminChapters(courseId);
  const { data: episodesRes } = useAdminEpisodes(chapterId);

  useEffect(() => {
    setChapterId("");
    setEditingEpisodeId(null);
  }, [courseId]);

  useEffect(() => {
    setEditingEpisodeId(null);
  }, [chapterId]);

  const createChapterMutation = useApiMutation<{ course_id: string; title: string }, { message: string }>({
    onSuccess: () => {
      toast.success("Chapter created");
      setChapterTitle("");
      queryClient.invalidateQueries({ queryKey: ["admin-chapters", courseId] });
    },
    onError: (err) => toast.error(err.message),
  });

  const deleteChapterMutation = useApiMutation<undefined, { message: string }>({
    onSuccess: () => {
      toast.success("Chapter deleted");
      queryClient.invalidateQueries({ queryKey: ["admin-chapters", courseId] });
      setChapterId("");
    },
    onError: (err) => toast.error(err.message),
  });

  const createEpisodeMutation = useApiMutation<FormData, { message: string }>({
    onSuccess: () => {
      toast.success("Episode created");
      setEpisodeForm({ title: "", description: "" });
      setVideoFile(null);
      queryClient.invalidateQueries({ queryKey: ["admin-episodes", chapterId] });
      queryClient.invalidateQueries({ queryKey: ["admin-courses"] });
    },
    onError: (err) => toast.error(err.message),
  });

  const deleteEpisodeMutation = useApiMutation<undefined, { message: string }>({
    onSuccess: () => {
      toast.success("Episode deleted");
      queryClient.invalidateQueries({ queryKey: ["admin-episodes", chapterId] });
      queryClient.invalidateQueries({ queryKey: ["admin-courses"] });
    },
    onError: (err) => toast.error(err.message),
  });

  const updateEpisodeMutation = useApiMutation<FormData, { message: string }>({
    onSuccess: () => {
      toast.success("Episode updated");
      setEditingEpisodeId(null);
      setEditVideoFile(null);
      queryClient.invalidateQueries({ queryKey: ["admin-episodes", chapterId] });
      queryClient.invalidateQueries({ queryKey: ["admin-courses"] });
    },
    onError: (err) => toast.error(err.message),
  });

  const onCreateChapter = () => {
    if (!courseId || !chapterTitle.trim()) return toast.error("Course and chapter title are required");

    createChapterMutation.mutate({
      endpoint: `${import.meta.env.VITE_API_URL}/create-chapter`,
      method: "POST",
      body: {
        course_id: courseId,
        title: chapterTitle.trim(),
      },
    });
  };

  const onDeleteChapter = (id: string) => {
    deleteChapterMutation.mutate({
      endpoint: `${import.meta.env.VITE_API_URL}/delete-chapter/${id}`,
      method: "DELETE",
    });
  };

  const onCreateEpisode = () => {
    if (!courseId || !chapterId || !episodeForm.title.trim()) {
      return toast.error("Course, chapter and episode title are required");
    }

    const payload = new FormData();
    payload.append("course_id", courseId);
    payload.append("chapter_id", chapterId);
    payload.append("title", episodeForm.title.trim());
    payload.append("description", episodeForm.description.trim());
    if (videoFile) payload.append("videoUrl", videoFile);

    createEpisodeMutation.mutate({
      endpoint: `${import.meta.env.VITE_API_URL}/create-episode`,
      method: "POST",
      body: payload,
    });
  };

  const onDeleteEpisode = (id: string) => {
    deleteEpisodeMutation.mutate({
      endpoint: `${import.meta.env.VITE_API_URL}/delete-episode/${id}`,
      method: "DELETE",
    });
  };

  const onStartEditEpisode = (episodeId: string, title: string, description: string) => {
    setEditingEpisodeId(episodeId);
    setEditEpisodeForm({ title: title ?? "", description: description ?? "" });
    setEditVideoFile(null);
  };

  const onUpdateEpisode = (episodeId: string) => {
    if (!courseId || !chapterId || !editEpisodeForm.title.trim()) {
      return toast.error("Course, chapter and episode title are required");
    }

    const payload = new FormData();
    payload.append("course_id", courseId);
    payload.append("chapter_id", chapterId);
    payload.append("title", editEpisodeForm.title.trim());
    payload.append("description", editEpisodeForm.description.trim());
    if (editVideoFile) payload.append("videoUrl", editVideoFile);

    updateEpisodeMutation.mutate({
      endpoint: `${import.meta.env.VITE_API_URL}/update-episode/${episodeId}`,
      method: "PUT",
      body: payload,
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Chapters & Episodes</h1>
        <p className="text-sm text-muted-foreground">Manage lesson structure for each course.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Select Course</CardTitle>
        </CardHeader>
        <CardContent>
          <select
            className="h-10 w-full max-w-md rounded-md border px-3 text-sm"
            value={courseId}
            onChange={(e) => setCourseId(e.target.value)}
          >
            <option value="">Choose course</option>
            {(coursesRes?.data ?? []).map((course) => (
              <option key={course._id} value={course._id}>
                {course.title}
              </option>
            ))}
          </select>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Chapter Management</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col gap-3 sm:flex-row">
            <Input
              placeholder="Chapter title"
              value={chapterTitle}
              onChange={(e) => setChapterTitle(e.target.value)}
              className="sm:max-w-md"
            />
            <Button onClick={onCreateChapter} disabled={createChapterMutation.isPending}>
              {createChapterMutation.isPending ? "Creating..." : "Create Chapter"}
            </Button>
          </div>

          <div className="space-y-2">
            {(chaptersRes?.data ?? []).map((chapter) => (
              <div key={chapter._id} className="flex flex-col gap-2 rounded-md border p-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-medium">{chapter.title}</p>
                  <button
                    type="button"
                      className={`text-xs ${chapterId === chapter._id ? "text-foreground" : "text-blue-600"}`}
                      onClick={() => setChapterId(chapter._id)}
                    >
                    {chapterId === chapter._id ? "Selected" : "Select for episode management"}
                  </button>
                </div>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button size="sm" variant="destructive">
                      Delete
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete chapter?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will remove the chapter and may affect linked episodes.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction className="bg-destructive text-white hover:bg-destructive/90" onClick={() => onDeleteChapter(chapter._id)}>
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Episode Management</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <Input
              placeholder="Episode title"
              value={episodeForm.title}
              onChange={(e) => setEpisodeForm((prev) => ({ ...prev, title: e.target.value }))}
            />
            <Input type="file" accept="video/*" onChange={(e) => setVideoFile(e.target.files?.[0] ?? null)} />
            <div className="md:col-span-2">
              <Textarea
                placeholder="Episode description"
                value={episodeForm.description}
                onChange={(e) => setEpisodeForm((prev) => ({ ...prev, description: e.target.value }))}
              />
            </div>
          </div>

          <Button onClick={onCreateEpisode} disabled={createEpisodeMutation.isPending}>
            {createEpisodeMutation.isPending ? "Creating..." : "Create Episode"}
          </Button>

          {!chapterId ? (
            <p className="text-sm text-muted-foreground">Select a chapter first.</p>
          ) : (
            <div className="space-y-2">
              {(episodesRes?.data ?? []).map((episode) => (
                <div key={episode._id} className="rounded-md border p-3">
                  {editingEpisodeId === episode._id ? (
                    <div className="space-y-3">
                      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                        <Input
                          placeholder="Episode title"
                          value={editEpisodeForm.title}
                          onChange={(e) => setEditEpisodeForm((prev) => ({ ...prev, title: e.target.value }))}
                        />
                        <Input type="file" accept="video/*" onChange={(e) => setEditVideoFile(e.target.files?.[0] ?? null)} />
                        <div className="md:col-span-2">
                          <Textarea
                            placeholder="Episode description"
                            value={editEpisodeForm.description}
                            onChange={(e) => setEditEpisodeForm((prev) => ({ ...prev, description: e.target.value }))}
                          />
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" onClick={() => onUpdateEpisode(episode._id)} disabled={updateEpisodeMutation.isPending}>
                          {updateEpisodeMutation.isPending ? "Saving..." : "Save"}
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => setEditingEpisodeId(null)}>
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="font-medium">{episode.title}</p>
                        <p className="text-xs text-muted-foreground">Duration: {episode.duration || 0}s</p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => onStartEditEpisode(episode._id, episode.title, episode.description)}
                        >
                          Edit
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button size="sm" variant="destructive">
                              Delete
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete episode?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction className="bg-destructive text-white hover:bg-destructive/90" onClick={() => onDeleteEpisode(episode._id)}>
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ChaptersEpisodes;
