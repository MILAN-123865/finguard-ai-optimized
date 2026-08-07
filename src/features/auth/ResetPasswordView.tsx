import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Lock, Eye, EyeOff, ShieldAlert, ArrowRight, CheckCircle2, KeyRound, Mail } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { ToastContainer, ToastProps } from '../../components/ui/Toast';
import { MailSimulatorModal } from '../../components/common/MailSimulatorModal';

export const ResetPasswordView: React.FC = () => {
  const { resetPassword } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const prefilledEmail = (location.state as any)?.email || '';

  const [email, setEmail] = useState<string>(prefilledEmail);
  const [otp, setOtp] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
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

  const calculatePasswordRequirements = (pass: string) => {
    return {
      minLength: pass.length >= 8,
      uppercase: /[A-Z]/.test(pass),
      lowercase: /[a-z]/.test(pass),
      number: /[0-9]/.test(pass),
      specialChar: /[^A-Za-z0-9]/.test(pass),
    };
  };

  const reqs = calculatePasswordRequirements(newPassword);
  const isPasswordValid = reqs.minLength && reqs.uppercase && reqs.lowercase && reqs.number && reqs.specialChar;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!email.trim()) {
      setErrorMsg('Email address is required.');
      return;
    }
    if (!otp.trim() || otp.trim().length !== 6) {
      setErrorMsg('Please enter the 6-digit reset OTP code.');
      return;
    }
    if (!newPassword) {
      setErrorMsg('New Password is required.');
      return;
    }
    if (!isPasswordValid) {
      setErrorMsg('New password must meet security requirements.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setErrorMsg('Confirm password must match.');
      return;
    }

    setIsLoading(true);

    try {
      await resetPassword(email.trim(), otp.trim(), newPassword, confirmPassword);
      addToast('success', 'Password Updated!', 'Your security passcode has been updated. Please sign in.');
      setTimeout(() => {
        navigate('/login', { replace: true });
      }, 1200);
    } catch (err: any) {
      const serverErr = err?.response?.data?.error || err?.message || 'Password reset failed.';
      setErrorMsg(serverErr);
      addToast('error', 'Reset Failed', serverErr);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectCodeFromSimulator = (code: string) => {
    if (code && code.length === 6) {
      setOtp(code);
      addToast('info', 'OTP Auto-filled', `6-digit reset code ${code} applied.`);
    }
  };

  return (
    <>
      <ToastContainer toasts={toasts} />
      <MailSimulatorModal
        isOpen={isMailModalOpen}
        onClose={() => setIsMailModalOpen(false)}
        onSelectCode={handleSelectCodeFromSimulator}
      />

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
              <span>SECURITY RECOVERY // RESET PASSCODE</span>
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
              <Lock size={26} />
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight">Set New Password</h1>
            <p className="text-xs text-[#bac9cc] font-mono mt-1">
              Enter your reset OTP and establish a high-entropy password
            </p>
          </div>

          {errorMsg && (
            <div className="mb-5 p-3.5 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono flex items-center gap-2">
              <ShieldAlert size={16} className="shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div className="space-y-1">
              <label className="text-xs font-mono text-[#bac9cc]">Registered Email <span className="text-red-400">*</span></label>
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

            {/* 6 Digit Reset OTP */}
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <label className="text-xs font-mono text-[#bac9cc]">6-Digit Recovery OTP <span className="text-red-400">*</span></label>
                <button
                  type="button"
                  onClick={() => setIsMailModalOpen(true)}
                  className="text-xs text-[#00daf3] hover:underline font-mono"
                >
                  View in Simulator
                </button>
              </div>
              <div className="relative">
                <KeyRound className="absolute left-3.5 top-3.5 text-[#bac9cc] w-4 h-4 pointer-events-none" />
                <input
                  type="text"
                  required
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                  placeholder="123456"
                  className="w-full bg-[#0a0d1c] border border-white/15 focus:border-[#00daf3] rounded-2xl py-3 pl-10 pr-4 text-sm text-[#00daf3] font-bold font-mono tracking-widest placeholder-white/30 focus:outline-none transition-all"
                />
              </div>
            </div>

            {/* New Password */}
            <div className="space-y-1">
              <label className="text-xs font-mono text-[#bac9cc]">New Master Password <span className="text-red-400">*</span></label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3.5 text-[#bac9cc] w-4 h-4 pointer-events-none" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-[#0a0d1c] border border-white/15 focus:border-[#00daf3] rounded-2xl py-3 pl-10 pr-10 text-sm text-white placeholder-white/30 focus:outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3.5 text-[#bac9cc] hover:text-white transition-colors cursor-pointer"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>

              {newPassword && (
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-[10px] font-mono grid grid-cols-2 gap-1 mt-1 text-white/50">
                  <span className={reqs.minLength ? 'text-emerald-400' : ''}>✓ Min 8 Chars</span>
                  <span className={reqs.uppercase ? 'text-emerald-400' : ''}>✓ Uppercase</span>
                  <span className={reqs.lowercase ? 'text-emerald-400' : ''}>✓ Lowercase</span>
                  <span className={reqs.number ? 'text-emerald-400' : ''}>✓ Number</span>
                  <span className={reqs.specialChar ? 'text-emerald-400' : ''}>✓ Special Char</span>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div className="space-y-1">
              <label className="text-xs font-mono text-[#bac9cc]">Confirm New Password <span className="text-red-400">*</span></label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3.5 text-[#bac9cc] w-4 h-4 pointer-events-none" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-[#0a0d1c] border border-white/15 focus:border-[#00daf3] rounded-2xl py-3 pl-10 pr-10 text-sm text-white placeholder-white/30 focus:outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3.5 top-3.5 text-[#bac9cc] hover:text-white transition-colors cursor-pointer"
                >
                  {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#00e5ff] via-[#00daf3] to-[#41e3fe] text-[#00363d] font-bold text-sm shadow-[0_0_25px_rgba(0,229,255,0.35)] hover:shadow-[0_0_35px_rgba(0,229,255,0.6)] transition-all flex items-center justify-center gap-2 cursor-pointer mt-2 ${
                isLoading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full border-2 border-[#00363d] border-t-transparent animate-spin" />
                  <span>Updating Password...</span>
                </div>
              ) : (
                <>
                  <span>Reset Password & Login</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>

            <div className="pt-4 border-t border-white/10 text-center">
              <Link to="/login" className="text-xs text-[#bac9cc] hover:text-[#00daf3] font-mono">
                Back to Login
              </Link>
            </div>
          </form>
        </motion.div>
      </div>
    </>
  );
};
