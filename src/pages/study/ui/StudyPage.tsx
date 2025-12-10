import { RPPGMonitor } from "@/widgets/RPPGMonitor";
import { usePlayer } from "@/features/player";

export function StudyPage() {
  const { setVolume } = usePlayer();
  return (
    <div className="flex-1 h-full bg-black overflow-hidden flex flex-col">
      <div className="flex-1 max-w-[1800px] w-full mx-auto px-6 py-8">
        <RPPGMonitor
          onHeartRateChange={(heartRate) => {
            if (heartRate <= 0) return;

            // 심박수 60~100 사이에서 볼륨 0.2~1.0으로 매핑
            const minHR = 60;
            const maxHR = 100;
            const minVol = 0.2;
            const maxVol = 1.0;

            let newVolume =
              ((heartRate - minHR) / (maxHR - minHR)) * (maxVol - minVol) +
              minVol;
            newVolume = Math.max(minVol, Math.min(maxVol, newVolume));

            setVolume(newVolume);
          }}
        />
      </div>
    </div>
  );
}
