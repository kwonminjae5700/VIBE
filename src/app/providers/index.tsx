import { PlayerProvider } from "@/features/player";
import { BrowserRouter } from "react-router-dom";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <BrowserRouter>
      <PlayerProvider>{children}</PlayerProvider>
    </BrowserRouter>
  );
}
