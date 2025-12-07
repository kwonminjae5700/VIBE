import { Routes, Route } from "react-router-dom";
import { Sidebar } from "@/widgets/Sidebar";
import { Header } from "@/widgets/Header";
import { PlayerBar } from "@/widgets/PlayerBar";
import { MainPage } from "@/pages/main";
import { PlaceholderPage } from "@/pages/placeholder";

export default function App() {
  return (
    <div className="flex h-screen bg-black text-white overflow-hidden font-sans">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Header />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/chart" element={<PlaceholderPage title="차트" />} />
          <Route path="/audio" element={<PlaceholderPage title="오디오" />} />
          <Route path="/library" element={<PlaceholderPage title="보관함" />} />
        </Routes>
      </div>
      <PlayerBar />
    </div>
  );
}
