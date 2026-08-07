import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { User, Mail, Lock, Eye, EyeOff, ShieldAlert, ArrowRight, CheckCircle2, MailCheck, RefreshCw } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { ToastContainer, ToastProps } from '../../components/ui/Toast';
import { MailSimulatorModal } from '../../components/common/MailSimulatorModal';
import { GoogleAccountChooserModal } from './GoogleAccountChooserModal';

export const RegisterView: React.FC = () => {
  const { signup, resendOTP } = useAuth();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [acceptTerms, setAcceptTerms] = useState<boolean>(true);

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [toasts, setToasts] = useState<ToastProps[]>([]);
  const [isRegisteredSuccess, setIsRegisteredSuccess] = useState<boolean>(false);
  const [registeredEmail, setRegisteredEmail] = useState<string>('');

  const [isMailModalOpen, setIsMailModalOpen] = useState<boolean>(false);
  const [isGoogleModalOpen, setIsGoogleModalOpen] = useState<boolean>(false);
  const [resendLoading, setResendLoading] = useState<boolean>(false);

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

  const reqs = calculatePasswordRequirements(password);
  const isPasswordValid = reqs.minLength && reqs.uppercase && reqs.lowercase && reqs.number && reqs.specialChar;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const newErrors: Record<string, string> = {};

    if (!fullName.trim()) {
      newErrors.fullName = 'Full Name is required.';
    }

    if (!email.trim()) {
      newErrors.email = 'Email Address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!password) {
      newErrors.password = 'Password is required.';
    } else if (!isPasswordValid) {
      newErrors.password = 'Password must meet all security requirements.';
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Confirm Password is required.';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Confirm password must match.';
    }

    if (!acceptTerms) {
      newErrors.acceptTerms = 'You must accept Terms & Privacy Policy.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);

    try {
      const res = await signup(fullName.trim(), email.trim(), password, confirmPassword, acceptTerms);
      setRegisteredEmail(res.email || email.trim());
      setIsRegisteredSuccess(true);
      addToast('success', 'Registration Complete', 'Verification email dispatched. Please check your inbox.');
    } catch (err: any) {
      const serverErr = err?.response?.data?.error || err?.message || 'Registration failed.';
      setErrors({ server: serverErr });
      addToast('error', 'Registration Error', serverErr);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    setResendLoading(true);
    try {
      await resendOTP(registeredEmail);
      addToast('success', 'Verification Resent', `A new 6-digit OTP code has been sent to ${registeredEmail}`);
    } catch (err: any) {
      addToast('error', 'Resend Error', 'Failed to resend verification email.');
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <>
      <ToastContainer toasts={toasts} />
      <MailSimulatorModal isOpen={isMailModalOpen} onClose={() => setIsMailModalOpen(false)} />
      <GoogleAccountChooserModal
        isOpen={isGoogleModalOpen}
        onClose={() => setIsGoogleModalOpen(false)}
      />

      <div className="w-full max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="glass-card rounded-3xl p-7 sm:p-8 border border-[#00e5ff]/40 shadow-[0_20px_60px_rgba(0,0,0,0.8)] relative overflow-hidden backdrop-blur-2xl bg-[#0a0d1a]/90 text-white"
        >
          {/* Header telemetry line */}
          <div className="flex items-center justify-between text-[10px] font-mono text-[#00daf3]/80 mb-6 pb-2 border-b border-white/10">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00daf3] animate-ping" />
              <span>CUSTOM AUTH // VERIFICATION REQUIRED</span>
            </div>
            <button
              onClick={() => setIsMailModalOpen(true)}
              className="text-[#00daf3] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <Mail size={12} />
              <span>INBOX SIMULATOR</span>
            </button>
          </div>

          <AnimatePresence mode="wait">
            {isRegisteredSuccess ? (
              /* Success Screen after Signup */
              <motion.div
                key="signup-success-view"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="py-4 text-center space-y-5"
              >
                <div className="w-20 h-20 rounded-full bg-[#00daf3]/15 border border-[#00daf3] text-[#00daf3] flex items-center justify-center mx-auto shadow-[0_0_35px_rgba(0,218,243,0.4)] animate-bounce">
                  <MailCheck size={40} />
                </div>

                <div>
                  <h2 className="text-2xl font-extrabold text-white">Check Your Email</h2>
                  <p className="text-xs text-[#bac9cc] font-mono mt-2 leading-relaxed">
                    Verification email has been sent to your email address:
                  </p>
                  <p className="text-sm font-bold font-mono text-[#00daf3] mt-1 bg-[#00daf3]/10 py-1.5 px-3 rounded-xl border border-[#00daf3]/30 inline-block">
                    {registeredEmail}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs text-[#bac9cc] text-left space-y-2">
                  <p className="font-bold text-white font-mono flex items-center gap-1.5">
                    <CheckCircle2 size={14} className="text-[#00daf3]" />
                    <span>Next Steps:</span>
                  </p>
                  <ol className="list-decimal list-inside space-y-1 text-[11px] font-mono">
                    <li>Open your email inbox or the Simulator button below.</li>
                    <li>Copy the 6-digit OTP code sent by FinGuard.</li>
                    <li>Verify your email to unlock Dashboard access.</li>
                  </ol>
                </div>

                {/* Buttons */}
                <div className="space-y-3 pt-2">
                  <button
                    type="button"
                    onClick={() => navigate('/email-verification', { state: { email: registeredEmail } })}
                    className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#00e5ff] via-[#00daf3] to-[#41e3fe] text-[#00363d] font-bold text-sm shadow-[0_0_25px_rgba(0,229,255,0.35)] hover:shadow-[0_0_35px_rgba(0,229,255,0.6)] transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Enter 6-Digit Verification OTP</span>
                    <ArrowRight size={16} />
                  </button>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setIsMailModalOpen(true)}
                      className="py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-bold font-mono text-white transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <Mail size={14} className="text-[#00daf3]" />
                      <span>Open Email</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleResend}
                      disabled={resendLoading}
                      className="py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-xs font-bold font-mono text-[#bac9cc] hover:text-white transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <RefreshCw size={14} className={resendLoading ? 'animate-spin' : ''} />
                      <span>Resend Email</span>
                    </button>
                  </div>

                  <Link
                    to="/login"
                    className="block text-center text-xs text-[#bac9cc] hover:text-[#00daf3] pt-2 font-mono"
                  >
                    Back to Login
                  </Link>
                </div>
              </motion.div>
            ) : (
              /* Registration Form */
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="text-center mb-6">
                  <h1 className="text-2xl font-extrabold tracking-tight">Create Security Account</h1>
                  <p className="text-xs text-[#bac9cc] font-mono mt-1">
                    Deploy FinGuard AI Protection to Your Workspace
                  </p>
                </div>

                {errors.server && (
                  <div className="p-3.5 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono flex items-center gap-2">
                    <ShieldAlert size={16} className="shrink-0" />
                    <span>{errors.server}</span>
                  </div>
                )}

                {/* Full Name */}
                <div className="space-y-1">
                  <label className="text-xs font-mono text-[#bac9cc]">
                    Full Name <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-3.5 text-[#bac9cc] w-4 h-4 pointer-events-none" />
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Alex Vance"
                      className="w-full bg-[#0a0d1c] border border-white/15 focus:border-[#00daf3] rounded-2xl py-3 pl-10 pr-4 text-sm text-white placeholder-white/30 focus:outline-none transition-all"
                    />
                  </div>
                  {errors.fullName && <p className="text-xs text-red-400 font-mono mt-1">{errors.fullName}</p>}
                </div>

                {/* Email Address */}
                <div className="space-y-1">
                  <label className="text-xs font-mono text-[#bac9cc]">
                    Email Address <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-3.5 text-[#bac9cc] w-4 h-4 pointer-events-none" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="alex.vance@finguard.ai"
                      className="w-full bg-[#0a0d1c] border border-white/15 focus:border-[#00daf3] rounded-2xl py-3 pl-10 pr-4 text-sm text-white placeholder-white/30 focus:outline-none transition-all"
                    />
                  </div>
                  {errors.email && <p className="text-xs text-red-400 font-mono mt-1">{errors.email}</p>}
                </div>

                {/* Password */}
                <div className="space-y-1">
                  <label className="text-xs font-mono text-[#bac9cc]">
                    Password <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-3.5 text-[#bac9cc] w-4 h-4 pointer-events-none" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
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

                  {/* Password requirements visual validation pills */}
                  {password && (
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-[11px] font-mono space-y-1 mt-2">
                      <p className="text-white/70 font-bold mb-1">Password Requirements:</p>
                      <div className="grid grid-cols-2 gap-1 text-[10px]">
                        <span className={reqs.minLength ? 'text-emerald-400 flex items-center gap-1' : 'text-white/40'}>
                          {reqs.minLength ? '✓' : '•'} Min 8 chars
                        </span>
                        <span className={reqs.uppercase ? 'text-emerald-400 flex items-center gap-1' : 'text-white/40'}>
                          {reqs.uppercase ? '✓' : '•'} 1 Uppercase
                        </span>
                        <span className={reqs.lowercase ? 'text-emerald-400 flex items-center gap-1' : 'text-white/40'}>
                          {reqs.lowercase ? '✓' : '•'} 1 Lowercase
                        </span>
                        <span className={reqs.number ? 'text-emerald-400 flex items-center gap-1' : 'text-white/40'}>
                          {reqs.number ? '✓' : '•'} 1 Number
                        </span>
                        <span className={reqs.specialChar ? 'text-emerald-400 flex items-center gap-1' : 'text-white/40'}>
                          {reqs.specialChar ? '✓' : '•'} 1 Special Char
                        </span>
                      </div>
                    </div>
                  )}
                  {errors.password && <p className="text-xs text-red-400 font-mono mt-1">{errors.password}</p>}
                </div>

                {/* Confirm Password */}
                <div className="space-y-1">
                  <label className="text-xs font-mono text-[#bac9cc]">
                    Confirm Password <span className="text-red-400">*</span>
                  </label>
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
                  {errors.confirmPassword && <p className="text-xs text-red-400 font-mono mt-1">{errors.confirmPassword}</p>}
                </div>

                {/* Terms Checkbox */}
                <div className="pt-1">
                  <label className="flex items-start gap-2.5 text-xs text-[#bac9cc] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={acceptTerms}
                      onChange={(e) => setAcceptTerms(e.target.checked)}
                      className="mt-0.5 rounded border-white/20 bg-[#0a0d1c] text-[#00daf3] focus:ring-0"
                    />
                    <span>
                      I agree to the <Link to="/terms" className="text-[#00daf3] hover:underline">Terms of Service</Link> and <Link to="/privacy-policy" className="text-[#00daf3] hover:underline">Privacy Policy</Link>
                    </span>
                  </label>
                  {errors.acceptTerms && <p className="text-xs text-red-400 font-mono mt-1">{errors.acceptTerms}</p>}
                </div>

                {/* Create Account Button */}
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
                      <span>Creating Account & Sending OTP...</span>
                    </div>
                  ) : (
                    <>
                      <span>Create Account</span>
                      <ArrowRight size={16} />
                    </>
                  )}
                </button>

                {/* Social Google Sign In */}
                <div className="pt-2 space-y-3">
                  <div className="relative flex items-center justify-center">
                    <div className="border-t border-white/10 w-full" />
                    <span className="bg-[#0a0d1a] px-3 text-[10px] font-mono text-[#bac9cc] absolute">
                      OR REGISTER WITH
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsGoogleModalOpen(true)}
                    className="w-full py-3 rounded-2xl bg-white/5 border border-white/15 hover:border-[#00e5ff]/50 text-xs font-bold font-mono text-white hover:bg-white/10 transition-all flex items-center justify-center gap-2.5 cursor-pointer"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
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
                    <span>Continue with Google</span>
                  </button>
                </div>

                <div className="pt-4 border-t border-white/10 text-center text-xs text-[#bac9cc]">
                  Already have an account?{' '}
                  <Link to="/login" className="text-[#00daf3] font-bold hover:underline">
                    Sign In
                  </Link>
                </div>
              </form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </>
  );
};
