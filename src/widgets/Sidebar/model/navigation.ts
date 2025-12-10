import { Home, BarChart2, BookAudio, Heart, LucideIcon } from "lucide-react";

export interface NavigationItem {
  name: string;
  path: string;
  icon: LucideIcon;
  hasExternalLink?: boolean;
  hasSubmenu?: boolean;
  submenuItems?: string[];
  filled?: boolean;
}

export const sidebarNavigation: NavigationItem[] = [
  {
    name: "투데이",
    path: "/",
    icon: Home,
    filled: true,
  },
  {
    name: "차트",
    path: "/chart",
    icon: BarChart2,
  },
  {
    name: "공부",
    path: "/study",
    icon: BookAudio,
    hasExternalLink: true,
  },
  {
    name: "보관함",
    path: "/library",
    icon: Heart,
    hasSubmenu: true,
    submenuItems: ["노래", "아티스트", "앨범", "플레이리스트", "구매한 MP3"],
  },
];
