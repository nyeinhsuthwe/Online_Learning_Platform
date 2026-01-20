import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Download } from "lucide-react";
import { useParams } from "react-router-dom";
import { useRef, useEffect } from "react";
import { useEpisodeById } from "@/common/api";
import { ReviewDialog } from "../Review/ReviewDialog";
import { useEpisodeStore } from "@/store/episode";


export function LessonDetailVd() {
    const { episodeId, courseId } = useParams();
    const videoRef = useRef<HTMLVideoElement>(null);

    const storedEpisode = useEpisodeStore((state) => state.episode);
    const setEpisode = useEpisodeStore((state) => state.setEpisode);
    const { data: episodeResponse, refetch } = useEpisodeById(episodeId || "");

    const episode = storedEpisode || episodeResponse?.data;

    useEffect(() => {
        if (episodeResponse?.data) {
            setEpisode(episodeResponse.data);
        } else if (episodeId) {
            refetch().then(res => {
                if (res.data) setEpisode(res.data);
            });
        }
    }, [episodeId, episodeResponse, setEpisode, refetch]);


    if (!episode) return <div>No episode found</div>;

    const videoSrc = `${import.meta.env.VITE_SERVER_URL}${episode.videoUrl}`;

    const handleTimeUpdate = () => {
        const video = videoRef.current;
        if (!video || !episodeId) return;

        const progress = Math.min((video.currentTime / video.duration) * 100, 100);
        localStorage.setItem(`episode-progress-${episodeId}`, progress.toString());
        window.dispatchEvent(
            new CustomEvent("episode-progress-update", { detail: { episodeId, progress } })
        );
    };

    const handlePlayPause = () => {
        const video = videoRef.current;
        if (!video) return;

        window.dispatchEvent(
            new CustomEvent("video-state-change", { detail: { isPlaying: !video.paused } })
        );
    };

    const handleVideoEnded = () => {
        if (!episodeId) return;

        localStorage.setItem(`episode-progress-${episodeId}`, "100");
        window.dispatchEvent(new CustomEvent("video-state-change", { detail: { isPlaying: false } }));
        window.dispatchEvent(
            new CustomEvent("episode-progress-update", { detail: { episodeId, progress: 100 } })
        );
    };

    return (
        <div className="space-y-4">
            {/* Video */}
            <Card className="rounded-md overflow-hidden p-2">
                <div className="relative w-full">
                    <video
                        ref={videoRef}
                        key={episode._id}
                        src={videoSrc}
                        controls
                        className="w-full h-full rounded-md"
                        onTimeUpdate={handleTimeUpdate}
                        onPlay={handlePlayPause}
                        onPause={handlePlayPause}
                        onEnded={handleVideoEnded}
                        autoPlay
                    />
                </div>
            </Card>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <ReviewDialog courseId={courseId} />
                <Button className="bg-text-yellow h-11 sm:h-12 text-[14px] sm:text-[16px] hover:bg-yellow-500 text-white flex gap-2">
                    <Download className="w-5 h-5" />
                    Download Session
                </Button>
            </div>
        </div>
    );
}
