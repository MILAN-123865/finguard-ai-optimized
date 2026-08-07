import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Mail, ArrowRight, ShieldAlert, KeyRound, MailCheck, Sparkles } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { ToastContainer, ToastProps } from '../../components/ui/Toast';
import { MailSimulatorModal } from '../../components/common/MailSimulatorModal';

export const ForgotPasswordView: React.FC = () => {
  const { forgotPassword } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [toasts, setToasts] = useState<ToastProps[]>([]);
  const [isMailModalOpen, setIsMailModalOpen] = useState<boolean>(false);

  const addToast = (type: 'success' | 'error' | 'info' | 'warning', title: string, message: string) => {
    const id = 'toast_' + Date.now();
    setToasts(prev => [
      ...prev,
      {
        id,
        type,
        title,
        message,
        duration: 4500,
        onClose: (removeId) => setToasts(p => p.filter(t => t.id !== removeId))
      }
    ]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!email.trim()) {
      setErrorMsg('Email address is required.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    setIsLoading(true);

    try {
      await forgotPassword(email.trim());
      setIsSuccess(true);
      addToast('success', 'Reset Code Dispatched', 'Password reset code has been sent to your email.');
    } catch (err: any) {
      const serverErr = err?.response?.data?.error || err?.message || 'Failed to request password reset.';
      setErrorMsg(serverErr);
      addToast('error', 'Request Failed', serverErr);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <ToastContainer toasts={toasts} />
      <MailSimulatorModal isOpen={isMailModalOpen} onClose={() => setIsMailModalOpen(false)} />

      <div className="w-full max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="glass-card rounded-3xl p-7 sm:p-8 border border-[#00e5ff]/40 shadow-[0_20px_60px_rgba(0,0,0,0.8)] relative overflow-hidden backdrop-blur-2xl bg-[#0a0d1a]/90 text-white"
        >
          {/* Header */}
          <div className="flex items-center justify-between text-[10px] font-mono text-[#00daf3]/80 mb-6 pb-2 border-b border-white/10">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00daf3] animate-ping" />
              <span>SECURITY RECOVERY // FORGOT PASSCODE</span>
            </div>
            <button
              onClick={() => setIsMailModalOpen(true)}
              className="text-[#00daf3] hover:underline flex items-center gap-1 cursor-pointer font-bold"
            >
              <Mail size={12} />
              <span>SIMULATOR</span>
            </button>
          </div>

          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-[#00e5ff]/20 via-[#00daf3]/10 to-[#6001d1]/20 border border-[#00e5ff]/40 text-[#00daf3] mb-3 shadow-[0_0_20px_rgba(0,229,255,0.3)]">
              <KeyRound size={26} />
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight">Reset Your Password</h1>
            <p className="text-xs text-[#bac9cc] font-mono mt-1">
              Enter your registered email to receive a 6-digit recovery OTP
            </p>
          </div>

          {errorMsg && (
            <div className="mb-5 p-3.5 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono flex items-center gap-2">
              <ShieldAlert size={16} className="shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {isSuccess ? (
            <div className="py-4 text-center space-y-5">
              <div className="w-16 h-16 rounded-full bg-[#00daf3]/15 border border-[#00daf3] text-[#00daf3] flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(0,218,243,0.4)] animate-bounce">
                <MailCheck size={32} />
              </div>
              <div>
                <h3 className="text-xl font-extrabold">Password Reset Code Sent</h3>
                <p className="text-xs text-[#bac9cc] font-mono mt-1.5">
                  We've sent a 6-digit password reset OTP code to:
                </p>
                <p className="text-sm font-bold font-mono text-[#00daf3] mt-1 bg-[#00daf3]/10 py-1.5 px-3 rounded-xl border border-[#00daf3]/30 inline-block">
                  {email}
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <button
                  type="button"
                  onClick={() => navigate('/reset-password', { state: { email } })}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#00e5ff] via-[#00daf3] to-[#41e3fe] text-[#00363d] font-bold text-sm shadow-[0_0_25px_rgba(0,229,255,0.35)] hover:shadow-[0_0_35px_rgba(0,229,255,0.6)] transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Proceed to Reset Password Page</span>
                  <ArrowRight size={16} />
                </button>

                <button
                  type="button"
                  onClick={() => setIsMailModalOpen(true)}
                  className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-bold font-mono text-white transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Mail size={14} className="text-[#00daf3]" />
                  <span>Open Email Simulator</span>
                </button>

                <Link to="/login" className="block text-center text-xs text-[#bac9cc] hover:text-[#00daf3] pt-2 font-mono">
                  Back to Login
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-[#bac9cc] block">
                  Registered Email Address <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-3.5 text-[#bac9cc] w-4 h-4 pointer-events-none" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="agent@finguard.ai"
                    className="w-full bg-[#0a0d1c] border border-white/15 focus:border-[#00daf3] rounded-2xl py-3 pl-10 pr-4 text-sm text-white placeholder-white/30 focus:outline-none transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#00e5ff] via-[#00daf3] to-[#41e3fe] text-[#00363d] font-bold text-sm shadow-[0_0_25px_rgba(0,229,255,0.35)] hover:shadow-[0_0_35px_rgba(0,229,255,0.6)] transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  isLoading ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full border-2 border-[#00363d] border-t-transparent animate-spin" />
                    <span>Generating Recovery OTP...</span>
                  </div>
                ) : (
                  <>
                    <span>Send Password Reset OTP</span>
                    <ArrowRight size={16} />
                  </>
                )}
              </button>

              <div className="pt-4 border-t border-white/10 text-center">
                <Link to="/login" className="text-xs text-[#bac9cc] hover:text-[#00daf3] font-mono">
                  Remember your password? Sign In
                </Link>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </>
  );
};
