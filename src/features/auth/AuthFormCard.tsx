import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Lock, Mail, User, ArrowRight, Eye, EyeOff, Fingerprint, Sparkles, CheckCircle2, ShieldAlert, ShieldCheck } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../hooks/useAuth';
import { ToastContainer, ToastProps } from '../../components/ui/Toast';
import { GoogleAccountChooserModal } from './GoogleAccountChooserModal';

interface AuthFormCardProps {
  initialMode?: 'login' | 'register';
}

export const AuthFormCard: React.FC<AuthFormCardProps> = ({ initialMode = 'login' }) => {
  const { login, signup } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [isLogin, setIsLogin] = useState<boolean>(initialMode === 'login');
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isBiometricScanning, setIsBiometricScanning] = useState<boolean>(false);
  const [isGoogleModalOpen, setIsGoogleModalOpen] = useState<boolean>(false);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  useEffect(() => {
    setIsLogin(initialMode === 'login');
    setErrors({});
    setIsSuccess(false);
  }, [initialMode]);

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

  const handleToggleMode = (targetLogin: boolean) => {
    setIsLogin(targetLogin);
    setErrors({});
    setIsSuccess(false);
    if (targetLogin) {
      navigate('/login', { replace: true });
    } else {
      navigate('/register', { replace: true });
    }
  };

  const calculatePasswordStrength = (pass: string) => {
    if (!pass) return 0;
    let score = 0;
    if (pass.length >= 8) score += 25;
    if (/[A-Z]/.test(pass)) score += 25;
    if (/[0-9]/.test(pass)) score += 25;
    if (/[^A-Za-z0-9]/.test(pass)) score += 25;
    return score;
  };

  const passwordStrength = calculatePasswordStrength(password);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const newErrors: Record<string, string> = {};

    if (!isLogin) {
      if (!fullName.trim()) {
        newErrors.fullName = 'Full Name is required';
      } else if (fullName.trim().length < 2) {
        newErrors.fullName = 'Full Name must be at least 2 characters';
      }
    }

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (!isLogin) {
      if (!confirmPassword) {
        newErrors.confirmPassword = 'Confirm Password is required';
      } else if (password !== confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);

    try {
      // Simulate network request processing
      await new Promise(resolve => setTimeout(resolve, 1100));

      if (isLogin) {
        await login(email, password);
        addToast('success', 'Welcome Back!', 'Account authorized successfully. Redirecting to Dashboard...');
      } else {
        await signup(fullName, email, password, confirmPassword);
        addToast('success', 'Account Created!', 'Account created successfully! Welcome to FinGuard AI.');
      }

      setIsSuccess(true);

      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);
    } catch (err: any) {
      const msg = err?.message || (isLogin ? 'Invalid credentials. Please try again.' : 'Registration failed. Please try again.');
      setErrors({ server: msg });
      addToast('error', 'Authentication Error', msg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoFill = () => {
    setErrors({});
    if (isLogin) {
      setEmail('agent@finguard.ai');
      setPassword('SecurePass123!');
    } else {
      setFullName('Alex Vance');
      setEmail('alex.vance@finguard.ai');
      setPassword('SecurePass123!');
      setConfirmPassword('SecurePass123!');
    }
  };

  const handleBiometricAuth = async () => {
    setIsBiometricScanning(true);
    setErrors({});
    setTimeout(async () => {
      try {
        await login('agent@finguard.ai', 'SecurePass123!');
        setIsBiometricScanning(false);
        addToast('success', 'Passkey Verified', 'Biometric passkey scan completed. Session authorized.');
        setIsSuccess(true);
        setTimeout(() => navigate('/dashboard'), 1000);
      } catch {
        setIsBiometricScanning(false);
        addToast('error', 'Biometric Error', 'Hardware passkey authentication failed.');
      }
    }, 1400);
  };

  return (
    <>
      <ToastContainer toasts={toasts} />
      <GoogleAccountChooserModal
        isOpen={isGoogleModalOpen}
        onClose={() => setIsGoogleModalOpen(false)}
      />

      <motion.div
        initial={{ opacity: 0, y: 25, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.96 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="glass-card rounded-3xl p-7 sm:p-9 border border-[#00e5ff]/40 light:border-slate-300 shadow-[0_20px_60px_rgba(0,0,0,0.8)] light:shadow-xl relative overflow-hidden backdrop-blur-2xl w-full group bg-[#0a0d1a]/85 light:bg-white text-white light:text-slate-900"
      >
        {/* Background ambient glow spheres */}
        <div className="absolute top-0 right-0 w-56 h-56 bg-[#00e5ff]/15 rounded-full blur-3xl pointer-events-none group-hover:bg-[#00e5ff]/25 transition-all duration-700" />
        <div className="absolute bottom-0 left-0 w-56 h-56 bg-[#6001d1]/20 rounded-full blur-3xl pointer-events-none group-hover:bg-[#6001d1]/30 transition-all duration-700" />

        {/* Top subtle HUD telemetry line */}
        <div className="flex items-center justify-between text-[10px] font-mono text-[#00daf3]/80 light:text-sky-600 mb-6 pb-2 border-b border-white/10 light:border-slate-200">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00daf3] light:bg-sky-600 animate-ping" />
            <span>PORTAL SECURE // TLS 1.3</span>
          </div>
          <span>ENCRYPTED SESSION</span>
        </div>

        {/* Animated Auth Tab Switcher */}
        <div className="flex rounded-2xl bg-[#0a0d1c]/90 light:bg-slate-100 p-1.5 border border-[#00e5ff]/20 light:border-slate-200 mb-8 relative shadow-inner">
          <button
            type="button"
            onClick={() => handleToggleMode(true)}
            className={`flex-1 py-2.5 rounded-xl text-xs font-mono font-bold text-center transition-all relative z-10 ${
              isLogin ? 'text-[#00daf3] light:text-sky-700' : 'text-[#bac9cc] light:text-slate-600 hover:text-white light:hover:text-slate-900'
            }`}
          >
            <span>{t('auth.login', 'Portal Access')}</span>
            {isLogin && (
              <motion.div
                layoutId="authTabIndicator"
                className="absolute inset-0 bg-[#00e5ff]/20 light:bg-sky-200 border border-[#00e5ff]/50 light:border-sky-400 rounded-xl -z-10 shadow-[0_0_15px_rgba(0,229,255,0.25)]"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
          </button>
          <button
            type="button"
            onClick={() => handleToggleMode(false)}
            className={`flex-1 py-2.5 rounded-xl text-xs font-mono font-bold text-center transition-all relative z-10 ${
              !isLogin ? 'text-[#00daf3] light:text-sky-700' : 'text-[#bac9cc] light:text-slate-600 hover:text-white light:hover:text-slate-900'
            }`}
          >
            <span>{t('auth.register', 'Request Clearance')}</span>
            {!isLogin && (
              <motion.div
                layoutId="authTabIndicator"
                className="absolute inset-0 bg-[#00e5ff]/20 light:bg-sky-200 border border-[#00e5ff]/50 light:border-sky-400 rounded-xl -z-10 shadow-[0_0_15px_rgba(0,229,255,0.25)]"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
          </button>
        </div>

        {/* Header Title */}
        <div className="text-center mb-6">
          <motion.div
            animate={{ scale: [1, 1.05, 1], rotate: [0, 2, -2, 0] }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#00e5ff]/20 via-[#00daf3]/10 to-[#6001d1]/20 border border-[#00e5ff]/40 text-[#00daf3] light:text-sky-600 mb-3 shadow-[0_0_25px_rgba(0,229,255,0.3)] relative"
          >
            {isLogin ? <Lock size={30} /> : <ShieldCheck size={30} />}
            <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-[#00daf3] light:bg-sky-600 animate-ping" />
          </motion.div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white light:text-slate-900 tracking-tight">
            {isLogin ? t('auth.login', 'Portal Access') : 'Register Security Clearance'}
          </h1>
          <p className="text-xs text-[#bac9cc] light:text-slate-500 font-mono mt-1">
            {isLogin ? t('auth.portalSubtitle', 'Authenticate to access AI Shield Telemetry') : 'Deploy FinGuard AI Protection to Your Entity'}
          </p>
        </div>

        {/* Global Server Error Alert */}
        {errors.server && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mb-5 p-3.5 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono flex items-center gap-2"
          >
            <ShieldAlert size={16} className="shrink-0" />
            <span>{errors.server}</span>
          </motion.div>
        )}

        {/* Biometric Scanning Banner */}
        {isBiometricScanning && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-6 p-5 rounded-2xl bg-[#6001d1]/20 border border-[#d2bbff]/40 text-center space-y-3 backdrop-blur-xl relative overflow-hidden"
          >
            <div className="w-12 h-12 rounded-full bg-[#d2bbff]/20 border border-[#d2bbff] flex items-center justify-center mx-auto text-[#d2bbff] animate-pulse">
              <Fingerprint size={28} />
            </div>
            <p className="text-xs font-mono font-bold text-white light:text-slate-900">Scanning Hardware Passkey / Biometrics...</p>
            <div className="h-1.5 w-full bg-white/10 light:bg-slate-200 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.3, ease: "linear" }}
                className="h-full bg-gradient-to-r from-[#00e5ff] to-[#d2bbff]"
              />
            </div>
          </motion.div>
        )}

        {/* Success View */}
        {isSuccess ? (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="py-12 text-center space-y-4"
          >
            <div className="w-16 h-16 rounded-full bg-[#00e5ff]/20 border border-[#00e5ff] text-[#00daf3] light:text-sky-600 flex items-center justify-center mx-auto animate-bounce shadow-[0_0_30px_rgba(0,229,255,0.4)]">
              <CheckCircle2 size={36} />
            </div>
            <h3 className="font-bold text-xl text-white light:text-slate-900">
              {isLogin ? 'Security Authorization Granted' : 'Security Entity Provisioned'}
            </h3>
            <p className="text-xs text-[#bac9cc] light:text-slate-500 font-mono">
              Redirecting to Neural Command Telemetry...
            </p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="space-y-4 sm:space-y-5">
            <AnimatePresence mode="wait">
              {!isLogin && (
                <motion.div
                  key="fullNameInput"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-1.5"
                >
                  <label className="text-xs font-mono text-[#bac9cc] light:text-slate-600 block">
                    Full Name <span className="text-red-400">*</span>
                  </label>
                  <div className="relative group/input">
                    <User className="absolute left-3.5 top-3.5 text-[#bac9cc] light:text-slate-400 group-focus-within/input:text-[#00daf3] light:group-focus-within/input:text-sky-600 transition-colors w-4 h-4 pointer-events-none" />
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => {
                        setFullName(e.target.value);
                        if (errors.fullName) setErrors(prev => ({ ...prev, fullName: '' }));
                      }}
                      placeholder="Alex Vance"
                      className={`w-full bg-[#0a0d1c]/90 light:bg-slate-50 border rounded-2xl py-3 pl-10 pr-4 text-sm text-white light:text-slate-900 placeholder-white/30 light:placeholder-slate-400 focus:outline-none focus:ring-2 shadow-inner transition-all  ${
                        errors.fullName
                          ? 'border-red-500/80 focus:border-red-400 focus:ring-red-500/30'
                          : 'border-white/15 light:border-slate-300 focus:border-[#00daf3] focus:ring-[#00daf3]/40'
                      }`}
                    />
                  </div>
                  {errors.fullName && (
                    <motion.p
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-xs text-red-400 mt-1 font-mono flex items-center gap-1"
                    >
                      <ShieldAlert size={12} className="shrink-0" />
                      <span>{errors.fullName}</span>
                    </motion.p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-[#bac9cc] light:text-slate-600 flex justify-between items-center">
                <span>{isLogin ? t('auth.email', 'Work Email') : 'Work Email'} <span className="text-red-400">*</span></span>
                <span className="text-[10px] text-[#00daf3]/80 light:text-sky-600">VERIFIED DOMAIN</span>
              </label>
              <div className="relative group/input">
                <Mail className="absolute left-3.5 top-3.5 text-[#bac9cc] light:text-slate-400 group-focus-within/input:text-[#00daf3] light:group-focus-within/input:text-sky-600 transition-colors w-4 h-4 pointer-events-none" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors(prev => ({ ...prev, email: '' }));
                  }}
                  placeholder="agent@finguard.ai"
                  className={`w-full bg-[#0a0d1c]/90 light:bg-slate-50 border rounded-2xl py-3 pl-10 pr-4 text-sm text-white light:text-slate-900 placeholder-white/30 light:placeholder-slate-400 focus:outline-none focus:ring-2 shadow-inner transition-all  ${
                    errors.email
                      ? 'border-red-500/80 focus:border-red-400 focus:ring-red-500/30'
                      : 'border-white/15 light:border-slate-300 focus:border-[#00daf3] focus:ring-[#00daf3]/40'
                  }`}
                />
              </div>
              {errors.email && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xs text-red-400 mt-1 font-mono flex items-center gap-1"
                >
                  <ShieldAlert size={12} className="shrink-0" />
                  <span>{errors.email}</span>
                </motion.p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="text-xs font-mono text-[#bac9cc] light:text-slate-600">
                  {isLogin ? t('auth.password', 'Security Passcode') : 'Master Key (Password)'} <span className="text-red-400">*</span>
                </label>
                {isLogin && (
                  <a href="#" className="text-xs text-[#00daf3] light:text-sky-600 hover:underline font-mono">
                    Forgot?
                  </a>
                )}
              </div>
              <div className="relative group/input">
                <Lock className="absolute left-3.5 top-3.5 text-[#bac9cc] light:text-slate-400 group-focus-within/input:text-[#00daf3] light:group-focus-within/input:text-sky-600 transition-colors w-4 h-4 pointer-events-none" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password) setErrors(prev => ({ ...prev, password: '' }));
                  }}
                  placeholder="••••••••••••"
                  className={`w-full bg-[#0a0d1c]/90 light:bg-slate-50 border rounded-2xl py-3 pl-10 pr-10 text-sm text-white light:text-slate-900 placeholder-white/30 light:placeholder-slate-400 focus:outline-none focus:ring-2 shadow-inner transition-all  ${
                    errors.password
                      ? 'border-red-500/80 focus:border-red-400 focus:ring-red-500/30'
                      : 'border-white/15 light:border-slate-300 focus:border-[#00daf3] focus:ring-[#00daf3]/40'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3.5 text-[#bac9cc] light:text-slate-400 hover:text-white light:hover:text-slate-900 transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>

              {/* Password strength animated meter for registration */}
              {!isLogin && password && (
                <div className="pt-1.5 space-y-1">
                  <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{
                        width: `${passwordStrength}%`,
                        backgroundColor: passwordStrength >= 75 ? '#00e5ff' : passwordStrength >= 50 ? '#eab308' : '#ef4444'
                      }}
                      className="h-full transition-all duration-300 shadow-[0_0_8px_currentColor]"
                    />
                  </div>
                  <div className="flex justify-between text-[10px] font-mono text-[#bac9cc]">
                    <span>Key Entropy</span>
                    <span className={passwordStrength >= 75 ? "text-[#00daf3] font-bold" : "text-amber-400 font-bold"}>
                      {passwordStrength >= 75 ? "Military Grade" : passwordStrength >= 50 ? "Moderate" : "Weak Passcode"}
                    </span>
                  </div>
                </div>
              )}

              {errors.password && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xs text-red-400 mt-1 font-mono flex items-center gap-1"
                >
                  <ShieldAlert size={12} className="shrink-0" />
                  <span>{errors.password}</span>
                </motion.p>
              )}
            </div>

            {/* Confirm Password Field for Registration */}
            <AnimatePresence mode="wait">
              {!isLogin && (
                <motion.div
                  key="confirmPasswordInput"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-1.5"
                >
                  <label className="text-xs font-mono text-[#bac9cc] light:text-slate-600 block">
                    Confirm Master Key <span className="text-red-400">*</span>
                  </label>
                  <div className="relative group/input">
                    <Lock className="absolute left-3.5 top-3.5 text-[#bac9cc] light:text-slate-400 group-focus-within/input:text-[#00daf3] light:group-focus-within/input:text-sky-600 transition-colors w-4 h-4 pointer-events-none" />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      required
                      value={confirmPassword}
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                        if (errors.confirmPassword) setErrors(prev => ({ ...prev, confirmPassword: '' }));
                      }}
                      placeholder="••••••••••••"
                      className={`w-full bg-[#0a0d1c]/90 light:bg-slate-50 border rounded-2xl py-3 pl-10 pr-10 text-sm text-white light:text-slate-900 placeholder-white/30 light:placeholder-slate-400 focus:outline-none focus:ring-2 shadow-inner transition-all  ${
                        errors.confirmPassword
                          ? 'border-red-500/80 focus:border-red-400 focus:ring-red-500/30'
                          : 'border-white/15 light:border-slate-300 focus:border-[#00daf3] focus:ring-[#00daf3]/40'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3.5 top-3.5 text-[#bac9cc] light:text-slate-400 hover:text-white light:hover:text-slate-900 transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <motion.p
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-xs text-red-400 mt-1 font-mono flex items-center gap-1"
                    >
                      <ShieldAlert size={12} className="shrink-0" />
                      <span>{errors.confirmPassword}</span>
                    </motion.p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: isLoading ? 1 : 1.01 }}
              whileTap={{ scale: isLoading ? 1 : 0.98 }}
              type="submit"
              disabled={isLoading}
              className={`w-full py-4 rounded-2xl bg-gradient-to-r from-[#00e5ff] via-[#00daf3] to-[#41e3fe] text-[#00363d] font-bold text-sm sm:text-base shadow-[0_0_30px_rgba(0,229,255,0.35)] hover:shadow-[0_0_40px_rgba(0,229,255,0.6)] transition-all flex items-center justify-center gap-2.5 mt-2 ${
                isLoading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full border-2 border-[#00363d] border-t-transparent animate-spin" />
                  <span>{isLogin ? 'Authenticating...' : 'Provisioning Security Entity...'}</span>
                </div>
              ) : (
                <>
                  <span>{isLogin ? t('auth.submitLogin', 'Authorize Session') : 'Deploy Protection'}</span>
                  <ArrowRight size={18} />
                </>
              )}
            </motion.button>

            {/* Demo Fill & Biometric Passkey Buttons */}
            <div className="pt-4 border-t border-white/10 light:border-slate-200 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={handleDemoFill}
                className="px-3.5 py-2 rounded-xl bg-white/5 light:bg-slate-100 border border-white/10 light:border-slate-300 hover:border-[#00e5ff]/50 text-[11px] font-mono text-[#bac9cc] light:text-slate-600 hover:text-[#00daf3] light:hover:text-sky-600 transition-all flex items-center gap-1.5 shadow-sm"
              >
                <Sparkles size={13} className="text-[#00daf3] light:text-sky-600" />
                <span>Demo Fill</span>
              </button>

              {isLogin && (
                <button
                  type="button"
                  onClick={handleBiometricAuth}
                  disabled={isBiometricScanning}
                  className="px-3.5 py-2 rounded-xl bg-[#6001d1]/20 border border-[#6001d1]/40 hover:border-[#d2bbff] text-[11px] font-mono text-[#d2bbff] light:text-indigo-600 hover:text-white transition-all flex items-center gap-1.5 shadow-sm"
                >
                  <Fingerprint size={14} className={isBiometricScanning ? "animate-pulse text-[#00e5ff]" : ""} />
                  <span>{isBiometricScanning ? "Scanning Passkey..." : "Passkey Login"}</span>
                </button>
              )}
            </div>
          </form>
        )}

        {/* Bottom Toggle Footer */}
        <div className="mt-6 pt-5 border-t border-white/10 light:border-slate-200 text-center text-xs text-[#bac9cc] light:text-slate-600">
          {isLogin ? (
            <>
              <span>Don't have an account? </span>
              <button
                type="button"
                onClick={() => handleToggleMode(false)}
                className="text-[#00daf3] light:text-sky-600 font-bold hover:underline bg-transparent border-none cursor-pointer"
              >
                Register Account
              </button>
            </>
          ) : (
            <>
              <span>Already possess clearance? </span>
              <button
                type="button"
                onClick={() => handleToggleMode(true)}
                className="text-[#00daf3] light:text-sky-600 font-bold hover:underline bg-transparent border-none cursor-pointer"
              >
                Sign In
              </button>
            </>
          )}
        </div>
      </motion.div>
    </>
  );
};
