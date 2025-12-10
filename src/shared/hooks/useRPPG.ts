import { useEffect, useRef, useCallback, useState } from 'react';
import { tensor3d, image } from '@tensorflow/tfjs';
import TensorStore from '../../../lib/tensorStore';
import Preprocessor from '../../../lib/preprocessor';
import Posprocessor from '../../../lib/posprocessor';

export interface UseRPPGOptions {
  onHeartRateUpdate?: (data: number | number[]) => void;
  onError?: (error: Error) => void;
}

export const useRPPG = (options?: UseRPPGOptions) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const preprocessorRef = useRef<Preprocessor | null>(null);
  const posprocessorRef = useRef<Posprocessor | null>(null);
  const lastProcessedIndexRef = useRef<number>(0);

  // rPPG 신호 처리 초기화
  const initializeRPPG = useCallback(async () => {
    try {
      if (isInitialized) return;

      // Tensor Store 초기화
      TensorStore.reset();
      lastProcessedIndexRef.current = 0;

      // Posprocessor 초기화 및 모델 로드
      const posprocessor = new Posprocessor(TensorStore);
      await posprocessor.loadModel();
      posprocessorRef.current = posprocessor;

      // Preprocessor 초기화
      const preprocessor = new Preprocessor(TensorStore, posprocessor);
      preprocessorRef.current = preprocessor;

      setIsInitialized(true);
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error));
      options?.onError?.(err);
      setIsInitialized(false);
    }
  }, [isInitialized, options]);

  // 프레임 처리
  const processFrame = useCallback((frame: ImageData) => {
    if (!preprocessorRef.current) return;

    try {
      const data = new Uint8Array(frame.data);
      const imageTensor = tensor3d(data, [frame.height, frame.width, 4], 'int32');
      const rgbTensor = imageTensor.slice([0, 0, 0], [-1, -1, 3]);
      const resizedTensor = image.resizeBilinear(rgbTensor as any, [36, 36]);

      TensorStore.addRawTensor(resizedTensor as any);
      imageTensor.dispose();
      rgbTensor.dispose();

      // rPPG 신호 처리
      const currentLength = TensorStore.rppgPltData.length;
      if (currentLength > lastProcessedIndexRef.current) {
        const newSignal = TensorStore.rppgPltData.slice(lastProcessedIndexRef.current);
        lastProcessedIndexRef.current = currentLength;
        
        if (newSignal.length > 0) {
          options?.onHeartRateUpdate?.(newSignal);
        }
      }
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error));
      options?.onError?.(err);
    }
  }, [options]);

  // 처리 시작
  const startProcessing = useCallback(() => {
    if (!preprocessorRef.current) return;

    preprocessorRef.current.startProcess();
    setIsProcessing(true);
  }, []);

  // 처리 중단
  const stopProcessing = useCallback(() => {
    if (!preprocessorRef.current) return;

    preprocessorRef.current.stopProcess();
    setIsProcessing(false);
    TensorStore.reset();
    lastProcessedIndexRef.current = 0;
  }, []);

  // 정리
  useEffect(() => {
    return () => {
      stopProcessing();
    };
  }, [stopProcessing]);

  return {
    isInitialized,
    isProcessing,
    initializeRPPG,
    processFrame,
    startProcessing,
    stopProcessing,
  };
};
