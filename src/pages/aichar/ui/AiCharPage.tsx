import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Mic, Square, Music, Loader2 } from "lucide-react";
import { usePlayer } from "@/features/player";
import { Track } from "@/entities/music/model/types";

interface RecommendationResponse {
  emotion: string;
  confidence: number;
  emotion_description: string;
  recommendation_message: string;
  recommendations: Track[];
  emotion_details?: any;
}

export const AiCharPage = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [recommendations, setRecommendations] =
    useState<RecommendationResponse | null>(null);
  const [error, setError] = useState<string>("");

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const { playTrack } = usePlayer();
  const navigate = useNavigate();

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: "audio/webm;codecs=opus",
      });

      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/webm",
        });
        await analyzeAudio(audioBlob);
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start();
      setIsRecording(true);
      setError("");
    } catch (err) {
      setError("마이크 접근 권한이 필요합니다.");
      console.error("Error accessing microphone:", err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setIsAnalyzing(true);
    }
  };

  const analyzeAudio = async (audioBlob: Blob) => {
    try {
      const audioContext = new AudioContext();
      const arrayBuffer = await audioBlob.arrayBuffer();
      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

      const wavBlob = await audioBufferToWav(audioBuffer);

      const base64Audio = await blobToBase64(wavBlob);

      const response = await fetch(
        "http://localhost:8000/api/analyze-emotion",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            audioData: base64Audio.split(",")[1],
          }),
        }
      );

      if (!response.ok) {
        throw new Error("분석 중 오류가 발생했습니다.");
      }

      const data: RecommendationResponse = await response.json();
      setRecommendations(data);
      setError("");

      // 분석 완료 후 차트 페이지로 이동 (3초 후)
      setTimeout(() => {
        navigate("/aichart", { state: { recommendationData: data } });
      }, 3000);
    } catch (err) {
      setError(
        "음악 추천 중 오류가 발생했습니다. 백엔드 서버가 실행 중인지 확인해주세요."
      );
      console.error("Error analyzing audio:", err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const audioBufferToWav = (buffer: AudioBuffer): Promise<Blob> => {
    return new Promise((resolve) => {
      const numberOfChannels = buffer.numberOfChannels;
      const length = buffer.length * numberOfChannels * 2;
      const arrayBuffer = new ArrayBuffer(44 + length);
      const view = new DataView(arrayBuffer);

      const writeString = (offset: number, string: string) => {
        for (let i = 0; i < string.length; i++) {
          view.setUint8(offset + i, string.charCodeAt(i));
        }
      };

      const floatTo16BitPCM = (
        output: DataView,
        offset: number,
        input: Float32Array
      ) => {
        for (let i = 0; i < input.length; i++, offset += 2) {
          const s = Math.max(-1, Math.min(1, input[i]));
          output.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7fff, true);
        }
      };

      // WAV header
      writeString(0, "RIFF");
      view.setUint32(4, 36 + length, true);
      writeString(8, "WAVE");
      writeString(12, "fmt ");
      view.setUint32(16, 16, true);
      view.setUint16(20, 1, true);
      view.setUint16(22, numberOfChannels, true);
      view.setUint32(24, buffer.sampleRate, true);
      view.setUint32(28, buffer.sampleRate * numberOfChannels * 2, true);
      view.setUint16(32, numberOfChannels * 2, true);
      view.setUint16(34, 16, true);
      writeString(36, "data");
      view.setUint32(40, length, true);

      // PCM data
      let offset = 44;
      for (let i = 0; i < buffer.numberOfChannels; i++) {
        const channel = buffer.getChannelData(i);
        floatTo16BitPCM(view, offset, channel);
        if (numberOfChannels === 1) {
          offset += channel.length * 2;
        }
      }

      resolve(new Blob([arrayBuffer], { type: "audio/wav" }));
    });
  };

  const blobToBase64 = (blob: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  const handlePlayTrack = (track: Track) => {
    playTrack(track);
  };

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">AI 음악 추천</h1>
        <p className="text-gray-400 mb-8">
          음성을 분석하여 현재 감정에 어울리는 음악을 추천해드립니다.
        </p>

        {/* Recording Section */}
        <div className="bg-zinc-900 rounded-lg p-8 mb-8 text-center">
          <div className="mb-6">
            {isRecording ? (
              <div className="inline-flex items-center justify-center w-24 h-24 bg-red-500 rounded-full animate-pulse">
                <Mic className="w-12 h-12 text-white" />
              </div>
            ) : isAnalyzing ? (
              <div className="inline-flex items-center justify-center w-24 h-24 bg-blue-500 rounded-full">
                <Loader2 className="w-12 h-12 text-white animate-spin" />
              </div>
            ) : (
              <div className="inline-flex items-center justify-center w-24 h-24 bg-zinc-800 rounded-full">
                <Music className="w-12 h-12 text-gray-400" />
              </div>
            )}
          </div>

          <div className="mb-6">
            {isRecording && <p className="text-lg mb-2">녹음 중...</p>}
            {isAnalyzing && <p className="text-lg mb-2">분석 중...</p>}
            {!isRecording && !isAnalyzing && (
              <p className="text-lg mb-2">녹음 버튼을 눌러 음성을 녹음하세요</p>
            )}
            <p className="text-sm text-gray-400">
              5-10초 정도 말하거나 소리를 내시면 더 정확한 감정 분석을 받을 수
              있습니다.
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-500/20 border border-red-500 rounded-lg text-red-400">
              {error}
            </div>
          )}

          <div className="flex gap-4 justify-center">
            {!isRecording ? (
              <button
                onClick={startRecording}
                disabled={isAnalyzing}
                className="flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-full font-semibold transition"
              >
                <Mic className="w-5 h-5" />
                녹음 시작
              </button>
            ) : (
              <button
                onClick={stopRecording}
                className="flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 rounded-full font-semibold transition"
              >
                <Square className="w-5 h-5" />
                녹음 중지
              </button>
            )}
          </div>
        </div>

        {/* Recommendations Section */}
        {recommendations && (
          <div className="bg-zinc-900 rounded-lg p-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">
                {recommendations.emotion_description}
              </h2>
              <p className="text-sm text-gray-500 mb-3">
                감정: {recommendations.emotion} | 신뢰도:{" "}
                {(recommendations.confidence * 100).toFixed(1)}%
              </p>
              <p className="text-gray-400 whitespace-pre-line">
                {recommendations.recommendation_message}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recommendations.recommendations.map((track) => (
                <div
                  key={track.id}
                  className="bg-zinc-800 rounded-lg p-4 hover:bg-zinc-700 transition cursor-pointer group"
                  onClick={() => handlePlayTrack(track)}
                >
                  <div className="aspect-square bg-zinc-700 rounded-lg mb-3 overflow-hidden relative">
                    {track.coverUrl.startsWith("http") ||
                    track.coverUrl.startsWith("/images") ? (
                      <img
                        src={track.coverUrl}
                        alt={track.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Music className="w-16 h-16 text-gray-500" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition">
                        <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                          <svg
                            className="w-6 h-6 text-black ml-1"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                  <h3 className="font-semibold mb-1 truncate">{track.title}</h3>
                  <p className="text-sm text-gray-400 truncate">
                    {track.artist}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
