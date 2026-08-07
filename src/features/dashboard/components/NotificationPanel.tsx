import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Bell, ShieldAlert, Info, CheckCircle2, CheckCheck, 
  Search, Trash2, AlertTriangle, AlertCircle, RefreshCw, Filter 
} from 'lucide-react';
import { DashboardNotification } from '../services/dashboardService';

interface NotificationPanelProps {
  notifications: DashboardNotification[];
  isOpen: boolean;
  onClose: () => void;
  onMarkRead: (id: string) => void;
  onMarkAllRead: () => void;
}

export const NotificationPanel: React.FC<NotificationPanelProps> = ({
  notifications,
  isOpen,
  onClose,
  onMarkRead,
  onMarkAllRead,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [deletedIds, setDeletedIds] = useState<Set<string>>(new Set());
  
  // Simulated States
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      setHasError(false);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const simulateError = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setHasError(true);
    }, 500);
  };

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setDeletedIds(prev => new Set(prev).add(id));
  };

  const visibleNotifications = notifications.filter(n => {
    if (deletedIds.has(n.id)) return false;
    if (activeCategory !== 'All' && n.type !== activeCategory.toLowerCase()) return false;
    if (searchQuery && !n.title.toLowerCase().includes(searchQuery.toLowerCase()) && !n.message.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const unreadCount = visibleNotifications.filter((n) => !n.read).length;

  if (!isOpen) return null;

  return (
    <>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] lg:hidden"
      />
      
      <motion.div 
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed inset-y-0 right-0 w-full sm:w-[420px] bg-[#0a0d1a]/95 backdrop-blur-2xl border-l border-[#00e5ff]/30 z-[70] flex flex-col shadow-2xl"
      >
        {/* Header */}
        <div className="p-5 border-b border-white/10 shrink-0 bg-[#0a0d1a]">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#00daf3]/10 rounded-xl">
                <Bell size={20} className="text-[#00daf3]" />
              </div>
              <div>
                <h3 className="font-bold text-white">SOC Notifications</h3>
                <p className="text-[10px] text-[#bac9cc] font-mono uppercase">Telemetry Alerts</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={simulateError} className="p-2 rounded-xl bg-white/5 hover:bg-red-500/10 text-[#bac9cc] hover:text-red-400 transition-colors" title="Simulate Error">
                <AlertCircle size={16} />
              </button>
              <button onClick={onClose} className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-[#bac9cc] hover:text-white transition-colors">
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Search & Categories */}
          <div className="space-y-3">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#bac9cc]" />
              <input 
                type="text" 
                placeholder="Search alerts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-9 pr-3 text-xs text-white focus:outline-none focus:border-[#00daf3]/50"
              />
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pb-1 custom-scrollbar">
              {['All', 'Critical', 'Warning', 'Info'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1 rounded-full text-[10px] font-bold font-mono uppercase transition-colors whitespace-nowrap ${
                    activeCategory === cat 
                      ? 'bg-[#00daf3] text-[#0a0d1a]' 
                      : 'bg-white/5 text-[#bac9cc] hover:bg-white/10'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Actions Bar */}
        <div className="px-5 py-3 border-b border-white/5 flex justify-between items-center bg-[#0f1321]/50 shrink-0">
          <span className="text-xs text-[#bac9cc] font-bold flex items-center gap-1">
             <Filter size={14} /> {unreadCount} Unread
          </span>
          <button
            onClick={onMarkAllRead}
            className="text-[#00daf3] hover:text-white text-xs font-bold flex items-center gap-1.5 transition-colors"
          >
            <CheckCheck size={14} />
            Mark All Read
          </button>
        </div>

        {/* Notification List */}
        <div className="flex-1 overflow-y-auto p-5 custom-scrollbar">
          {isLoading ? (
            <div className="space-y-3">
              {[1, 2, 3].map(i => (
                <div key={i} className="p-4 rounded-2xl bg-white/5 border border-white/5 animate-pulse flex gap-3">
                   <div className="w-8 h-8 rounded-full bg-white/10 shrink-0" />
                   <div className="flex-1 space-y-2">
                     <div className="h-4 bg-white/10 rounded w-1/2" />
                     <div className="h-3 bg-white/5 rounded w-full" />
                     <div className="h-3 bg-white/5 rounded w-3/4" />
                   </div>
                </div>
              ))}
            </div>
          ) : hasError ? (
            <div className="h-full flex flex-col items-center justify-center opacity-80 space-y-3">
              <div className="p-4 rounded-full bg-red-500/10 text-red-400">
                <AlertCircle size={32} />
              </div>
              <p className="text-sm font-bold text-white">Sync Failed</p>
              <button onClick={() => setHasError(false)} className="text-xs text-[#00daf3] flex items-center gap-1 hover:underline">
                <RefreshCw size={12} /> Retry
              </button>
            </div>
          ) : visibleNotifications.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center opacity-50 space-y-4">
              <div className="relative">
                <CheckCircle2 size={48} className="text-[#00daf3]" />
                <motion.div 
                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }} 
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="absolute inset-0 rounded-full border-2 border-[#00daf3]"
                />
              </div>
              <div className="text-center">
                <p className="text-sm font-bold text-white">All Caught Up</p>
                <p className="text-xs text-[#bac9cc]">No active alerts match your criteria.</p>
              </div>
            </div>
          ) : (
            <AnimatePresence initial={false}>
              <div className="space-y-3">
                {visibleNotifications.map((notif) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95, x: 20 }}
                    key={notif.id}
                    onClick={() => onMarkRead(notif.id)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer relative group ${
                      notif.read
                        ? 'bg-white/5 border-white/5 opacity-70'
                        : 'bg-[#12172b] border-[#00e5ff]/30 hover:border-[#00e5ff]/60 shadow-[0_4px_20px_rgba(0,229,255,0.05)]'
                    }`}
                  >
                    {!notif.read && (
                      <span className="absolute top-4 -left-1 w-2 h-2 rounded-full bg-[#00daf3] shadow-[0_0_8px_#00e5ff]" />
                    )}
                    <div className="flex justify-between items-start gap-2 mb-1.5">
                      <div className="flex items-center gap-2">
                        {notif.type === 'critical' ? <ShieldAlert size={14} className="text-red-400 shrink-0" /> :
                         notif.type === 'warning' ? <AlertTriangle size={14} className="text-amber-400 shrink-0" /> :
                         <Info size={14} className="text-[#00daf3] shrink-0" />}
                        <span
                          className={`font-bold text-xs  line-clamp-1 ${
                            notif.type === 'critical'
                              ? 'text-red-400'
                              : notif.type === 'warning'
                              ? 'text-amber-400'
                              : 'text-[#00daf3]'
                          }`}
                        >
                          {notif.title}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-[10px] font-mono text-[#bac9cc]">
                          {notif.timestamp}
                        </span>
                        <button 
                          onClick={(e) => handleDelete(e, notif.id)}
                          className="text-[#bac9cc] hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                    <p className="text-xs text-[#dfe1f6] leading-relaxed pl-6">
                      {notif.message}
                    </p>
                  </motion.div>
                ))}
              </div>
            </AnimatePresence>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/10 text-center bg-[#0a0d1a] shrink-0">
          <p className="text-[10px] font-mono text-[#bac9cc] uppercase flex items-center justify-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00daf3] animate-pulse" />
            FinGuard SOC Telemetry Engine
          </p>
        </div>
      </motion.div>
    </>
  );
};
