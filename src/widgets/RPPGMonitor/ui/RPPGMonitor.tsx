import { useEffect, useState } from "react";
import { useWebcam } from "../../../shared/hooks/useWebcam";
import { useRPPG } from "../../../shared/hooks/useRPPG";
import { heartRateCalculator } from "../../../shared/utils/heartRateCalculator";
import { RPPGCanvas } from "./RPPGCanvas";
import {
  Heart,
  Activity,
  TrendingUp,
  TrendingDown,
  Minus,
  Camera,
  CameraOff,
  AlertCircle,
} from "lucide-react";

export interface RPPGMonitorProps {
  onHeartRateChange?: (heartRate: number) => void;
}

export function RPPGMonitor({ onHeartRateChange }: RPPGMonitorProps) {
  const [heartRate, setHeartRate] = useState(0);
  const [confidence, setConfidence] = useState(0);
  const [trend, setTrend] = useState<"increasing" | "decreasing" | "stable">(
    "stable"
  );
  const [error, setError] = useState<string | null>(null);

  const {
    videoRef,
    canvasRef,
    isActive,
    error: webcamError,
    startWebcam,
    stopWebcam,
  } = useWebcam({
    onFrameCapture: (frame) => {
      rppg.processFrame(frame);
    },
    onError: (err) => {
      setError(err.message);
    },
  });

  const rppg = useRPPG({
    onHeartRateUpdate: (signal) => {
      // 신호가 배열로 오는 경우, heartRateCalculator에 의해 처리됨
      if (Array.isArray(signal)) {
        const result = heartRateCalculator.calculateHeartRate(signal);
        setHeartRate(result.heartRate);
        setConfidence(result.confidence);
        setTrend(result.trend);
        onHeartRateChange?.(result.heartRate);
      } else {
        // 단일 값인 경우
        setHeartRate(signal);
        onHeartRateChange?.(signal);
      }
    },
    onError: (err) => {
      setError(err.message);
    },
  });

  // 모니터 시작
  const handleStart = async () => {
    try {
      setError(null);
      await rppg.initializeRPPG();
      await startWebcam();
      rppg.startProcessing();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      setError(message);
    }
  };

  // 모니터 중지
  const handleStop = () => {
    rppg.stopProcessing();
    stopWebcam();
    heartRateCalculator.reset();
    setHeartRate(0);
    setConfidence(0);
    setTrend("stable");
  };

  // 웹캠 에러 처리
  useEffect(() => {
    if (webcamError) {
      setError(webcamError.message);
    }
  }, [webcamError]);

  return (
    <div className="w-full h-full flex flex-col gap-6">
      {/* Controls & Status Bar */}
      <div className="flex items-center justify-between bg-[#1a1a1a] p-4 rounded-2xl border border-[#333]">
        <div className="flex items-center gap-4">
          <button
            onClick={isActive ? handleStop : handleStart}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-lg transition-all ${
              isActive
                ? "bg-red-500/10 text-red-500 hover:bg-red-500/20 border border-red-500/50"
                : "bg-white text-black hover:bg-gray-200"
            }`}
          >
            {isActive ? (
              <>
                <CameraOff size={20} /> 측정 종료
              </>
            ) : (
              <>
                <Camera size={20} /> 측정 시작
              </>
            )}
          </button>
        </div>

        {error && (
          <div className="flex items-center gap-2 text-red-400 bg-red-400/10 px-4 py-2 rounded-lg border border-red-400/20">
            <AlertCircle size={18} />
            <span className="text-sm">{error}</span>
          </div>
        )}
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-6 min-h-[600px]">
        {/* Main Video Area */}
        <div className="lg:col-span-3 relative bg-[#1a1a1a] rounded-3xl overflow-hidden border border-[#333] shadow-2xl">
          <RPPGCanvas
            videoRef={videoRef}
            canvasRef={canvasRef}
            isActive={isActive}
            heartRate={heartRate}
            confidence={confidence}
            trend={trend}
          />
        </div>

        {/* Stats Sidebar */}
        <div className="flex flex-col gap-4">
          {/* Heart Rate Card */}
          <div className="flex-1 bg-[#1a1a1a] rounded-3xl p-6 border border-[#333] flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Heart size={120} />
            </div>
            <div>
              <p className="text-gray-400 font-medium mb-2 flex items-center gap-2">
                <Heart size={18} className="text-red-500" /> 심박수
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-6xl font-bold text-white tracking-tighter">
                  {isActive ? heartRate : "--"}
                </span>
                <span className="text-xl text-gray-500 font-medium">BPM</span>
              </div>
            </div>
            <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden mt-4">
              <div
                className="h-full bg-red-500 transition-all duration-500"
                style={{ width: `${Math.min((heartRate / 200) * 100, 100)}%` }}
              />
            </div>
          </div>

          {/* Confidence Card */}
          <div className="flex-1 bg-[#1a1a1a] rounded-3xl p-6 border border-[#333] flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Activity size={120} />
            </div>
            <div>
              <p className="text-gray-400 font-medium mb-2 flex items-center gap-2">
                <Activity size={18} className="text-blue-500" /> 신뢰도
              </p>
              <div className="flex items-baseline gap-2">
                <span
                  className={`text-6xl font-bold tracking-tighter ${
                    confidence > 0.7 ? "text-green-500" : "text-orange-500"
                  }`}
                >
                  {isActive ? (confidence * 100).toFixed(0) : "--"}
                </span>
                <span className="text-xl text-gray-500 font-medium">%</span>
              </div>
            </div>
            <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden mt-4">
              <div
                className={`h-full transition-all duration-500 ${
                  confidence > 0.7 ? "bg-green-500" : "bg-orange-500"
                }`}
                style={{ width: `${confidence * 100}%` }}
              />
            </div>
          </div>

          {/* Trend Card */}
          <div className="flex-1 bg-[#1a1a1a] rounded-3xl p-6 border border-[#333] flex flex-col justify-center items-center text-center">
            <p className="text-gray-400 font-medium mb-4">실시간 추세</p>
            {isActive ? (
              <>
                {trend === "increasing" && (
                  <TrendingUp size={48} className="text-red-500 mb-2" />
                )}
                {trend === "decreasing" && (
                  <TrendingDown size={48} className="text-blue-500 mb-2" />
                )}
                {trend === "stable" && (
                  <Minus size={48} className="text-gray-500 mb-2" />
                )}
                <span className="text-xl font-bold text-white">
                  {trend === "increasing"
                    ? "상승 중"
                    : trend === "decreasing"
                    ? "하강 중"
                    : "안정적"}
                </span>
              </>
            ) : (
              <span className="text-gray-600 text-lg">--</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
