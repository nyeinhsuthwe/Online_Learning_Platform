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

export const useEpisode = (chapterId:string) => {
    return useApiQuery({
        queryKey: ['episode', chapterId],
        endpoint : `${import.meta.env.VITE_API_URL}/get-episode-list?chapterId=${chapterId}`
    })
}

export const useEpisodeById = (episodeId : string) => {
    return useApiQuery({
        queryKey: ["episode", episodeId],
        endpoint: `${import.meta.env.VITE_API_URL}/get-episode/${episodeId}`,
    })
}