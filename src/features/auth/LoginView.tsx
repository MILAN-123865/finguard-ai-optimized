import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Lock, Mail, Eye, EyeOff, ShieldAlert, ArrowRight, ShieldCheck, MailWarning, Loader2, RefreshCw } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { ToastContainer, ToastProps } from '../../components/ui/Toast';
import { MailSimulatorModal } from '../../components/common/MailSimulatorModal';
import { GoogleAccountChooserModal } from './GoogleAccountChooserModal';

export const LoginView: React.FC = () => {
  const { login, resendOTP } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const fromPage = (location.state as any)?.from?.pathname || '/dashboard';

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [rememberMe, setRememberMe] = useState<boolean>(true);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isUnverified, setIsUnverified] = useState<boolean>(false);
  const [unverifiedEmail, setUnverifiedEmail] = useState<string>('');

  const [toasts, setToasts] = useState<ToastProps[]>([]);
  const [isMailModalOpen, setIsMailModalOpen] = useState<boolean>(false);
  const [isGoogleModalOpen, setIsGoogleModalOpen] = useState<boolean>(false);

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

  const validateForm = (): boolean => {
    let isValid = true;
    setEmailError(null);
    setPasswordError(null);

    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      setEmailError('Work email is required.');
      isValid = false;
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(trimmedEmail)) {
        setEmailError('Please enter a valid work email address.');
        isValid = false;
      }
    }

    if (!password) {
      setPasswordError('Password is required.');
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setIsUnverified(false);

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      await login(email.trim(), password);
      addToast('success', 'Authentication Granted', 'Session authorized. Redirecting to Dashboard...');
      setTimeout(() => {
        navigate(fromPage, { replace: true });
      }, 600);
    } catch (err: any) {
      const serverErr = err?.response?.data?.error || err?.message || 'Authentication failed. Please check your email and password.';
      const emailUnverified = err?.response?.data?.emailVerified === false;

      if (emailUnverified) {
        setIsUnverified(true);
        setUnverifiedEmail(email.trim());
        setErrorMsg('Verify your email address to continue.');
      } else {
        setErrorMsg(serverErr);
        addToast('error', 'Login Failed', serverErr);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendUnverifiedEmail = async () => {
    if (!unverifiedEmail) return;
    try {
      await resendOTP(unverifiedEmail);
      addToast('success', 'Verification Code Sent', `New OTP sent to ${unverifiedEmail}. Check Mail Inbox.`);
      navigate('/email-verification', { state: { email: unverifiedEmail } });
    } catch (err: any) {
      addToast('error', 'Resend Error', 'Failed to send verification email.');
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
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-[20px] p-6 sm:p-8 border border-[#E5E7EB] shadow-xs text-[#111827] relative overflow-hidden"
        >
          {/* Header Telemetry Line */}
          <div className="flex items-center justify-between text-xs text-[#64748B] font-medium mb-6 pb-3 border-b border-[#E5E7EB]">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
              <span className="font-semibold text-[#111827]">Official Security Authentication</span>
            </div>
            <button
              onClick={() => setIsMailModalOpen(true)}
              className="text-[#11875D] hover:underline flex items-center gap-1 cursor-pointer font-bold"
            >
              <Mail size={13} />
              <span>Simulated Inbox</span>
            </button>
          </div>

          {/* Title */}
          <div className="text-center mb-6 space-y-2">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#DDF2EA] border border-[#11875D]/30 text-[#11875D] mb-1">
              <Lock size={22} />
            </div>
            <h1 className="text-2xl font-bold text-[#111827] tracking-tight">FinGuard Portal Sign In</h1>
            <p className="text-xs text-[#64748B] font-medium">
              Enter your credentials to access protected security services
            </p>
          </div>

          {/* Unverified Warning / General Error Banners */}
          {isUnverified ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-5 p-4 rounded-[14px] bg-amber-50 border border-amber-200 text-[#F59E0B] space-y-2.5"
            >
              <div className="flex items-center gap-2 font-bold text-xs">
                <MailWarning size={18} className="text-[#F59E0B] shrink-0" />
                <span>Email Verification Required</span>
              </div>
              <p className="text-xs text-[#64748B]">
                Your account ({unverifiedEmail}) requires email verification before logging in.
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                <button
                  type="button"
                  onClick={handleResendUnverifiedEmail}
                  className="px-3 py-1.5 rounded-[10px] bg-[#11875D] text-white font-bold text-xs hover:bg-[#0e704d] transition-colors cursor-pointer flex items-center gap-1"
                >
                  <RefreshCw size={12} />
                  <span>Resend Code</span>
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/email-verification', { state: { email: unverifiedEmail } })}
                  className="px-3 py-1.5 rounded-[10px] bg-white border border-[#E5E7EB] text-[#111827] font-bold text-xs hover:bg-[#F8FAFC] transition-colors cursor-pointer"
                >
                  Enter OTP
                </button>
              </div>
            </motion.div>
          ) : (
            errorMsg && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mb-5 p-3.5 rounded-[14px] bg-red-50 border border-red-200 text-[#EF4444] text-xs font-semibold flex items-center gap-2"
              >
                <ShieldAlert size={16} className="shrink-0 text-[#EF4444]" />
                <span>{errorMsg}</span>
              </motion.div>
            )
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#111827] block">
                Work Email <span className="text-[#EF4444]">*</span>
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3.5 text-[#64748B] w-4 h-4 pointer-events-none" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (emailError) setEmailError(null);
                  }}
                  placeholder="Enter your work email"
                  autoComplete="email"
                  className={`w-full bg-[#F8FAFC] border ${
                    emailError ? 'border-[#EF4444]' : 'border-[#E5E7EB]'
                  } focus:border-[#11875D] focus:ring-1 focus:ring-[#11875D] rounded-[14px] py-3 pl-10 pr-4 text-sm text-[#111827] font-medium placeholder:text-[#94A3B8] focus:outline-none transition-all`}
                />
              </div>
              {emailError && (
                <p className="text-[11px] font-semibold text-[#EF4444] mt-1">{emailError}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-[#111827]">
                  Password <span className="text-[#EF4444]">*</span>
                </label>
                <Link to="/forgot-password" className="text-xs text-[#11875D] hover:underline font-bold">
                  Forgot Password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3.5 text-[#64748B] w-4 h-4 pointer-events-none" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (passwordError) setPasswordError(null);
                  }}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  className={`w-full bg-[#F8FAFC] border ${
                    passwordError ? 'border-[#EF4444]' : 'border-[#E5E7EB]'
                  } focus:border-[#11875D] focus:ring-1 focus:ring-[#11875D] rounded-[14px] py-3 pl-10 pr-10 text-sm text-[#111827] font-medium placeholder:text-[#94A3B8] focus:outline-none transition-all`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3.5 text-[#64748B] hover:text-[#111827] transition-colors cursor-pointer"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {passwordError && (
                <p className="text-[11px] font-semibold text-[#EF4444] mt-1">{passwordError}</p>
              )}
            </div>

            {/* Remember Session */}
            <div className="flex items-center justify-between text-xs text-[#64748B] font-medium pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-[#E5E7EB] text-[#11875D] focus:ring-[#11875D]"
                />
                <span className="text-[#111827]">Remember Session</span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3.5 rounded-[16px] bg-[#11875D] hover:bg-[#0e704d] text-white font-bold text-sm transition-all shadow-2xs flex items-center justify-center gap-2 cursor-pointer ${
                isLoading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <Loader2 size={18} className="animate-spin text-white" />
                  <span>Signing In...</span>
                </div>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          {/* Social Google Sign In */}
          <div className="mt-6 space-y-4">
            <div className="relative flex items-center justify-center">
              <div className="border-t border-[#E5E7EB] w-full" />
              <span className="bg-white px-3 text-[11px] font-bold text-[#64748B] absolute">
                OR CONTINUE WITH
              </span>
            </div>

            <button
              type="button"
              onClick={() => setIsGoogleModalOpen(true)}
              className="w-full py-3 rounded-[14px] bg-white border border-[#E5E7EB] hover:bg-[#F8FAFC] text-xs font-bold text-[#111827] transition-all flex items-center justify-center gap-2.5 cursor-pointer shadow-2xs"
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

          {/* Create Account Link */}
          <div className="mt-6 pt-4 border-t border-[#E5E7EB] text-center">
            <p className="text-xs text-[#64748B] font-medium">
              Don't have an account yet?{' '}
              <Link to="/register" className="text-[#11875D] font-bold hover:underline">
                Create Account →
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </>
  );
};
