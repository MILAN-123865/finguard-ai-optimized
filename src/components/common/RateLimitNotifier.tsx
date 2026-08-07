import React, { useState, useEffect, useRef } from 'react';
import { ShieldAlert, RefreshCw } from 'lucide-react';

export const RateLimitNotifier: React.FC = () => {
  const [notice, setNotice] = useState<{ message: string; retryCount: number } | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleRateLimit = (e: Event) => {
      const customEvent = e as CustomEvent<{ message: string; retryCount: number }>;
      if (customEvent.detail) {
        if (timerRef.current) {
          clearTimeout(timerRef.current);
        }

        setNotice({
          message: customEvent.detail.message || 'API rate limit reached. Retrying automatically...',
          retryCount: customEvent.detail.retryCount || 1,
        });

        // Auto hide after 4 seconds
        timerRef.current = setTimeout(() => {
          setNotice(null);
        }, 4000);
      }
    };

    window.addEventListener('finguard_rate_limit', handleRateLimit);
    return () => {
      window.removeEventListener('finguard_rate_limit', handleRateLimit);
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  if (!notice) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-6 right-6 z-50 max-w-md bg-[#131b2e] border border-amber-500/40 rounded-xl p-4 shadow-2xl backdrop-blur-md flex items-center space-x-3 text-amber-300 animate-in fade-in slide-in-from-bottom-5 duration-300"
    >
      <div className="p-2 bg-amber-500/20 rounded-lg text-amber-400">
        <RefreshCw size={20} className="animate-spin" />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
          <ShieldAlert size={14} /> Rate Limit Handling (Attempt {notice.retryCount}/3)
        </h4>
        <p className="text-xs text-amber-200/80 mt-0.5 truncate">{notice.message}</p>
      </div>
    </div>
  );
};
