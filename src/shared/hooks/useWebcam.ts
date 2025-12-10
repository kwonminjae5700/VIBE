import { useEffect, useRef, useCallback, useState } from 'react';

export interface UseWebcamOptions {
  onFrameCapture?: (frame: ImageData) => void;
  onError?: (error: Error) => void;
  fps?: number;
}

export const useWebcam = (options?: UseWebcamOptions) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isActive, setIsActive] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const lastFrameTimeRef = useRef<number>(0);

  const fps = options?.fps || 30;
  const frameInterval = 1000 / fps;

  // 웹캠 시작
  const startWebcam = useCallback(async () => {
    try {
      if (!videoRef.current) return;

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: 'user',
        },
      });

      videoRef.current.srcObject = stream;
      
      // 비디오 재생 시작
      await new Promise<void>((resolve) => {
        const onLoadedMetadata = () => {
          videoRef.current?.removeEventListener('loadedmetadata', onLoadedMetadata);
          resolve();
        };
        videoRef.current?.addEventListener('loadedmetadata', onLoadedMetadata);
      });

      await videoRef.current.play();
      setIsActive(true);
      setError(null);

      captureFrame();
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      setError(error);
      options?.onError?.(error);
      setIsActive(false);
    }
  }, [options]);

  // 웹캠 중지
  const stopWebcam = useCallback(() => {
    if (videoRef.current?.srcObject instanceof MediaStream) {
      videoRef.current.srcObject.getTracks().forEach(track => {
        track.stop();
      });
    }
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    setIsActive(false);
  }, []);

  // 프레임 캡처
  const captureFrame = useCallback(() => {
    const now = Date.now();

    if (now - lastFrameTimeRef.current >= frameInterval) {
      if (!videoRef.current || !canvasRef.current) {
        animationFrameRef.current = requestAnimationFrame(captureFrame);
        return;
      }

      const ctx = canvasRef.current.getContext('2d');
      if (!ctx) {
        animationFrameRef.current = requestAnimationFrame(captureFrame);
        return;
      }

      // Canvas 크기 설정
      canvasRef.current.width = videoRef.current.videoWidth;
      canvasRef.current.height = videoRef.current.videoHeight;

      // 비디오 프레임 그리기
      ctx.drawImage(videoRef.current, 0, 0);

      // ImageData 추출
      const imageData = ctx.getImageData(
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );

      options?.onFrameCapture?.(imageData);
      lastFrameTimeRef.current = now;
    }

    animationFrameRef.current = requestAnimationFrame(captureFrame);
  }, [frameInterval, options]);

  // 정리
  useEffect(() => {
    return () => {
      stopWebcam();
    };
  }, [stopWebcam]);

  return {
    videoRef,
    canvasRef,
    isActive,
    error,
    startWebcam,
    stopWebcam,
  };
};
