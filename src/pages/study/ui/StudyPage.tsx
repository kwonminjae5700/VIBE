import { RPPGMonitor } from "@/widgets/RPPGMonitor";

export function StudyPage() {
  return (
    <div className="flex-1 h-full bg-black overflow-hidden flex flex-col">
      <div className="flex-1 max-w-[1800px] w-full mx-auto px-6 py-8">
        <RPPGMonitor
          onHeartRateChange={(heartRate) => {
            console.log("Heart Rate:", heartRate);
          }}
        />
      </div>
    </div>
  );
}
