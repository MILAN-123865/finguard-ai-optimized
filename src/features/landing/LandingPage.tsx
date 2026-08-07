import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Shield, 
  Cpu, 
  Fingerprint, 
  Globe, 
  Lock, 
  ArrowRight, 
  ChevronDown, 
  Zap, 
  Sparkles,
  ShieldCheck,
  AlertTriangle
} from 'lucide-react';

import { HeroSection } from './components/HeroSection';
import { AIScannerSection } from './components/ai-scanner/AIScannerSection';

const FAQS = [
  {
    q: "How does FinGuard AI detect fraud in real-time?",
    a: "FinGuard AI utilizes multi-modal neural network models trained on over 500,000 fraud vectors. It analyzes linguistic markers, urgency patterns, domain age, and account metadata in under 10 milliseconds."
  },
  {
    q: "Do I need to share my banking passwords or sensitive credentials?",
    a: "No! FinGuard AI operates on zero-knowledge architecture. We never ask for or store your bank passwords. Protection is performed via text analysis, pattern recognition, and encrypted API telemetry."
  },
  {
    q: "Can FinGuard AI protect against SMS and WhatsApp scams?",
    a: "Yes. FinGuard AI analyzes text, links, and headers from SMS, WhatsApp, Email, Telegram, and web URLs to neutralize social engineering attempts before financial loss occurs."
  },
  {
    q: "What happens when a high-risk scam is detected?",
    a: "FinGuard AI immediately generates a threat report, highlights malicious links, breaks down psychological coercion tactics, and provides a 1-click Auto-Block and Report mechanism."
  }
];

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  return (
    <div className="space-y-16 sm:space-y-24 pb-12 bg-[#F7F8F5]">
      {/* Hero Section */}
      <HeroSection />

      {/* Cyber Protection Ecosystem */}
      <section className="space-y-8 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="px-3.5 py-1 rounded-full bg-[#DDF2EA] text-[#11875D] font-bold text-xs inline-flex items-center gap-1.5 shadow-2xs"
          >
            <Sparkles size={14} className="text-[#11875D]" />
            Cyber Protection Ecosystem
          </motion.span>
          <h2 className="font-bold text-3xl sm:text-4xl text-[#111827] tracking-tight">
            Comprehensive Defense Layers
          </h2>
          <p className="text-[#64748B] text-sm max-w-xl mx-auto">
            Sophisticated protection modules working in tandem to defend your financial digital footprint in real time.
          </p>
        </div>

        <div className="grid md:grid-cols-12 gap-6">
          {/* Main Card - Autonomous Neural Scanner */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-8 bg-white rounded-[20px] p-6 sm:p-8 border border-[#E4E7E5] flex flex-col justify-between min-h-[300px] shadow-xs"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-[16px] bg-[#DDF2EA] border border-[#11875D]/30 flex items-center justify-center text-[#11875D]">
                  <Cpu size={26} />
                </div>
                <span className="px-3 py-1 rounded-full bg-[#DDF2EA] text-[#11875D] font-bold text-xs">
                  CORE ENGINE ACTIVE
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="font-bold text-2xl text-[#111827]">
                  Autonomous AI Scanner
                </h3>
                <p className="text-[#64748B] text-sm leading-relaxed">
                  Evaluates incoming communications using advanced language models to identify subtle social engineering, urgency tactics, and zero-day fraud vectors before financial damage occurs.
                </p>
              </div>
            </div>

            <div className="pt-6 border-t border-[#E4E7E5] space-y-2">
              <div className="flex justify-between items-center text-xs font-semibold">
                <span className="text-[#64748B]">Global Detection Accuracy</span>
                <span className="text-[#11875D] font-bold">99.8% AI Accuracy</span>
              </div>
              <div className="h-2 rounded-full bg-[#F8FAFC] overflow-hidden border border-[#E4E7E5]">
                <div className="h-full bg-[#11875D] rounded-full w-[99.8%]" />
              </div>
            </div>
          </motion.div>

          {/* Card 2 - Behavioral Analysis */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="md:col-span-4 bg-white rounded-[20px] p-6 border border-[#E4E7E5] flex flex-col justify-between min-h-[300px] shadow-xs"
          >
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="w-12 h-12 rounded-[16px] bg-[#F8FAFC] border border-[#E4E7E5] flex items-center justify-center text-[#11875D]">
                  <Fingerprint size={26} />
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-[#F8FAFC] text-[#64748B] font-bold text-xs border border-[#E4E7E5]">
                  REAL-TIME
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="font-bold text-xl text-[#111827]">
                  Behavioral Profiling
                </h3>
                <p className="text-[#64748B] text-xs leading-relaxed">
                  Continuous pattern analysis to detect account takeover, unauthorized wire transfers, and SIM swap impersonation attempts.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-[#E4E7E5] flex items-center justify-between text-xs font-semibold text-[#11875D]">
              <div className="flex items-center gap-1.5">
                <Zap size={14} />
                <span>Sub-10ms Speed</span>
              </div>
              <span className="text-[10px] bg-[#DDF2EA] px-2 py-0.5 rounded-full font-bold">Active Engine</span>
            </div>
          </motion.div>

          {/* Card 3 - Phishing Inspection */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="md:col-span-4 bg-white rounded-[20px] p-6 border border-[#E4E7E5] flex flex-col justify-between shadow-xs"
          >
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="w-12 h-12 rounded-[16px] bg-[#DDF2EA] border border-[#11875D]/30 flex items-center justify-center text-[#11875D]">
                  <Globe size={26} />
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-[#DDF2EA] text-[#11875D] font-bold text-xs">
                  ISOLATED
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="font-bold text-xl text-[#111827]">
                  URL Phishing Sandbox
                </h3>
                <p className="text-[#64748B] text-xs leading-relaxed">
                  Executes suspicious web links inside a secure cloud environment before users click to verify destination safety.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-[#E4E7E5] flex items-center justify-between text-xs font-semibold text-[#11875D]">
              <div className="flex items-center gap-1.5">
                <ShieldCheck size={14} />
                <span>DNS Verification</span>
              </div>
              <span className="text-[10px] bg-[#DDF2EA] px-2 py-0.5 rounded-full font-bold">Verified Safe</span>
            </div>
          </motion.div>

          {/* 3 Small Feature Cards */}
          <div className="md:col-span-8 grid sm:grid-cols-3 gap-6">
            <div className="bg-white rounded-[20px] p-5 border border-[#E4E7E5] shadow-xs space-y-2">
              <div className="w-9 h-9 rounded-full bg-[#F8FAFC] border border-[#E4E7E5] flex items-center justify-center text-[#EF4444]">
                <AlertTriangle size={18} />
              </div>
              <h4 className="font-bold text-sm text-[#111827]">Real-Time Alerts</h4>
              <p className="text-[#64748B] text-xs leading-relaxed">Instant alerts when high risk scam patterns are detected.</p>
            </div>

            <div className="bg-white rounded-[20px] p-5 border border-[#E4E7E5] shadow-xs space-y-2">
              <div className="w-9 h-9 rounded-full bg-[#F8FAFC] border border-[#E4E7E5] flex items-center justify-center text-[#11875D]">
                <Shield size={18} />
              </div>
              <h4 className="font-bold text-sm text-[#111827]">Domain Verification</h4>
              <p className="text-[#64748B] text-xs leading-relaxed">Checks domain registration dates and SSL certificates.</p>
            </div>

            <div className="bg-white rounded-[20px] p-5 border border-[#E4E7E5] shadow-xs space-y-2">
              <div className="w-9 h-9 rounded-full bg-[#F8FAFC] border border-[#E4E7E5] flex items-center justify-center text-[#11875D]">
                <Lock size={18} />
              </div>
              <h4 className="font-bold text-sm text-[#111827]">Encrypted Vault</h4>
              <p className="text-[#64748B] text-xs leading-relaxed">Secure local storage for scan logs with zero tracking.</p>
            </div>
          </div>

        </div>
      </section>

      {/* AI Scanner Section */}
      <AIScannerSection />

      {/* Stats Grid */}
      <section className="py-10 bg-white border-y border-[#E4E7E5]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-3 gap-8 text-center">
          <div className="space-y-1">
            <div className="text-3xl sm:text-4xl font-bold text-[#11875D]">
              99.9%
            </div>
            <h4 className="text-base font-bold text-[#111827]">Zero-Day Fraud Detection</h4>
            <p className="text-xs text-[#64748B]">Instant mitigation before monetary loss</p>
          </div>

          <div className="space-y-1">
            <div className="text-3xl sm:text-4xl font-bold text-[#11875D]">
              2.4M+
            </div>
            <h4 className="text-base font-bold text-[#111827]">Scams Analyzed</h4>
            <p className="text-xs text-[#64748B]">Public security scans performed</p>
          </div>

          <div className="space-y-1">
            <div className="text-3xl sm:text-4xl font-bold text-[#11875D]">
              &lt;10ms
            </div>
            <h4 className="text-base font-bold text-[#111827]">Analysis Speed</h4>
            <p className="text-xs text-[#64748B]">Ultra-fast AI detection engine</p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="space-y-6 max-w-3xl mx-auto px-4">
        <div className="text-center space-y-2">
          <h2 className="font-bold text-3xl text-[#111827] tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-[#64748B] text-sm">
            Everything you need to know about FinGuard AI security and public protection.
          </p>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, index) => {
            const isOpen = activeFaq === index;
            return (
              <div 
                key={index}
                className="bg-white rounded-[16px] border border-[#E4E7E5] overflow-hidden shadow-2xs"
              >
                <button
                  onClick={() => setActiveFaq(isOpen ? null : index)}
                  className="w-full p-4 text-left flex justify-between items-center gap-4 text-[#111827] font-bold text-sm hover:text-[#11875D] transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown 
                    size={18} 
                    className={`text-[#11875D] shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="px-4 pb-4 text-xs text-[#64748B] leading-relaxed border-t border-[#E4E7E5] pt-3"
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-[20px] p-8 sm:p-12 text-center border border-[#E4E7E5] shadow-xs space-y-4 max-w-3xl mx-auto">
          <h2 className="font-bold text-3xl text-[#111827] leading-tight">
            Ready to Protect Yourself Against Cyber Scams?
          </h2>
          <p className="text-[#64748B] text-sm">
            Join thousands of users who rely on FinGuard AI's official security engine to verify suspicious text and messages.
          </p>

          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <button
              onClick={() => navigate('/scanner')}
              className="px-6 py-3 rounded-[16px] bg-[#11875D] hover:bg-[#0e704d] text-white font-bold text-sm transition-all shadow-2xs flex items-center gap-2 cursor-pointer"
            >
              <span>Try AI Scanner Free</span>
              <ArrowRight size={16} />
            </button>

            <button
              onClick={() => navigate('/dashboard')}
              className="px-6 py-3 rounded-[16px] bg-[#F8FAFC] border border-[#E4E7E5] hover:bg-white text-[#111827] font-semibold text-sm transition-all cursor-pointer"
            >
              Explore Dashboard
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};

export default LandingPage;
