import React, { useState, useEffect } from 'react';
import { Shield } from 'lucide-react';

export const extractYouTubeId = (url: string): string => {
  if (!url) return '';
  const cleanUrl = url.trim();
  const match = cleanUrl.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=)|youtube-nocookie\.com\/embed\/)([\w-]{11})/);
  if (match && match[1]) return match[1];
  if (/^[\w-]{11}$/.test(cleanUrl)) return cleanUrl;
  return '';
};

export const getYouTubeThumbnail = (urlOrId: string, quality: 'max' | 'hq' | 'mq' = 'max'): string => {
  const videoId = extractYouTubeId(urlOrId);
  if (!videoId) return '';
  if (quality === 'max') return `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`;
  if (quality === 'hq') return `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
  return `https://i.ytimg.com/vi/${videoId}/mqdefault.jpg`;
};

interface ThumbnailImageProps {
  videoUrl?: string;
  thumbnailUrl?: string;
  alt: string;
  className?: string;
  fallbackCategory?: string;
  onLoadSuccess?: () => void;
  onErrorAll?: () => void;
}

export const ThumbnailImage: React.FC<ThumbnailImageProps> = ({
  videoUrl = '',
  thumbnailUrl = '',
  alt,
  className = '',
  fallbackCategory = 'Security',
  onLoadSuccess,
  onErrorAll
}) => {
  const videoId = extractYouTubeId(videoUrl);

  // Build candidate URLs list
  const candidateUrls: string[] = [];
  if (thumbnailUrl && typeof thumbnailUrl === 'string' && thumbnailUrl.trim().startsWith('http')) {
    candidateUrls.push(thumbnailUrl.trim());
  }
  if (videoId) {
    candidateUrls.push(`https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`);
    candidateUrls.push(`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`);
    candidateUrls.push(`https://i.ytimg.com/vi/${videoId}/mqdefault.jpg`);
  }

  const [stage, setStage] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(candidateUrls.length > 0);
  const [hasFailedAll, setHasFailedAll] = useState<boolean>(candidateUrls.length === 0);

  useEffect(() => {
    if (candidateUrls.length === 0) {
      setHasFailedAll(true);
      setIsLoading(false);
      if (onErrorAll) {
        onErrorAll();
      }
    }
  }, [candidateUrls.length, onErrorAll]);

  const handleImgError = () => {
    if (stage + 1 < candidateUrls.length) {
      setStage(prev => prev + 1);
    } else {
      setHasFailedAll(true);
      setIsLoading(false);
      if (onErrorAll) {
        onErrorAll();
      }
    }
  };

  const handleImgLoad = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const img = e.currentTarget;
    // YouTube returns a 120x90 grey image placeholder when a specific resolution is unavailable
    if (img.naturalWidth <= 120) {
      if (stage + 1 < candidateUrls.length) {
        setStage(prev => prev + 1);
      } else {
        setHasFailedAll(true);
        setIsLoading(false);
        if (onErrorAll) {
          onErrorAll();
        }
      }
    } else {
      setIsLoading(false);
      if (onLoadSuccess) {
        onLoadSuccess();
      }
    }
  };

  if (hasFailedAll) {
    if (onErrorAll) {
      return null;
    }
    // Gradient fallback if no onErrorAll handler was supplied
    return (
      <div className={`w-full h-full bg-gradient-to-br from-[#0c1024] via-[#101735] to-[#080b1a] flex flex-col items-center justify-center p-4 relative overflow-hidden select-none border border-white/10 ${className}`}>
        <div className="absolute inset-0 bg-[radial-gradient(#00daf3_1px,transparent_1px)] [background-size:12px_12px] opacity-15 pointer-events-none" />
        <div className="w-10 h-10 rounded-2xl bg-[#00daf3]/10 border border-[#00daf3]/30 text-[#00daf3] flex items-center justify-center mb-2 shadow-[0_0_15px_rgba(0,218,243,0.3)] shrink-0">
          <Shield size={20} />
        </div>
        <span className="text-[10px] font-mono font-bold text-[#00daf3] uppercase tracking-wider mb-1">
          {fallbackCategory}
        </span>
        <p className="text-xs font-bold text-white text-center line-clamp-2 max-w-[90%] leading-tight">
          {alt}
        </p>
      </div>
    );
  }

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      {/* Loading Skeleton */}
      {isLoading && (
        <div className="absolute inset-0 z-10 bg-[#0d1226] animate-pulse flex flex-col items-center justify-center p-3">
          <div className="w-8 h-8 rounded-full border-2 border-[#00daf3]/30 border-t-[#00daf3] animate-spin mb-2" />
          <span className="text-[10px] font-mono text-[#00daf3]/70 uppercase tracking-widest font-semibold">
            Loading Media...
          </span>
        </div>
      )}
      <img
        key={candidateUrls[stage]}
        src={candidateUrls[stage]}
        alt={alt}
        onLoad={handleImgLoad}
        onError={handleImgError}
        referrerPolicy="no-referrer"
        className={`w-full h-full object-cover transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        loading="lazy"
      />
    </div>
  );
};


