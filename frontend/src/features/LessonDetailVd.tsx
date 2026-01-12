import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CircleStar, Download } from "lucide-react";
import { useParams } from "react-router-dom";
import { useRef, useEffect } from "react";
import { useEpisodeById } from "@/common/api";

export function LessonDetailVd() {
    const { episodeId } = useParams<{ episodeId: string }>();
    const videoRef = useRef<HTMLVideoElement>(null);

    const { data: episodeResponse } = useEpisodeById(episodeId || "");

    const episode = episodeResponse?.data;

    useEffect(() => {
        const video = videoRef.current;
        if (!video || !episodeId) return;

        const onLoaded = () => {
            const saved = localStorage.getItem(`episode-progress-${episodeId}`);
            if (saved && parseFloat(saved) < 100) {
                video.currentTime = (parseFloat(saved) / 100) * video.duration;
            }
        };

        video.addEventListener("loadedmetadata", onLoaded);
        return () => video.removeEventListener("loadedmetadata", onLoaded);
    }, [episodeId]);

    if (!episode) return <div>No episode found</div>;

    const videoSrc = `${import.meta.env.VITE_SERVER_URL}${episode.videoUrl}`;

    const handleTimeUpdate = () => {
        const video = videoRef.current;
        if (!video || !episodeId) return;

        const progress = Math.min((video.currentTime / video.duration) * 100, 100);
        localStorage.setItem(`episode-progress-${episodeId}`, progress.toString());
        window.dispatchEvent(new CustomEvent("episode-progress-update", { detail: { episodeId, progress } }));
    };

    const handlePlayPause = () => {
        const video = videoRef.current;
        if (!video) return;
        window.dispatchEvent(new CustomEvent("video-state-change", { detail: { isPlaying: !video.paused } }));
    };

    const handleVideoEnded = () => {
        const video = videoRef.current;
        if (!video || !episodeId) return;

        localStorage.setItem(`episode-progress-${episodeId}`, "100");
        window.dispatchEvent(new CustomEvent("video-state-change", { detail: { isPlaying: false } }));
        window.dispatchEvent(new CustomEvent("episode-progress-update", { detail: { episodeId, progress: 100 } }));
    };

    return (
        <div className="space-y-4">
            <Card className="rounded-md overflow-hidden p-3 font-semibold text-[14px]">
                <video
                    ref={videoRef}
                    key={episode._id}
                    src={videoSrc}
                    controls
                    className="w-full rounded-md"
                    onTimeUpdate={handleTimeUpdate}
                    onPlay={handlePlayPause}
                    onPause={handlePlayPause}
                    onEnded={handleVideoEnded}
                    autoPlay
                />
            </Card>

            <div className="grid grid-cols-2 gap-2">
                <Button className="bg-primary-dark h-12 text-[16px] hover:bg-primary-hover text-white">
                    <CircleStar style={{ width: 24, height: 24 }} /> Review
                </Button>
                <Button className="bg-text-yellow h-12 text-[16px] hover:bg-yellow-500 text-white">
                    <Download style={{ width: 24, height: 24 }} /> Download This Session
                </Button>
            </div>
        </div>
    );
}
