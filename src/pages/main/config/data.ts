import favoriteImg from "@/shared/assets/favorite.png";
import newImg from "@/shared/assets/new.png";
import hanroroImg from "@/shared/assets/hanroro.jpg";
import chillImg from "@/shared/assets/chill.png";
import boomImg from "@/shared/assets/boom.png";
import hiphopImg from "@/shared/assets/hiphop.png";
import roseImg from "@/shared/assets/rose.jpg";
import toilAlbumImg from "@/shared/assets/toil-album.jpeg";
import zutopiaImg from "@/shared/assets/zutopia.webp";
import hanroroAlbumImg from "@/shared/assets/hanroro-album.webp";
import summerImg from "@/shared/assets/summer.png";
import djImg from "@/shared/assets/dj.png";
import byesummerImg from "@/shared/assets/byesummer.jpeg";
import { CardData, MixCardData } from "@/entities/music";

export const RECOMMENDED_CARDS: CardData[] = [
  {
    title: "요즘 자주 들은",
    subtitle: "릴러말즈, TOIL, 김하온, 비오, 폴블랑코",
    image: toilAlbumImg,
    overlayText: "YOUR PICK",
    bgColor: "bg-[#3a2e2a]", // Brownish
    track: {
      id: "2",
      title: "처음 마주쳤을 때처럼",
      artist: "TOIL, Gist",
      album: "TOAST",
      coverUrl: toilAlbumImg,
      audioUrl: "/music/TOIL-처음마주쳤을때처럼.mp3",
      duration: 245,
    },
  },
  {
    title: "매거진",
    subtitle: "이주의 디깅 #220: 주토피아2",
    image: zutopiaImg,
    bgColor: "bg-[#9ca3af]", // Grey/Silver
  },
  {
    title: "좋아하는 앨범",
    subtitle: "입춘",
    subdesc: "앨범 · 한로로",
    image: hanroroAlbumImg, // Using hanroro.jpg as placeholder for album cover
    isCircle: false,
    bgColor: "bg-[#495766]", // Beige/Pinkish
    track: {
      id: "1",
      title: "입춘",
      artist: "한로로",
      album: "입춘",
      coverUrl: hanroroAlbumImg,
      audioUrl: "/music/한로로-입춘.mp3",
      duration: 372,
    },
  },
  {
    title: "한때 즐겨 듣던",
    subtitle: "지난 여름 즐겨듣던 음악",
    subdesc: "VIBE",
    image: summerImg,
    overlayColor: "bg-blue-600",
    bgColor: "bg-[#4054B1]", // Blue
    track: {
      id: "3",
      title: "Ocean View",
      artist: "로제 (ROSE)",
      album: "R",
      coverUrl: chillImg,
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
      duration: 198,
    },
  },
  {
    title: "좋아하는 아티스트",
    subtitle: "바이, 썸머",
    subdesc: "아이유 (IU)",
    image: byesummerImg,
    bgColor: "bg-[#597770]", // Light Grey
  },
  {
    title: "VIBE DJ",
    subtitle: "겨울리스트",
    subdesc: "by 21segy",
    image: djImg, // Using dj.png as placeholder
    bgColor: "bg-[#857469]", // Brown
  },
];

export const MIX_CARDS: MixCardData[] = [
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
