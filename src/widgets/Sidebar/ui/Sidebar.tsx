import { NavLink } from "react-router-dom";
import { sidebarNavigation } from "@/widgets/Sidebar/model/navigation";
import {
  Menu,
  ExternalLink,
  ChevronUp,
  AudioLines,
  Coins,
  Gift,
} from "lucide-react";

export function Sidebar() {
  return (
    <div className="w-[260px] bg-black h-full flex flex-col shrink-0 font-sans border-r border-[#1a1a1a]">
      {/* Header: Menu + Logo */}
      <div className="h-24 flex items-center px-6 gap-4">
        <Menu className="text-white cursor-pointer" size={26} />
        <h1 className="text-2xl font-bold tracking-tighter text-white flex items-center gap-1 cursor-pointer">
          <span className="font-black">NAVER</span> VIBE
        </h1>
      </div>

      {/* User Profile */}
      <div className="px-6 py-7 border-t border-b border-[#1a1a1a]">
        <div className="flex items-center gap-4 cursor-pointer group">
          <div className="w-11 h-11 rounded-full bg-linear-to-br from-yellow-400 to-orange-500 overflow-hidden flex items-center justify-center">
            <img
              src="https://musicmeta-phinf.pstatic.net/artist/000/112/112579.jpg?type=r480Fll&v=20230307150006"
              alt="User"
              className="w-full h-full object-cover opacity-80 mix-blend-overlay"
            />
          </div>
          <div>
            <div className="text-base font-bold text-white flex items-center gap-1">
              Kwon5700 <span className="text-[10px] text-gray-500">▼</span>
            </div>
            <div className="text-xs text-[#ff3c6e] font-medium mt-0.5">
              Premium
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 scrollbar-hide">
        {/* Main Items */}
        <ul className="space-y-2">
          {sidebarNavigation.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center px-6 py-3.5 group border-l-[5px] transition-colors ${
                    isActive
                      ? "bg-[#1a1a1a] text-[#ff3c6e] border-[#ff3c6e]"
                      : "text-white hover:text-[#ff3c6e] border-transparent"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <item.icon
                      size={26}
                      className="mr-5"
                      fill={item.filled && isActive ? "currentColor" : "none"}
                    />
                    <span className="text-xl font-bold flex-1">
                      {item.name}
                    </span>
                    {item.hasExternalLink && (
                      <ExternalLink size={18} className="text-gray-500" />
                    )}
                    {item.hasSubmenu && (
                      <ChevronUp size={18} className="text-gray-500" />
                    )}
                  </>
                )}
              </NavLink>
              {item.hasSubmenu && item.submenuItems && (
                <ul className="mt-2 mb-6 space-y-1">
                  {item.submenuItems.map((subItem) => (
                    <li key={subItem}>
                      <a
                        href="#"
                        className="block px-6 py-2.5 pl-[70px] text-[#888] hover:text-white text-base font-medium transition-colors"
                      >
                        {subItem}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>

        <div className="w-full h-px bg-[#1a1a1a] my-4"></div>

        {/* Footer Links */}
        <div className="px-6 py-4">
          <div className="text-[#555] text-sm mb-5 font-medium">
            VIBE 더보기
          </div>
          <ul className="space-y-5">
            <li>
              <a
                href="#"
                className="flex items-center text-[#999] hover:text-white transition-colors"
              >
                <AudioLines size={22} className="mr-4" />
                <span className="text-lg font-medium">서비스 소개</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center text-[#999] hover:text-white transition-colors"
              >
                <Coins size={22} className="mr-4" />
                <span className="text-lg font-medium">내돈내듣</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center text-[#999] hover:text-white transition-colors"
              >
                <Gift size={22} className="mr-4" />
                <span className="text-lg font-medium">이용권선물</span>
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {/* Bottom Button */}
      <div className="p-6 pb-10">
        <button className="w-full py-3.5 border border-[#333] rounded text-sm text-white hover:border-gray-500 transition-colors font-medium">
          데스크톱앱 설치
        </button>
      </div>
    </div>
  );
}
