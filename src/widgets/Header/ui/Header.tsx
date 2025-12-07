import { Search } from "lucide-react";

export function Header() {
  return (
    <div className="h-24 flex items-center justify-center px-8 sticky top-0 bg-black z-40">
      <div className="relative w-full max-w-[650px]">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search size={20} className="text-[#777]" />
        </div>
        <input
          type="text"
          className="block w-full pl-12 pr-4 py-3 border border-transparent rounded-sm leading-5 bg-[#1c1c1c] text-gray-300 placeholder-[#777] focus:outline-none focus:bg-[#2a2a2a] focus:text-white text-base transition-colors"
          placeholder="노래, 앨범, 아티스트 검색"
        />
      </div>
    </div>
  );
}
