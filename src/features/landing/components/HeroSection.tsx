import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Shield, ArrowRight, Play, CheckCircle, AlertTriangle, ShieldCheck } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const sampleMessages = [
    {
      text: "URGENT: Your SBI Bank account has been locked. Click http://sbi-verify-kyc.com to update PAN within 24 hours to prevent permanent block.",
      score: 94,
      level: "High Risk",
      levelColor: "text-[#EF4444] bg-red-50 border-red-200",
      confidence: "99.2%",
      reasons: ["Suspicious non-official domain name", "Creates artificial urgency (24 hours)", "Requests sensitive PAN card details"],
      action: "Do NOT click the link. Block the sender and report to National Cyber Crime Portal (1930)."
    },
    {
      text: "Dear Customer, your electricity connection will be disconnected by 9:30 PM tonight due to pending bill. Call Electricity Officer at 9876543210.",
      score: 88,
      level: "High Risk",
      levelColor: "text-[#EF4444] bg-red-50 border-red-200",
      confidence: "97.8%",
      reasons: ["Impersonating official utility service provider", "Asks to call unknown personal phone number", "Threatens immediate service cutoff"],
      action: "Ignore SMS. Verify pending bills only via official Electricity Board website or app."
    },
    {
      text: "Congratulations! You won $50,000 in International Lottery. Pay processing fee of $100 to claim prize immediately via UPI.",
      score: 98,
      level: "Critical Fraud",
      levelColor: "text-[#EF4444] bg-red-50 border-red-200",
      confidence: "99.8%",
      reasons: ["Classic Advance Fee Scam pattern", "Unsolicited lottery reward claim", "Demands upfront payment via UPI"],
      action: "Delete message immediately. Never pay any fee to claim rewards."
    }
  ];

  const currentSample = sampleMessages[activeStep];

  return (
    <section className="relative py-12 lg:py-20 bg-[#F7F8F5]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Badge */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#DDF2EA] border border-[#11875D]/30 text-[#11875D] text-xs font-bold shadow-2xs"
            >
              <Shield size={14} className="text-[#11875D]" />
              <span>{t('hero.badge', 'AI Powered Scam Detection Platform')}</span>
            </motion.div>

            {/* Large Heading */}
            <motion.h1 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#111827] leading-[1.15] tracking-tight"
            >
              Protect Yourself From <br />
              <span className="text-[#11875D]">Modern Digital Scams</span>
            </motion.h1>

            {/* Supporting Text */}
            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-[#64748B] max-w-xl leading-relaxed font-normal"
            >
              Instant, AI-powered security analysis for suspicious SMS messages, phishing emails, fraudulent URLs, and fake payment QR codes. Trusted cyber protection for every citizen.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <button
                onClick={() => navigate('/scanner')}
                className="px-6 py-3.5 rounded-[16px] bg-[#11875D] hover:bg-[#0e704d] text-white font-bold text-base transition-all flex items-center gap-2.5 shadow-md shadow-[#11875D]/20 cursor-pointer"
              >
                <span>Start Free Scan</span>
                <ArrowRight size={18} />
              </button>

              <button
                onClick={() => {
                  const el = document.getElementById('scanner-demo');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-6 py-3.5 rounded-[16px] bg-white border border-[#E4E7E5] hover:bg-[#F8FAFC] text-[#111827] font-semibold text-base transition-all flex items-center gap-2 cursor-pointer shadow-2xs"
              >
                <Play size={16} className="text-[#11875D] fill-[#11875D]" />
                <span>Watch Demo</span>
              </button>
            </motion.div>

            {/* Trust Markers */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="pt-4 flex flex-wrap items-center gap-6 text-xs text-[#64748B] font-medium"
            >
              <div className="flex items-center gap-2">
                <CheckCircle size={16} className="text-[#10B981]" />
                <span>100% Free Public Tool</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle size={16} className="text-[#10B981]" />
                <span>No Registration Required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle size={16} className="text-[#10B981]" />
                <span>Real-Time AI Detection</span>
              </div>
            </motion.div>

          </div>

          {/* Right Section: DhanRakshak Visual Preview Card */}
          <div className="lg:col-span-5" id="scanner-demo">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-[20px] border border-[#E4E7E5] p-6 shadow-lg space-y-5"
            >
              {/* Card Header */}
              <div className="flex items-center justify-between border-b border-[#E4E7E5] pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#DDF2EA] flex items-center justify-center text-[#11875D]">
                    <ShieldCheck size={18} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#111827]">Security Threat Analysis</h3>
                    <p className="text-xs text-[#64748B]">Real-Time Neural Detection Preview</p>
                  </div>
                </div>
                <div className="flex gap-1">
                  {[0, 1, 2].map((idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveStep(idx)}
                      className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                        activeStep === idx ? 'bg-[#11875D] w-5' : 'bg-[#E4E7E5]'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Incoming Message Box */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#64748B] uppercase tracking-wider">Incoming Message</label>
                <div className="p-3.5 rounded-[12px] bg-[#F8FAFC] border border-[#E4E7E5] text-xs text-[#111827] leading-relaxed font-mono">
                  "{currentSample.text}"
                </div>
              </div>

              {/* Scores Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-[16px] bg-[#F8FAFC] border border-[#E4E7E5] space-y-1">
                  <span className="text-xs text-[#64748B] font-medium">Threat Score</span>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-[#EF4444]">{currentSample.score}/100</span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${currentSample.levelColor}`}>
                      {currentSample.level}
                    </span>
                  </div>
                </div>

                <div className="p-3 rounded-[16px] bg-[#F8FAFC] border border-[#E4E7E5] space-y-1">
                  <span className="text-xs text-[#64748B] font-medium">AI Confidence</span>
                  <div className="text-2xl font-bold text-[#11875D]">{currentSample.confidence}</div>
                </div>
              </div>

              {/* Detected Reasons */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-[#111827]">Detected Threat Indicators</span>
                <div className="space-y-1.5">
                  {currentSample.reasons.map((reason, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-[#111827]">
                      <AlertTriangle size={14} className="text-[#EF4444] shrink-0 mt-0.5" />
                      <span>{reason}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommended Action */}
              <div className="p-3.5 rounded-[16px] bg-[#DDF2EA] border border-[#11875D]/30 space-y-1">
                <span className="text-xs font-bold text-[#11875D] uppercase tracking-wider">Recommended Action</span>
                <p className="text-xs text-[#111827] font-medium leading-relaxed">
                  {currentSample.action}
                </p>
              </div>

            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};
