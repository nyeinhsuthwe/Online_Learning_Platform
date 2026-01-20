import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Episode {
    _id: string;
    title?: string;
    description?: string;
    videoUrl?: string;
    chapter_id: string
}

interface EpisodeState {
    episode: Episode | null;
    setEpisode: (episode: Episode) => void;
}

export const useEpisodeStore = create(
    persist<EpisodeState>(
        (set) => ({
            episode: null,
            setEpisode: (episode) => set({ episode }),
        }),
        {
            name: "episode-storage",
        }
    )
);
