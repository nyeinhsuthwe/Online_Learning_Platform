import { useEffect, useMemo, useState } from "react";
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
import { useAdminCategories, useAdminCourses } from "@/common/adminApi";

const Courses = () => {
  const PAGE_SIZE = 6;
  const queryClient = useQueryClient();
  const { data: coursesRes, isLoading } = useAdminCourses();
  const { data: categoriesRes } = useAdminCategories();
  const [currentPage, setCurrentPage] = useState(1);

  const [form, setForm] = useState({
    title: "",
    category_id: "",
    price: "",
    description: "",
    topics: "",
    timePeriod: "",
    courseDuration: "",
  });
  const [thumbnail, setThumbnail] = useState<File | null>(null);

  const categoryMap = useMemo(() => {
    return new Map((categoriesRes?.data ?? []).map((category) => [category._id, category.name]));
  }, [categoriesRes?.data]);

  const createMutation = useApiMutation<FormData, { message: string }>({
    onSuccess: () => {
      toast.success("Course created");
      setForm({
        title: "",
        category_id: "",
        price: "",
        description: "",
        topics: "",
        timePeriod: "",
        courseDuration: "",
      });
      setThumbnail(null);
      queryClient.invalidateQueries({ queryKey: ["admin-courses"] });
    },
    onError: (err) => toast.error(err.message),
  });

  const deleteMutation = useApiMutation<undefined, { message: string }>({
    onSuccess: () => {
      toast.success("Course deleted");
      queryClient.invalidateQueries({ queryKey: ["admin-courses"] });
    },
    onError: (err) => toast.error(err.message),
  });

  const onCreate = () => {
    if (!form.title.trim() || !form.category_id || !form.price || !form.description.trim()) {
      return toast.error("Title, category, price and description are required");
    }

    const payload = new FormData();
    payload.append("title", form.title.trim());
    payload.append("category_id", form.category_id);
    payload.append("price", form.price);
    payload.append("description", form.description.trim());
    payload.append(
      "topics",
      JSON.stringify(
        form.topics
          .split(",")
          .map((topic) => topic.trim())
          .filter(Boolean)
      )
    );

    if (form.timePeriod.trim()) payload.append("timePeriod", form.timePeriod.trim());
    if (form.courseDuration.trim()) payload.append("courseDuration", form.courseDuration.trim());
    if (thumbnail) payload.append("thumbnailUrl", thumbnail);

    createMutation.mutate({
      endpoint: `${import.meta.env.VITE_API_URL}/create-course`,
      method: "POST",
      body: payload,
    });
  };

  const onDelete = (courseId: string) => {
    deleteMutation.mutate({
      endpoint: `${import.meta.env.VITE_API_URL}/delete-course/${courseId}`,
      method: "DELETE",
    });
  };

  const courses = coursesRes?.data ?? [];
  const totalPages = Math.max(1, Math.ceil(courses.length / PAGE_SIZE));

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const paginatedCourses = courses.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Courses</h1>
        <p className="text-sm text-muted-foreground">Create and manage courses.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Create Course</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <Input
            placeholder="Course title"
            value={form.title}
            onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
          />

          <select
            className="h-10 rounded-md border px-3 text-sm"
            value={form.category_id}
            onChange={(e) => setForm((prev) => ({ ...prev, category_id: e.target.value }))}
          >
            <option value="">Select category</option>
            {(categoriesRes?.data ?? []).map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>

          <Input
            placeholder="Price"
            value={form.price}
            type="number"
            onChange={(e) => setForm((prev) => ({ ...prev, price: e.target.value }))}
          />

          <Input
            placeholder="Topics (comma separated)"
            value={form.topics}
            onChange={(e) => setForm((prev) => ({ ...prev, topics: e.target.value }))}
          />

          <Input
            placeholder="Time period (optional)"
            value={form.timePeriod}
            onChange={(e) => setForm((prev) => ({ ...prev, timePeriod: e.target.value }))}
          />

          <Input
            placeholder="Course duration (optional)"
            value={form.courseDuration}
            onChange={(e) => setForm((prev) => ({ ...prev, courseDuration: e.target.value }))}
          />

          <div className="md:col-span-2">
            <Textarea
              placeholder="Course description"
              value={form.description}
              onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
            />
          </div>

          <div className="md:col-span-2">
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => setThumbnail(e.target.files?.[0] ?? null)}
            />
          </div>

          <div className="md:col-span-2">
            <Button onClick={onCreate} disabled={createMutation.isPending}>
              {createMutation.isPending ? "Creating..." : "Create Course"}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Course List</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p className="text-sm text-muted-foreground">Loading...</p>
          ) : (
            <div className="space-y-2">
              {paginatedCourses.map((course) => (
                <div key={course._id} className="flex flex-col gap-2 rounded-md border p-3 lg:flex-row lg:items-center lg:justify-between">
                  <div className="space-y-1">
                    <p className="font-semibold">{course.title}</p>
                    <p className="text-sm text-muted-foreground">
                      Category: {categoryMap.get(course.category_id) || course.category_id}
                    </p>
                    <p className="text-sm text-muted-foreground">Price: {course.price}</p>
                    <p className="text-sm text-muted-foreground">
                      Chapters: {course.chapterCount ?? 0} | Episodes: {course.episodeCount ?? 0} | Enrolls: {course.enrollCount ?? 0}
                    </p>
                  </div>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button size="sm" variant="destructive">
                        Delete
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete course?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This will permanently remove the course.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction className="bg-destructive text-white hover:bg-destructive/90" onClick={() => onDelete(course._id)}>
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              ))}
            </div>
          )}

          {!isLoading && courses.length > 0 && (
            <div className="mt-4 flex items-center justify-between">
              <p className="text-xs text-muted-foreground">
                Page {currentPage} of {totalPages}
              </p>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" disabled={currentPage === 1} onClick={() => setCurrentPage((prev) => prev - 1)}>
                  Previous
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Courses;
