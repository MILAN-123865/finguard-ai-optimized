import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Copy, Check, RefreshCw, X, Shield, KeyRound, Sparkles } from 'lucide-react';
import { authApi } from '../../services/apiAuth';
import { SentEmailItem } from '../../types/auth';

interface MailSimulatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCode?: (code: string) => void;
}

export const MailSimulatorModal: React.FC<MailSimulatorModalProps> = ({
  isOpen,
  onClose,
  onSelectCode,
}) => {
  const [emails, setEmails] = useState<SentEmailItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const fetchEmails = async () => {
    setLoading(true);
    try {
      const list = await authApi.fetchSentEmails();
      setEmails(list);
    } catch (err) {
      console.warn('Failed to load sent emails:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchEmails();
    }
  }, [isOpen]);

  const handleCopyCode = (id: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    if (onSelectCode) onSelectCode(code);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="w-full max-w-xl bg-[#0a0d1a] border border-[#00daf3]/40 rounded-3xl p-6 text-white shadow-[0_0_50px_rgba(0,218,243,0.25)] flex flex-col max-h-[85vh] relative overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-[#00daf3]/10 border border-[#00daf3]/30 text-[#00daf3]">
                  <Mail size={22} />
                </div>
                <div>
                  <h2 className="text-lg font-bold flex items-center gap-2">
                    <span>FinGuard Mail Inbox Simulator</span>
                    <span className="px-2 py-0.5 rounded-full bg-[#00daf3]/20 border border-[#00daf3]/40 text-[#00daf3] text-[10px] font-mono">
                      NODEMAILER LOGS
                    </span>
                  </h2>
                  <p className="text-xs text-[#bac9cc] font-mono">
                    Real-time view of 6-digit OTP emails dispatched by custom backend
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={fetchEmails}
                  disabled={loading}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 hover:text-white transition-colors cursor-pointer"
                  title="Refresh inbox"
                >
                  <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
                </button>
                <button
                  onClick={onClose}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 hover:text-white transition-colors cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Email list */}
            <div className="flex-1 overflow-y-auto py-4 space-y-3.5 custom-scrollbar">
              {loading && emails.length === 0 ? (
                <div className="py-12 text-center text-xs text-[#bac9cc] font-mono">
                  Fetching Nodemailer transmission records...
                </div>
              ) : emails.length === 0 ? (
                <div className="py-12 text-center text-xs text-[#bac9cc] font-mono space-y-2">
                  <Mail size={32} className="mx-auto text-white/20" />
                  <p>No verification emails sent yet.</p>
                  <p className="text-[11px] text-white/40">Request a signup or forgot password OTP to view emails here!</p>
                </div>
              ) : (
                emails.map((email) => (
                  <div
                    key={email.id}
                    className="p-4 rounded-2xl bg-[#0e1329] border border-white/10 hover:border-[#00daf3]/40 transition-all space-y-3 relative group"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="px-2 py-0.5 rounded bg-[#6001d1]/20 border border-[#6001d1]/40 text-[#d2bbff] text-[10px] font-mono font-bold">
                            {email.type}
                          </span>
                          <span className="text-xs text-white/50 font-mono">
                            {new Date(email.sentAt).toLocaleTimeString()}
                          </span>
                        </div>
                        <h4 className="text-xs font-bold font-mono text-white">{email.subject}</h4>
                        <p className="text-[11px] text-[#bac9cc] font-mono mt-0.5">To: {email.to}</p>
                      </div>

                      {email.code && (
                        <div className="flex items-center gap-2 shrink-0">
                          <div className="px-3 py-1.5 rounded-xl bg-[#00daf3]/15 border border-[#00daf3]/50 text-[#00daf3] font-mono font-extrabold text-lg tracking-widest shadow-[0_0_15px_rgba(0,218,243,0.3)]">
                            {email.code}
                          </div>
                          <button
                            onClick={() => handleCopyCode(email.id, email.code!)}
                            className="p-2 rounded-xl bg-[#00daf3] text-[#00363d] font-bold text-xs hover:scale-105 transition-transform cursor-pointer flex items-center gap-1 shadow-md"
                          >
                            {copiedId === email.id ? <Check size={14} /> : <Copy size={14} />}
                            <span>{copiedId === email.id ? 'Copied' : 'Use'}</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-[#bac9cc]">
              <span>Tip: Clicking "Use" automatically copies the OTP</span>
              <button
                onClick={onClose}
                className="text-[#00daf3] hover:underline cursor-pointer font-bold"
              >
                Close Simulator
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
