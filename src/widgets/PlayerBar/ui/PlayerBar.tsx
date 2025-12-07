import {
  Play,
  SkipBack,
  SkipForward,
  Repeat,
  Shuffle,
  Heart,
  List,
  Volume2,
  MoreHorizontal,
} from "lucide-react";
import hanroroImg from "@/shared/assets/hanroro.jpg"; // Using as placeholder

export function PlayerBar() {
  return (
    <div className="h-28 bg-[#121212] border-t border-[#2a2a2a] flex items-center px-8 fixed bottom-0 w-full z-50">
      {/* Track Info */}
      <div className="flex items-center w-[30%] min-w-60">
        <div className="w-16 h-16 bg-gray-700 rounded overflow-hidden mr-5 relative group cursor-pointer">
          <img
            src={hanroroImg}
            alt="Album Art"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col justify-center overflow-hidden mr-6">
          <div className="text-lg font-bold truncate text-white hover:underline cursor-pointer">
            바이, 썸머
          </div>
          <div className="text-sm text-gray-400 truncate hover:underline cursor-pointer mt-1">
            아이유(IU)
          </div>
        </div>
        <button className="text-gray-400 hover:text-[#ff3c6e] transition-colors">
          <Heart size={22} />
        </button>
        <button className="ml-5 text-gray-400 hover:text-white transition-colors">
          <List size={22} />
        </button>
        <button className="ml-5 text-gray-400 hover:text-white transition-colors">
          <MoreHorizontal size={22} />
        </button>
      </div>

      {/* Controls */}
      <div className="flex-1 flex flex-col items-center justify-center max-w-3xl mx-auto">
        <div className="flex items-center space-x-10 mb-3">
          <button className="text-gray-400 hover:text-white transition-colors">
            <Shuffle size={22} />
          </button>
          <button className="text-gray-200 hover:text-white transition-colors">
            <SkipBack size={28} fill="currentColor" />
          </button>
          <button className="w-14 h-14 bg-[#ff3c6e] rounded-full flex items-center justify-center hover:scale-105 transition-transform text-white shadow-lg">
            <Play size={28} fill="currentColor" className="ml-1" />
          </button>
          <button className="text-gray-200 hover:text-white transition-colors">
            <SkipForward size={28} fill="currentColor" />
          </button>
          <button className="text-gray-400 hover:text-white transition-colors">
            <Repeat size={22} />
          </button>
        </div>
        {/* Progress Bar */}
        <div className="w-full flex items-center space-x-4 text-sm text-gray-500 font-medium">
          <span>01:00</span>
          <div className="flex-1 h-1.5 bg-gray-800 rounded-full relative group cursor-pointer">
            <div className="absolute top-0 left-0 h-full w-1/3 bg-[#ff3c6e] rounded-full"></div>
            <div className="absolute top-1/2 left-1/3 w-4 h-4 bg-white rounded-full transform -translate-y-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity shadow-md"></div>
          </div>
          <span>03:39</span>
        </div>
      </div>

      {/* Volume & Extra Controls */}
      <div className="w-[30%] flex items-center justify-end space-x-5">
        <Volume2 size={24} className="text-gray-400" />
        <div className="w-32 h-1.5 bg-gray-800 rounded-full relative cursor-pointer group">
          <div className="absolute top-0 left-0 h-full w-1/2 bg-gray-400 group-hover:bg-[#ff3c6e] rounded-full"></div>
        </div>
        <button className="text-gray-400 hover:text-white text-sm border border-gray-600 rounded px-3 py-1.5">
          EQ
        </button>
      </div>
    </div>
  );
}
