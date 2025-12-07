import { Play } from "lucide-react";
import { MixCardData } from "@/entities/music/model/types";

interface MixCardProps extends MixCardData {}

export function MixCard({
  title,
  type,
  gradient,
  image,
  artists,
  isArtist,
}: MixCardProps) {
  return (
    <div className="group cursor-pointer h-full">
      <div
        className={`relative overflow-hidden rounded-md p-5 h-[380px] flex flex-col justify-between transition-transform duration-300 hover:-translate-y-1 bg-gray-800`}
      >
        {/* Background Layer */}
        <div className="absolute inset-0 z-0">
          {/* Gradient is always useful as a base, especially for Artist cards */}
          {gradient && (
            <div
              className={`absolute inset-0 w-full h-full bg-linear-to-b ${gradient}`}
            />
          )}

          {/* If NOT artist, image goes here as full background */}
          {!isArtist && image && (
            <img
              src={image}
              alt={title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          )}

          {/* Overlay for background images */}
          {!isArtist && <div className="absolute inset-0 bg-black/20" />}
        </div>

        {/* Content Layer */}
        <div className="relative z-10 h-full flex flex-col pointer-events-none">
          {/* Title & Type */}
          <div>
            <h3 className="text-2xl font-extrabold text-white mb-1 leading-tight tracking-tight">
              {title}
            </h3>
            <p className="text-base font-bold text-white/50">{type}</p>
          </div>

          {/* If Artist, Image goes here in the center */}
          {isArtist && image && (
            <div className="absolute inset-0 flex items-center justify-center">
              <img
                src={image}
                alt={title}
                className="w-40 h-40 rounded-full object-cover shadow-lg transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          )}

          {/* Artists (Bottom) */}
          <div className="mt-auto">
            <p className="text-sm font-medium text-gray-300 line-clamp-2 leading-relaxed">
              {artists}
            </p>
          </div>
        </div>

        {/* Play Overlay */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-20">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-black pl-1 shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
            <Play fill="currentColor" size={32} />
          </div>
        </div>
      </div>
    </div>
  );
}
