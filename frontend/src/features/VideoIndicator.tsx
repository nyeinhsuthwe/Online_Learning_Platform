import { Play, Check } from "lucide-react";
import { useTheme } from "next-themes";

interface VideoIndicatorProps {
  index: number;
  isPlaying: boolean;
  progress: number;
}

export function VideoIndicator({ index, isPlaying, progress }: VideoIndicatorProps) {
  const { theme } = useTheme()

  const size = 44;
  const radius = 20;
  const strokeWidth = 4;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;
  const isCompleted = progress === 100;

  return (
    <div className="relative w-11 h-11 pointer-events-none">
      {/* background ring */}
      <svg className="absolute inset-0 -rotate-90" width={size} height={size}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#e5e7eb" // light gray track
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={
            isCompleted
              ? "#33A6F4"
              : theme === "dark"
                ? "#33A6F4" // blue-500
                : "#67B2D8"
          }
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          fill="transparent"
        />
      </svg>

      {/* inner circle */}
      <div
        className={`w-9 h-9 rounded-full ml-1 mt-1 flex items-center justify-center font-bold text-gray-400 relative z-10
          ${isCompleted ? "bg-sky-500" : "bg-white dark:bg-gray-900"}`}
      >
        {isCompleted ? (
          <Check size={17} className="text-white" />
        ) : isPlaying ? (
          <Play size={10} className="text-sky-500 dark:text-sky-300 font-bold animate-ping " />
        ) : (
          String(index + 1).padStart(2, "0")
        )}
      </div>
    </div>
  );
}
