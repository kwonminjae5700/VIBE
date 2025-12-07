import { Play } from "lucide-react";
import { CardData } from "@/entities/music/model/types";

interface CardProps extends CardData {
  onClick?: () => void;
}

export function MusicCard({
  title,
  subtitle,
  subdesc,
  image,
  overlayText,
  overlayColor,
  isCircle,
  bgColor,
  onClick,
}: CardProps) {
  return (
    <div className="group cursor-pointer h-full" onClick={onClick}>
      <div
        className={`${
          bgColor || "bg-[#181818]"
        } rounded-md p-5 h-[380px] flex flex-col transition-colors hover:brightness-110`}
      >
        <div className="mb-4 text-2xl font-extrabold text-white tracking-tight">
          {title}
        </div>
        <div
          className={`relative aspect-square mb-6 shadow-2xl overflow-hidden ${
            isCircle ? "rounded-full" : "rounded-sm"
          } mx-auto w-full max-w-[200px]`}
        >
          <div
            className={`w-full h-full ${
              overlayColor || "bg-gray-700"
            } flex items-center justify-center relative`}
          >
            {image ? (
              <img
                src={image}
                alt={title}
                className="w-full h-full object-cover"
              />
            ) : null}

            {overlayText && (
              <div className="absolute bottom-2 left-0 right-0 text-center z-10">
                <span
                  className="text-3xl font-black text-transparent bg-clip-text bg-linear-to-b from-orange-400 to-red-600 drop-shadow-md"
                  style={{ fontFamily: "Impact, sans-serif" }}
                >
                  {overlayText}
                </span>
              </div>
            )}

            {/* Play button overlay on hover */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-black pl-1">
                <Play fill="currentColor" size={28} />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-auto">
          <div className="text-sm font-medium text-gray-300 line-clamp-2 leading-relaxed mb-1">
            {subtitle}
          </div>
          {subdesc && (
            <div className="text-xs text-gray-400 font-medium">{subdesc}</div>
          )}
        </div>
      </div>
    </div>
  );
}
