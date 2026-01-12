import { Card } from "@/components/ui/card";

export function SimpleVd() {
    return (
        <Card className="rounded-md overflow-hidden gap-3  py-0 text-white font-semibold text-[14px]">
                <span className="block bg-primary-dark px-3 py-2 rounded-t-md">
                    Simple Lesson Video
                </span>

                <div className="p-3 pt-0">
                    <video
                        src="/simplevd.mp4"
                        controls
                        className="w-full rounded-md"
                    />
                </div>
            </Card>

    )
}