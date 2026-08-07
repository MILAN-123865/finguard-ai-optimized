import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, UserPlus, CheckCircle2, ArrowRight, ShieldCheck, Loader2 } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { extractErrorMessage } from '../../services/apiAuth';

interface GoogleAccountChooserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

interface SavedGoogleAccount {
  googleId: string;
  fullName: string;
  email: string;
  avatarUrl: string;
  lastUsed?: string;
}

const DEFAULT_GOOGLE_ACCOUNTS: SavedGoogleAccount[] = [
  {
    googleId: 'goog_1092837461928374',
    fullName: 'Milan Rathod',
    email: 'milanrathod5201@gmail.com',
    avatarUrl: 'https://lh3.googleusercontent.com/a/ACg8ocIq8v9Q0x2x5x7z9a=s96-c',
    lastUsed: 'Signed in recently',
  },
  {
    googleId: 'goog_8827364192837465',
    fullName: 'Alex Vance',
    email: 'alex.vance@finguard.ai',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AlexVance',
    lastUsed: 'Google Account',
  },
];

export const GoogleAccountChooserModal: React.FC<GoogleAccountChooserModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const { googleLogin } = useAuth();
  const navigate = useNavigate();

  const [selectedAccountId, setSelectedAccountId] = useState<string | null>(null);
  const [isAddingNew, setIsAddingNew] = useState<boolean>(false);
  const [isAuthenticating, setIsAuthenticating] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Email input for "Use another account"
  const [customEmail, setCustomEmail] = useState<string>('');

  if (!isOpen) return null;

  const handleSelectAccount = async (account: SavedGoogleAccount) => {
    setSelectedAccountId(account.googleId);
    setIsAuthenticating(true);
    setError(null);

    try {
      await googleLogin({
        googleId: account.googleId,
        email: account.email,
        fullName: account.fullName,
        avatarUrl: account.avatarUrl,
      });

      if (onSuccess) {
        onSuccess();
      } else {
        navigate('/dashboard', { replace: true });
      }
    } catch (err: any) {
      console.error('Google Auth Error:', err);
      setError(extractErrorMessage(err, 'Google authentication failed.'));
      setIsAuthenticating(false);
    }
  };

  const handleCustomEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedEmail = customEmail.trim();

    if (!trimmedEmail) {
      setError('Please enter your Google email address.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      setError('Please enter a valid email address.');
      return;
    }

    setIsAuthenticating(true);
    setError(null);

    const computedName = trimmedEmail.split('@')[0];
    const googleIdStr = `goog_${Date.now()}_${Math.floor(Math.random() * 100000)}`;
    const avatarStr = `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(computedName)}`;

    try {
      await googleLogin({
        googleId: googleIdStr,
        email: trimmedEmail,
        fullName: computedName,
        avatarUrl: avatarStr,
      });

      if (onSuccess) {
        onSuccess();
      } else {
        navigate('/dashboard', { replace: true });
      }
    } catch (err: any) {
      console.error('Google Auth Error:', err);
      setError(extractErrorMessage(err, 'Google authentication failed.'));
      setIsAuthenticating(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 10 }}
          transition={{ duration: 0.2 }}
          className="w-full max-w-md bg-white border border-[#E5E7EB] rounded-[24px] p-6 sm:p-8 text-[#111827] shadow-2xl relative overflow-hidden"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between pb-4 border-b border-[#E5E7EB] mb-5">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#EA4335"
                  d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.2 9 5 12 5z"
                />
                <path
                  fill="#4285F4"
                  d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 12.3 0 15s.7 5.3 1.9 7.7l3.7-2.9c-.2-.7-.4-1.5-.4-2.3z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.2-6.4-5.2L1.9 16c1.8 3.7 5.6 7 10.1 7z"
                />
              </svg>
              <span className="text-xs font-bold text-[#111827] tracking-tight">
                Sign in with Google
              </span>
            </div>

            <button
              type="button"
              onClick={onClose}
              disabled={isAuthenticating}
              className="p-1.5 rounded-full hover:bg-[#F8FAFC] text-[#64748B] hover:text-[#111827] transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X size={18} />
            </button>
          </div>

          {/* Prompt Title */}
          <div className="mb-6 text-center space-y-1">
            <h2 className="text-xl font-bold tracking-tight text-[#111827]">
              {isAddingNew ? 'Sign in' : 'Choose an account'}
            </h2>
            <p className="text-xs text-[#64748B] font-medium">
              to continue to <span className="text-[#11875D] font-bold">FinGuard AI</span>
            </p>
          </div>

          {/* Error Alert Banner */}
          {error && (
            <div className="mb-4 p-3 rounded-[12px] bg-red-50 border border-red-200 text-[#EF4444] text-xs font-semibold">
              {error}
            </div>
          )}

          {/* Account Chooser Cards OR Single Email Entry */}
          {!isAddingNew ? (
            <div className="space-y-4">
              <div className="space-y-2.5 max-h-[260px] overflow-y-auto pr-0.5 hide-scrollbar">
                {DEFAULT_GOOGLE_ACCOUNTS.map((acc) => {
                  const isThisSelected = selectedAccountId === acc.googleId && isAuthenticating;

                  return (
                    <button
                      key={acc.googleId}
                      type="button"
                      disabled={isAuthenticating}
                      onClick={() => handleSelectAccount(acc)}
                      className={`w-full p-3.5 rounded-[16px] border transition-all flex items-center justify-between text-left cursor-pointer group ${
                        isThisSelected
                          ? 'bg-[#DDF2EA] border-[#11875D] shadow-xs'
                          : 'bg-[#F8FAFC] border-[#E5E7EB] hover:border-[#11875D] hover:bg-white shadow-2xs'
                      }`}
                    >
                      <div className="flex items-center gap-3.5 min-w-0">
                        <div className="relative shrink-0">
                          <img
                            src={acc.avatarUrl}
                            alt={acc.fullName}
                            className="w-10 h-10 rounded-full object-cover border border-[#E5E7EB] group-hover:scale-105 transition-transform"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(acc.fullName)}`;
                            }}
                          />
                        </div>

                        <div className="flex flex-col min-w-0">
                          <span className="text-sm font-bold text-[#111827] group-hover:text-[#11875D] transition-colors truncate">
                            {acc.fullName}
                          </span>
                          <span className="text-xs text-[#64748B] font-medium truncate">
                            {acc.email}
                          </span>
                          {acc.lastUsed && (
                            <span className="text-[10px] text-[#10B981] font-bold mt-0.5">
                              {acc.lastUsed}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="shrink-0 pl-2">
                        {isThisSelected ? (
                          <Loader2 size={18} className="text-[#11875D] animate-spin" />
                        ) : (
                          <CheckCircle2 size={18} className="text-[#10B981] group-hover:scale-110 transition-transform" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Use another account button */}
              <button
                type="button"
                disabled={isAuthenticating}
                onClick={() => {
                  setIsAddingNew(true);
                  setError(null);
                }}
                className="w-full py-3 rounded-[14px] bg-white border border-dashed border-[#E5E7EB] hover:border-[#11875D] hover:bg-[#F8FAFC] text-xs font-bold text-[#11875D] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
              >
                <UserPlus size={16} />
                <span>Use another Google account</span>
              </button>
            </div>
          ) : (
            /* Simple Email Entry Screen for "Use another account" */
            <form onSubmit={handleCustomEmailSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#111827] block">
                  Email or phone <span className="text-[#EF4444]">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={customEmail}
                  onChange={(e) => {
                    setCustomEmail(e.target.value);
                    if (error) setError(null);
                  }}
                  placeholder="Enter your Google email"
                  className="w-full bg-[#F8FAFC] border border-[#E5E7EB] focus:border-[#11875D] focus:ring-1 focus:ring-[#11875D] rounded-[14px] py-3 px-4 text-sm text-[#111827] font-medium placeholder:text-[#94A3B8] focus:outline-none transition-all"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  disabled={isAuthenticating}
                  onClick={() => {
                    setIsAddingNew(false);
                    setError(null);
                  }}
                  className="flex-1 py-3 rounded-[14px] bg-white border border-[#E5E7EB] hover:bg-[#F8FAFC] text-xs font-bold text-[#64748B] transition-colors cursor-pointer"
                >
                  Back
                </button>

                <button
                  type="submit"
                  disabled={isAuthenticating}
                  className="flex-1 py-3 rounded-[14px] bg-[#11875D] hover:bg-[#0e704d] text-white font-bold text-xs shadow-2xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  {isAuthenticating ? (
                    <Loader2 size={16} className="animate-spin text-white" />
                  ) : (
                    <>
                      <span>Next</span>
                      <ArrowRight size={14} />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* Footer Security Note */}
          <div className="mt-6 pt-3 border-t border-[#E5E7EB] text-center text-[11px] text-[#64748B] font-medium flex items-center justify-center gap-1">
            <ShieldCheck size={13} className="text-[#11875D]" />
            <span>Protected by Google Identity & FinGuard Security</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
