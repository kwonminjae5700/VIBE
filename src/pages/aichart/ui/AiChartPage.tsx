import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { TrendingUp, Music, Play, BarChart2 } from 'lucide-react';
import { usePlayer } from '@/features/player';
import { Track } from '@/entities/music/model/types';

export const AiChartPage = () => {
  const location = useLocation();
  const [recommendations, setRecommendations] = useState<Track[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const { playTrack } = usePlayer();

  useEffect(() => {
    const routerState = location.state as { recommendationData?: any };
    if (routerState?.recommendationData) {
      setRecommendations(routerState.recommendationData.recommendations || []);
    }
  }, [location]);

  const handlePlayTrack = (track: Track) => {
    playTrack(track);
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex-1 overflow-y-auto pb-32 bg-black">
      <div className="max-w-[1800px] mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <BarChart2 className="w-10 h-10 text-[#ff3c6e]" />
            <h1 className="text-4xl font-extrabold text-white">AI-MUSIC 차트</h1>
          </div>
          <p className="text-gray-400 text-lg">
            AI가 분석한 감정별 음악을 확인해보세요
          </p>
        </div>


        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-500 rounded-lg text-red-400">
            {error}
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#ff3c6e]"></div>
          </div>
        )}

        {/* Chart List */}
        {!isLoading && recommendations.length > 0 && (
          <div className="bg-zinc-900 rounded-lg overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-[60px_1fr_1fr_1fr_100px] gap-4 px-6 py-4 border-b border-zinc-800 text-gray-400 text-sm font-semibold">
              <div className="text-center">#</div>
              <div>곡 정보</div>
              <div>아티스트</div>
              <div>앨범</div>
              <div className="text-center">재생시간</div>
            </div>

            {/* Chart Items */}
            {recommendations.map((track, index) => (
              <div
                key={track.id}
                className="grid grid-cols-[60px_1fr_1fr_1fr_100px] gap-4 px-6 py-4 border-b border-zinc-800 hover:bg-zinc-800 transition group cursor-pointer"
                onClick={() => handlePlayTrack(track)}
              >
                {/* Rank */}
                <div className="flex items-center justify-center">
                  <span className="text-xl font-bold text-white group-hover:hidden">
                    {index + 1}
                  </span>
                  <Play className="w-6 h-6 text-[#ff3c6e] hidden group-hover:block" />
                </div>

                {/* Track Info */}
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-zinc-700 rounded overflow-hidden flex-shrink-0">
                    {track.coverUrl.startsWith('http') || track.coverUrl.startsWith('/images') ? (
                      <img
                        src={track.coverUrl}
                        alt={track.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          const parent = e.currentTarget.parentElement;
                          if (parent) {
                            const icon = document.createElement('div');
                            icon.className = 'w-full h-full flex items-center justify-center';
                            icon.innerHTML = '<svg class="w-6 h-6 text-gray-500" fill="currentColor" viewBox="0 0 20 20"><path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z"/></svg>';
                            parent.appendChild(icon);
                          }
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Music className="w-6 h-6 text-gray-500" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-white truncate">{track.title}</div>
                    <div className="text-sm text-gray-400 truncate flex items-center gap-2">
                      {index < 3 && (
                        <TrendingUp className="w-4 h-4 text-[#ff3c6e]" />
                      )}
                      인기 상승 중
                    </div>
                  </div>
                </div>

                {/* Artist */}
                <div className="flex items-center">
                  <span className="text-gray-300 truncate">{track.artist}</span>
                </div>

                {/* Album */}
                <div className="flex items-center">
                  <span className="text-gray-400 truncate">{track.album}</span>
                </div>

                {/* Duration */}
                <div className="flex items-center justify-center text-gray-400">
                  {formatDuration(track.duration)}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && recommendations.length === 0 && !error && (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <Music className="w-20 h-20 mb-4" />
            <p className="text-xl">추천 음악이 없습니다</p>
          </div>
        )}
      </div>
    </div>
  );
};
