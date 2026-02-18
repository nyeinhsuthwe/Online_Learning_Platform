import { useQueries } from "@tanstack/react-query"
import axios from "@/helper/axios"
import { useApiQuery } from "@/hooks/useQuery"

export const useCourse = () => {
    return useApiQuery({
        queryKey: ["course"],
        endpoint: `${import.meta.env.VITE_API_URL}/get-course`
    })
}

export const useChapter = (courseId: string) => {
    return useApiQuery({
        queryKey: ["chapter", courseId],
        endpoint: `${import.meta.env.VITE_API_URL}/get-chapter-list?course_id=${courseId}`
    })
}

export const useEpisode = (chapterId: string) => {
    return useApiQuery({
        queryKey: ['episode', chapterId],
        endpoint: `${import.meta.env.VITE_API_URL}/get-episode-list?chapterId=${chapterId}`,
        enabled: !!chapterId,
    })
}


export interface ChapterRef { _id: string; title: string }
export interface EpisodeItem { _id: string; title: string; description: string; videoUrl: string; chapter_id: ChapterRef }

export const useEpisodesByChapters = (chapterIds: string[]) => {
  const queries = useQueries({
    queries: chapterIds.map((chapterId) => ({
      queryKey: ["episode", chapterId],
      queryFn: async () => {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/get-episode-list?chapterId=${chapterId}`);
        return res.data as { data?: EpisodeItem[] };
      },
      enabled: !!chapterId,
    })),
  });

  const episodes = queries.flatMap((query) => query.data?.data ?? []);
  const isLoading = queries.some((query) => query.isLoading);

  return { episodes, isLoading, queries };
};

export const useEpisodeById = (episodeId: string) => {
    return useApiQuery({
        queryKey: ["episode", episodeId],
        endpoint: `${import.meta.env.VITE_API_URL}/get-episode/${episodeId}`,
        enabled: !!episodeId, 
    })
}

export const useGetCourseById = (courseId : string) => {
    return useApiQuery({
        queryKey: ["coursebyid"],
        endpoint: `${import.meta.env.VITE_API_URL}/get-courseById/${courseId}`
    })
}

export const useGetReviewList = (courseId: string) => {
    return useApiQuery({
        queryKey: ["reviews"],
        endpoint: `${import.meta.env.VITE_API_URL}/reviewList/${courseId}`
    })
}

export const useGetComment = (episodeId: string, courseId: string) => {
    return useApiQuery({
        queryKey: ["comments", episodeId],
        endpoint: `${import.meta.env.VITE_API_URL}/get-all-comments/${courseId}/${episodeId}`,
        enabled: !!episodeId,
    })
}

export const useEnrollList = () => {
     return useApiQuery({
        queryKey: ["enrolls"],
        endpoint: `${import.meta.env.VITE_API_URL}/get-enrollList`,
      
    })
}

export const useEnrollByUser = (page = 1, limit = 6) => {
  return useApiQuery({
    queryKey: ["enrollByUser", page],
    endpoint: `${import.meta.env.VITE_API_URL}/get-enroll-by-id`,
    params: {
      page,
      limit,
    },
  });
};
