import { useApiQuery } from "@/hooks/useQuery";

export interface Category {
  _id: string;
  name: string;
}

export interface CourseItem {
  _id: string;
  title: string;
  price: number;
  description: string;
  category_id: string;
  thumbnailUrl?: string;
  topics?: string[];
  timePeriod?: string;
  courseDuration?: string;
  chapterCount?: number;
  episodeCount?: number;
  enrollCount?: number;
  createdAt?: string;
}

export interface Chapter {
  _id: string;
  title: string;
  course_id: string;
}

export interface Episode {
  _id: string;
  title: string;
  description: string;
  chapter_id:
    | string
    | {
        _id: string;
        title: string;
      };
  course_id: string;
  videoUrl?: string;
  duration?: number;
  createdAt?: string;
}

export interface EnrollItem {
  _id: string;
  user_id: string;
  course_id: string;
  price: number;
  paymentMethod: string;
  paymentStatus: string;
  createdAt: string;
}

export interface AdminUser {
  _id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  phone?: string;
  avatar?: string;
  bio?: string;
}

export const useAdminCategories = () => {
  return useApiQuery<{ data: Category[] }>({
    queryKey: ["admin-categories"],
    endpoint: `${import.meta.env.VITE_API_URL}/get-category`,
  });
};

export const useAdminCourses = () => {
  return useApiQuery<{ data: CourseItem[] }>({
    queryKey: ["admin-courses"],
    endpoint: `${import.meta.env.VITE_API_URL}/get-course`,
  });
};

export const useAdminEnrollments = () => {
  return useApiQuery<{ data: EnrollItem[] }>({
    queryKey: ["admin-enrollments"],
    endpoint: `${import.meta.env.VITE_API_URL}/get-enrollList`,
  });
};

export const useAdminUsers = () => {
  return useApiQuery<{ data: AdminUser[] }>({
    queryKey: ["admin-users"],
    endpoint: `${import.meta.env.VITE_API_URL}/get-user-list`,
  });
};

export const useAdminChapters = (courseId: string) => {
  return useApiQuery<{ data: Chapter[] }>({
    queryKey: ["admin-chapters", courseId],
    endpoint: `${import.meta.env.VITE_API_URL}/get-chapter-list?course_id=${courseId}`,
    enabled: Boolean(courseId),
  });
};

export const useAdminEpisodes = (chapterId: string) => {
  return useApiQuery<{ data: Episode[] }>({
    queryKey: ["admin-episodes", chapterId],
    endpoint: `${import.meta.env.VITE_API_URL}/get-episode-list?chapterId=${chapterId}`,
    enabled: Boolean(chapterId),
  });
};

export const useAdminEpisodesByCourse = (courseId: string) => {
  return useApiQuery<{ data: Episode[] }>({
    queryKey: ["admin-episodes-course", courseId],
    endpoint: `${import.meta.env.VITE_API_URL}/get-episode-by-course?courseId=${courseId}`,
    enabled: Boolean(courseId),
  });
};

export const useAdminCourseById = (courseId: string) => {
  return useApiQuery<{ data: CourseItem; counts: { chapters: number; episodes: number } }>({
    queryKey: ["admin-course", courseId],
    endpoint: `${import.meta.env.VITE_API_URL}/get-courseById/${courseId}`,
    enabled: Boolean(courseId),
  });
};
