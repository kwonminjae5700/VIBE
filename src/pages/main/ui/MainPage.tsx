import { ChevronLeft, ChevronRight } from "lucide-react";
import { MusicCard, MixCard } from "@/entities/music";
import { usePlayer } from "@/features/player";
import { RECOMMENDED_CARDS, MIX_CARDS } from "../config/data";

export function MainPage() {
  const { playTrack } = usePlayer();

  return (
    <div className="flex-1 overflow-y-auto pb-32 bg-black">
      <div className="max-w-[1800px] mx-auto px-6 py-8 space-y-12">
        {/* Section 1: 오늘은 뭐 듣지? */}
        <section>
          <h2 className="text-3xl font-extrabold mb-6 flex items-center text-white tracking-tight">
            오늘은 뭐 듣지? <span className="ml-2 text-3xl">🤔</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
            {RECOMMENDED_CARDS.map((card, index) => (
              <MusicCard
                key={index}
                {...card}
                onClick={card.track ? () => playTrack(card.track!) : undefined}
              />
            ))}
          </div>
        </section>

        {/* Section 2: 나를 위한 믹스테잎 */}
        <section className="relative">
          <div className="flex justify-between items-end mb-6">
            <h2 className="text-3xl font-extrabold text-white tracking-tight">
              나를 위한 믹스테잎
            </h2>
            <span className="text-sm text-gray-400 font-medium cursor-pointer hover:text-white transition-colors">
              더보기
            </span>
          </div>

          {/* Navigation Buttons (Visual only for now) */}
          <div className="absolute top-1/2 -left-6 transform -translate-y-1/2 z-10">
            <button className="w-10 h-10 rounded-full bg-[#2a2a2a] flex items-center justify-center text-white hover:bg-[#3a3a3a]">
              <ChevronLeft size={24} />
            </button>
          </div>
          <div className="absolute top-1/2 -right-6 transform -translate-y-1/2 z-10">
            <button className="w-10 h-10 rounded-full bg-[#2a2a2a] flex items-center justify-center text-white hover:bg-[#3a3a3a]">
              <ChevronRight size={24} />
            </button>
          </div>

          <div className="flex gap-5 overflow-x-auto scrollbar-hide pb-4 -mx-4 px-4">
            {MIX_CARDS.map((card, index) => (
              <div key={index} className="flex-none w-[260px]">
                <MixCard {...card} />
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
