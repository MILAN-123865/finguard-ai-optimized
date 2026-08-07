import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { MailCheck, RefreshCw, ArrowRight, ShieldCheck, Mail, KeyRound, ShieldAlert } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { ToastContainer, ToastProps } from '../../components/ui/Toast';
import { MailSimulatorModal } from '../../components/common/MailSimulatorModal';

export const EmailVerificationView: React.FC = () => {
  const { verifyEmail, resendOTP, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const emailParam = (location.state as any)?.email || user?.email || '';

  const [email, setEmail] = useState<string>(emailParam);
  const [otpValues, setOtpValues] = useState<string[]>(['', '', '', '', '', '']);
  const [timerSeconds, setTimerSeconds] = useState<number>(60);
  const [canResend, setCanResend] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [resendLoading, setResendLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [toasts, setToasts] = useState<ToastProps[]>([]);
  const [isMailModalOpen, setIsMailModalOpen] = useState<boolean>(false);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

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

  // Timer Countdown Effect
  useEffect(() => {
    let interval: any = null;
    if (timerSeconds > 0) {
      setCanResend(false);
      interval = setInterval(() => {
        setTimerSeconds(prev => prev - 1);
      }, 1000);
    } else {
      setCanResend(true);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerSeconds]);

  // Handle auto-pasting or typing OTP
  const handleOtpChange = (index: number, val: string) => {
    if (val.length > 1) {
      // Pasted full 6-digit code
      const pastedDigits = val.replace(/\D/g, '').slice(0, 6).split('');
      const newOtp = [...otpValues];
      pastedDigits.forEach((digit, idx) => {
        if (idx < 6) newOtp[idx] = digit;
      });
      setOtpValues(newOtp);
      const nextIndex = Math.min(pastedDigits.length, 5);
      inputRefs.current[nextIndex]?.focus();
      return;
    }

    const digit = val.replace(/\D/g, '');
    const newOtp = [...otpValues];
    newOtp[index] = digit;
    setOtpValues(newOtp);

    if (digit && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otpValues[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const fullOtpCode = otpValues.join('');

  const handleVerify = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErrorMsg(null);

    if (!email.trim()) {
      setErrorMsg('Email address is required for verification.');
      return;
    }

    if (fullOtpCode.length < 6) {
      setErrorMsg('Please enter the full 6-digit verification code.');
      return;
    }

    setIsLoading(true);

    try {
      await verifyEmail(email.trim(), fullOtpCode);
      addToast('success', 'Email Verified Successfully!', 'Identity confirmed. Accessing Dashboard...');
      setTimeout(() => {
        navigate('/dashboard', { replace: true });
      }, 700);
    } catch (err: any) {
      const serverErr = err?.response?.data?.error || err?.message || 'Verification failed.';
      setErrorMsg(serverErr);
      addToast('error', 'Verification Error', serverErr);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (!email.trim()) return;
    setResendLoading(true);
    setErrorMsg(null);

    try {
      await resendOTP(email.trim());
      addToast('success', 'Code Dispatched', `A new 6-digit verification code has been sent to ${email.trim()}`);
      setTimerSeconds(60);
      setCanResend(false);
      setOtpValues(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
    } catch (err: any) {
      const serverErr = err?.response?.data?.error || err?.message || 'Failed to resend verification code.';
      setErrorMsg(serverErr);
      addToast('error', 'Resend Error', serverErr);
    } finally {
      setResendLoading(false);
    }
  };

  // Callback from Mail Simulator Modal when user clicks "Use"
  const handleSelectCodeFromSimulator = (code: string) => {
    if (code && code.length === 6) {
      const digits = code.split('');
      setOtpValues(digits);
      addToast('info', 'OTP Auto-filled', `6-digit code ${code} applied from Simulator.`);
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
          {/* Top header bar */}
          <div className="flex items-center justify-between text-[10px] font-mono text-[#00daf3]/80 mb-6 pb-2 border-b border-white/10">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00daf3] animate-ping" />
              <span>EMAIL VERIFICATION REQUIRED</span>
            </div>
            <button
              onClick={() => setIsMailModalOpen(true)}
              className="text-[#00daf3] hover:underline flex items-center gap-1 cursor-pointer font-bold"
            >
              <Mail size={12} />
              <span>SIMULATED INBOX</span>
            </button>
          </div>

          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#00e5ff]/20 via-[#00daf3]/10 to-[#6001d1]/20 border border-[#00e5ff]/40 text-[#00daf3] mb-3 shadow-[0_0_25px_rgba(0,229,255,0.3)]">
              <KeyRound size={30} />
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight">Verify Your Email</h1>
            <p className="text-xs text-[#bac9cc] font-mono mt-1.5">
              Enter 6 Digit OTP sent to <span className="text-[#00daf3] font-bold">{email || 'your email'}</span>
            </p>
          </div>

          {/* Email input field if missing */}
          {!emailParam && (
            <div className="mb-4 space-y-1">
              <label className="text-xs font-mono text-[#bac9cc]">Verification Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email address"
                className="w-full bg-[#0a0d1c] border border-white/15 focus:border-[#00daf3] rounded-2xl py-2.5 px-4 text-xs text-white placeholder-white/30 font-mono"
              />
            </div>
          )}

          {errorMsg && (
            <div className="mb-5 p-3.5 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono flex items-center gap-2">
              <ShieldAlert size={16} className="shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* 6 Digit OTP Input Boxes */}
          <form onSubmit={handleVerify} className="space-y-6">
            <div className="flex justify-between gap-2 sm:gap-2.5 my-4">
              {otpValues.map((val, idx) => (
                <input
                  key={idx}
                  ref={(el) => (inputRefs.current[idx] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  value={val}
                  onChange={(e) => handleOtpChange(idx, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(idx, e)}
                  className={`w-11 sm:w-12 h-14 text-center text-xl font-bold font-mono rounded-2xl bg-[#0a0d1c] border transition-all focus:outline-none ${
                    val
                      ? 'border-[#00e5ff] text-[#00e5ff] shadow-[0_0_15px_rgba(0,229,255,0.25)]'
                      : 'border-white/20 text-white focus:border-[#00daf3]'
                  }`}
                />
              ))}
            </div>

            {/* Countdown timer & Resend button */}
            <div className="flex items-center justify-between text-xs font-mono text-[#bac9cc] py-1">
              <span>
                {timerSeconds > 0 ? (
                  <span className="text-amber-400 font-bold">Code expires in: {timerSeconds}s</span>
                ) : (
                  <span className="text-red-400">OTP Expired</span>
                )}
              </span>

              <button
                type="button"
                onClick={handleResendOTP}
                disabled={!canResend || resendLoading}
                className={`flex items-center gap-1.5 transition-colors cursor-pointer font-bold ${
                  canResend && !resendLoading
                    ? 'text-[#00daf3] hover:underline'
                    : 'text-white/30 cursor-not-allowed'
                }`}
              >
                <RefreshCw size={12} className={resendLoading ? 'animate-spin' : ''} />
                <span>{resendLoading ? 'Sending...' : 'Resend OTP'}</span>
              </button>
            </div>

            {/* Verify Button */}
            <button
              type="submit"
              disabled={isLoading || fullOtpCode.length < 6}
              className={`w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#00e5ff] via-[#00daf3] to-[#41e3fe] text-[#00363d] font-bold text-sm shadow-[0_0_25px_rgba(0,229,255,0.35)] hover:shadow-[0_0_35px_rgba(0,229,255,0.6)] transition-all flex items-center justify-center gap-2 cursor-pointer ${
                isLoading || fullOtpCode.length < 6 ? 'opacity-60 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full border-2 border-[#00363d] border-t-transparent animate-spin" />
                  <span>Verifying Code...</span>
                </div>
              ) : (
                <>
                  <span>Verify Email & Access Dashboard</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          {/* Mail Simulator banner link */}
          <div className="mt-6 p-3 rounded-2xl bg-white/5 border border-white/10 text-center space-y-1">
            <p className="text-[11px] text-[#bac9cc] font-mono">
              Need to view the sent 6-digit OTP code?
            </p>
            <button
              type="button"
              onClick={() => setIsMailModalOpen(true)}
              className="text-xs font-bold text-[#00daf3] hover:underline cursor-pointer inline-flex items-center gap-1"
            >
              <Mail size={13} />
              <span>Open Simulated Email Inbox</span>
            </button>
          </div>

          <div className="mt-5 text-center">
            <Link to="/login" className="text-xs text-[#bac9cc] hover:text-[#00daf3] font-mono">
              ← Back to Login
            </Link>
          </div>
        </motion.div>
      </div>
    </>
  );
};
