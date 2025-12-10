import { useEffect, useRef } from "react";

export interface RPPGCanvasProps {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  isActive: boolean;
  heartRate: number;
  confidence: number;
  trend: "increasing" | "decreasing" | "stable";
}

export function RPPGCanvas({
  videoRef,
  canvasRef,
  isActive,
  heartRate,
  confidence,
  trend,
}: RPPGCanvasProps) {
  const overlayCanvasRef = useRef<HTMLCanvasElement>(null);

  // 오버레이 그리기
  useEffect(() => {
    if (!isActive || !videoRef.current || !overlayCanvasRef.current) return;

    const overlayCanvas = overlayCanvasRef.current;
    const ctx = overlayCanvas.getContext("2d");
    if (!ctx) return;

    overlayCanvas.width = videoRef.current.videoWidth;
    overlayCanvas.height = videoRef.current.videoHeight;

    const drawOverlay = () => {
      if (!videoRef.current || !overlayCanvasRef.current) return;

      // 캔버스 크기 동기화
      if (
        overlayCanvas.width !== videoRef.current.videoWidth ||
        overlayCanvas.height !== videoRef.current.videoHeight
      ) {
        overlayCanvas.width = videoRef.current.videoWidth;
        overlayCanvas.height = videoRef.current.videoHeight;
      }

      // 배경 투명화
      // ctx.clearRect(0, 0, overlayCanvas.width, overlayCanvas.height);
      if (videoRef.current) {
        ctx.drawImage(
          videoRef.current,
          0,
          0,
          overlayCanvas.width,
          overlayCanvas.height
        );
      }

      animationId = requestAnimationFrame(drawOverlay);
    };

    let animationId = requestAnimationFrame(drawOverlay);

    return () => cancelAnimationFrame(animationId);
  }, [isActive, videoRef, heartRate, confidence, trend]);

  return (
    <div className="relative w-full h-full">
      <video ref={videoRef} className="hidden" autoPlay playsInline muted />
      <canvas ref={canvasRef} className="hidden" />
      <div className="relative bg-black rounded-3xl overflow-hidden w-full h-full">
        <canvas
          ref={overlayCanvasRef}
          className="w-full h-full object-cover"
          style={{ display: isActive ? "block" : "none" }}
        />
        {!isActive && (
          <div className="w-full h-full flex flex-col items-center justify-center bg-[#1a1a1a] text-gray-400">
            <div className="w-20 h-20 rounded-full bg-[#2a2a2a] flex items-center justify-center mb-6">
              <svg
                className="w-10 h-10 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
            </div>
            <p className="text-xl font-medium">
              더 집중할 수 있는 환경에서 공부해보세요.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
