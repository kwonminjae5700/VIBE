import { ChevronLeft, ChevronRight } from "lucide-react";
import favoriteImg from "@/shared/assets/favorite.png";
import newImg from "@/shared/assets/new.png";
import hanroroImg from "@/shared/assets/hanroro.jpg";
import chillImg from "@/shared/assets/chill.png";
import boomImg from "@/shared/assets/boom.png";
import hiphopImg from "@/shared/assets/hiphop.png";
import roseImg from "@/shared/assets/rose.jpg";
import { CardData, MixCardData } from "@/entities/music/model/types";
import { MusicCard } from "@/entities/music/ui/MusicCard";
import { MixCard } from "@/entities/music/ui/MixCard";

// --- Configuration ---
const RECOMMENDED_CARDS: CardData[] = [
  {
    title: "요즘 자주 들은",
    subtitle: "릴러말즈, TOIL, 김하온, 비오, 폴블랑코",
    image: favoriteImg,
    overlayText: "YOUR PICK",
    bgColor: "bg-[#3a2e2a]", // Brownish
  },
  {
    title: "매거진",
    subtitle: "이주의 디깅 #220: 주토피아2",
    image: newImg,
    bgColor: "bg-[#9ca3af]", // Grey/Silver
  },
  {
    title: "좋아하는 앨범",
    subtitle: "자몽살구클럽",
    subdesc: "앨범 · 한로로",
    image: hanroroImg, // Using hanroro.jpg as placeholder for album cover
    isCircle: false,
    bgColor: "bg-[#e5d5c5]", // Beige/Pinkish
  },
  {
    title: "한때 즐겨 듣던",
    subtitle: "지난 여름 즐겨듣던 음악",
    subdesc: "VIBE",
    image: chillImg,
    overlayColor: "bg-blue-600",
    bgColor: "bg-[#3b82f6]", // Blue
  },
  {
    title: "좋아하는 아티스트",
    subtitle: "Between Sat & Sun",
    subdesc: "TOIL",
    image: boomImg,
    bgColor: "bg-[#d1d5db]", // Light Grey
  },
  {
    title: "VIBE DJ",
    subtitle: "겨울리스트",
    subdesc: "by 21segy",
    image: hiphopImg, // Using hiphop.png as placeholder
    bgColor: "bg-[#78350f]", // Brown
  },
];

const MIX_CARDS: MixCardData[] = [
  {
    title: "최애",
    type: "Mix",
    gradient: "from-[#500724] to-[#be123c]", // Dark Pink to Red
    image: favoriteImg,
    artists: "로제, 나상현씨밴드, 고추잠자리, 데이먼스 이어, 아이유",
  },
  {
    title: "두둠칫",
    type: "Mix",
    gradient: "from-[#4c1d95] to-[#7c3aed]", // Purple
    image: boomImg,
    artists: "김승민, 비오, 래원, 유다빈밴드, ASH ISLAND",
  },
  {
    title: "잔잔",
    type: "Mix",
    gradient: "from-[#064e3b] to-[#10b981]", // Green
    image: chillImg,
    artists: "한로로, TOIL, Gist, 릴러말즈, ASH ISLAND",
  },
  {
    title: "새노래",
    type: "Mix",
    gradient: "from-[#172554] to-[#3b82f6]", // Deep Blue
    image: newImg,
    artists: "터치드, 김하온, BOYCOLD, 식케이, JMIN",
  },
  {
    title: "아티스트",
    type: "Mix",
    gradient: "from-[#4b5563] to-[#9ca3af]", // Gray
    image: roseImg,
    artists: "로제, aespa, Bruno Mars, KiiiKiii (키키), (여자)아이들",
    isArtist: true,
  },
  {
    title: "아티스트",
    type: "Mix",
    gradient: "from-[#4b5563] to-[#9ca3af]", // Gray
    image: hanroroImg,
    artists: "한로로, 윤마치 (MRCH), 터치드, 유다빈밴드, 음율",
    isArtist: true,
  },
  {
    title: "힙합",
    type: "Mix",
    gradient: "from-[#7f1d1d] to-[#ef4444]", // Red
    image: hiphopImg,
    artists: "릴러말즈, 한요한, 파테코, DPR LIVE, 기리보이",
  },
];

export function MainPage() {
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
              <MusicCard key={index} {...card} />
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
