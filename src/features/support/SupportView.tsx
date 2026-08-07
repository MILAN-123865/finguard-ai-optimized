import React, { useState, useMemo, useEffect } from 'react';
import { 
  LifeBuoy, Search, HelpCircle, MessageCircle, Bug, Lightbulb, 
  Send, ChevronDown, MessageSquare, Mail, FileText, Info, Shield, CheckCircle2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Mock Data ---
const faqs = [
  { id: 1, category: 'Account', question: 'How do I reset my password?', answer: 'Go to the login page and click "Forgot Password". A reset link will be sent to your registered email address.' },
  { id: 2, category: 'Account', question: 'Can I change my email address?', answer: 'Yes, navigate to Settings > Profile, and click edit next to your email address. You will need to verify the new email.' },
  { id: 3, category: 'Scanning', question: 'How accurate is the AI Scanner?', answer: 'Our AI model achieves a 96.8% confidence score across verified test datasets for known scam patterns and phishing attempts.' },
  { id: 4, category: 'Scanning', question: 'Does the scanner read my personal messages?', answer: 'No. The scanner only analyzes the specific text or URL you paste into it. It does not have access to your personal inbox or SMS.' },
  { id: 5, category: 'Security', question: 'Is my data encrypted?', answer: 'Yes, all data in transit and at rest is secured using AES-256 encryption standards.' }
];

export const SupportView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'faq' | 'contact' | 'feedback' | 'about'>('faq');
  const [isLoading, setIsLoading] = useState(true);

  // FAQ State
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  // Form States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [feedbackType, setFeedbackType] = useState('bug');

  const categories = ['All', ...Array.from(new Set(faqs.map(f => f.category)))];

  const filteredFaqs = useMemo(() => {
    return faqs.filter(f => {
      const matchesCategory = activeCategory === 'All' || f.category === activeCategory;
      const matchesSearch = f.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            f.answer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, activeCategory]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setTimeout(() => setSubmitSuccess(false), 3000);
    }, 1500);
  };

  if (isLoading) {
    return (
      <div className="space-y-8 animate-in fade-in pb-10">
        <div className="h-20 w-1/3 bg-white/5 animate-pulse rounded-2xl" />
        <div className="flex gap-4 border-b border-white/10 pb-4">
          <div className="h-8 w-24 bg-white/5 animate-pulse rounded-full" />
          <div className="h-8 w-24 bg-white/5 animate-pulse rounded-full" />
        </div>
        <div className="space-y-4">
          {[1,2,3].map(i => <div key={i} className="h-16 w-full bg-white/5 animate-pulse rounded-2xl" />)}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-10">
      
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00daf3]/10 border border-[#00daf3]/30 text-[#00daf3] text-xs font-mono mb-2">
          <LifeBuoy size={14} />
          <span>Support Center</span>
        </div>
        <h1 className="text-3xl font-bold text-white tracking-tight">How can we help?</h1>
      </div>

      {/* Tabs */}
      <div className="flex overflow-x-auto gap-2 border-b border-white/10 pb-4 hide-scrollbar">
        {[
          { id: 'faq', label: 'FAQ', icon: HelpCircle },
          { id: 'contact', label: 'Contact Us', icon: MessageCircle },
          { id: 'feedback', label: 'Feedback', icon: Lightbulb },
          { id: 'about', label: 'About', icon: Info }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all shrink-0 ${
              activeTab === tab.id 
                ? 'bg-[#00daf3] text-[#00363d] shadow-[0_0_15px_rgba(0,229,255,0.3)]' 
                : 'text-[#bac9cc] hover:bg-white/5 hover:text-white'
            }`}
          >
            <tab.icon size={16} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {/* FAQ TAB */}
          {activeTab === 'faq' && (
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row gap-4 bg-[#0a0d1c]/80 p-4 rounded-3xl border border-white/10">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-3.5 text-[#bac9cc] w-4 h-4" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search for answers..."
                    className="w-full bg-[#0f1321] border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-sm text-white placeholder-white/30 focus:border-[#00daf3] focus:outline-none transition-colors"
                  />
                </div>
                <div className="flex flex-wrap gap-2 items-center">
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all border ${
                        activeCategory === cat 
                          ? 'bg-[#00daf3]/20 border-[#00daf3]/40 text-[#00daf3]' 
                          : 'bg-white/5 border-white/10 text-[#bac9cc] hover:bg-white/10'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {filteredFaqs.length === 0 ? (
                <div className="glass-card rounded-3xl p-12 flex flex-col items-center justify-center text-center border border-white/10 border-dashed">
                  <HelpCircle size={48} className="text-white/20 mb-4" />
                  <h3 className="text-lg font-bold text-white">No FAQs found</h3>
                  <p className="text-sm text-[#bac9cc] mt-1">Try adjusting your search terms.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredFaqs.map(faq => (
                    <div key={faq.id} className="glass-card rounded-2xl border border-white/10 overflow-hidden">
                      <button 
                        onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                        className="w-full flex items-center justify-between p-5 text-left hover:bg-white/5 transition-colors"
                      >
                        <span className="font-bold text-white">{faq.question}</span>
                        <ChevronDown size={18} className={`text-[#bac9cc] transition-transform ${expandedFaq === faq.id ? 'rotate-180' : ''}`} />
                      </button>
                      <AnimatePresence>
                        {expandedFaq === faq.id && (
                          <motion.div 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="px-5 pb-5 text-sm text-[#bac9cc] leading-relaxed border-t border-white/5 pt-4"
                          >
                            {faq.answer}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* CONTACT TAB */}
          {activeTab === 'contact' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              <div className="glass-card rounded-3xl p-6 md:p-8 border border-white/10">
                <h2 className="text-xl font-bold text-white mb-2">Send us a message</h2>
                <p className="text-sm text-[#bac9cc] mb-6">Our support team usually responds within 24 hours.</p>
                
                {submitSuccess ? (
                  <div className="p-8 text-center rounded-2xl bg-green-500/10 border border-green-500/20 text-green-400">
                    <CheckCircle2 size={48} className="mx-auto mb-4" />
                    <h3 className="font-bold text-lg mb-1">Message Sent!</h3>
                    <p className="text-xs">We'll get back to you shortly.</p>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-[#bac9cc] uppercase tracking-wider">Subject</label>
                      <input required type="text" className="w-full bg-[#0a0d1c] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-[#00daf3] focus:outline-none transition-colors" placeholder="How can we help?" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-[#bac9cc] uppercase tracking-wider">Message</label>
                      <textarea required rows={5} className="w-full bg-[#0a0d1c] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-[#00daf3] focus:outline-none transition-colors resize-none" placeholder="Describe your issue in detail..."></textarea>
                    </div>
                    <button disabled={isSubmitting} type="submit" className="w-full py-3 rounded-xl bg-[#00daf3] text-[#00363d] font-bold text-sm hover:brightness-110 transition-all flex items-center justify-center gap-2 disabled:opacity-50">
                      {isSubmitting ? <div className="w-5 h-5 rounded-full border-2 border-[#00363d]/30 border-t-[#00363d] animate-spin" /> : <><Send size={16} /> Send Message</>}
                    </button>
                  </form>
                )}
              </div>

              <div className="space-y-6">
                <div className="glass-card rounded-3xl p-6 border border-white/10 flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-white">Email Support</h3>
                    <p className="text-sm text-[#bac9cc] mt-1 mb-2">Direct email assistance for complex issues.</p>
                    <a href="mailto:support@finguard.ai" className="text-[#00daf3] text-sm font-bold hover:underline">support@finguard.ai</a>
                  </div>
                </div>

                <div className="glass-card rounded-3xl p-6 border border-[#00daf3]/30 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#00daf3]/5 to-transparent pointer-events-none" />
                  <div className="flex items-start gap-4 relative z-10">
                    <div className="p-3 rounded-xl bg-[#00daf3]/10 text-[#00daf3]">
                      <MessageSquare size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-white flex items-center gap-2">
                        Live Chat 
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      </h3>
                      <p className="text-sm text-[#bac9cc] mt-1 mb-4">Chat with our AI assistant or a live agent.</p>
                      <button className="px-5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-colors border border-white/10">
                        Start Chat
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* FEEDBACK TAB */}
          {activeTab === 'feedback' && (
            <div className="glass-card rounded-3xl p-6 md:p-8 border border-white/10 max-w-3xl mx-auto">
              <h2 className="text-xl font-bold text-white mb-6">Help us improve FinGuard AI</h2>
              
              <div className="flex flex-wrap gap-3 mb-8">
                {[
                  { id: 'bug', label: 'Report a Bug', icon: Bug },
                  { id: 'feature', label: 'Feature Request', icon: Lightbulb },
                  { id: 'general', label: 'General Feedback', icon: MessageCircle }
                ].map(type => (
                  <button
                    key={type.id}
                    onClick={() => setFeedbackType(type.id)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all border ${
                      feedbackType === type.id 
                        ? 'bg-[#00daf3]/20 border-[#00daf3]/50 text-[#00daf3]' 
                        : 'bg-[#0a0d1c] border-white/10 text-[#bac9cc] hover:bg-white/5'
                    }`}
                  >
                    <type.icon size={16} />
                    {type.label}
                  </button>
                ))}
              </div>

              {submitSuccess ? (
                <div className="p-8 text-center rounded-2xl bg-green-500/10 border border-green-500/20 text-green-400">
                  <CheckCircle2 size={48} className="mx-auto mb-4" />
                  <h3 className="font-bold text-lg mb-1">Feedback Submitted!</h3>
                  <p className="text-xs">Thank you for helping us improve.</p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#bac9cc] uppercase tracking-wider">Title</label>
                    <input required type="text" className="w-full bg-[#0a0d1c] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-[#00daf3] focus:outline-none transition-colors" placeholder="Brief summary..." />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#bac9cc] uppercase tracking-wider">Details</label>
                    <textarea required rows={6} className="w-full bg-[#0a0d1c] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-[#00daf3] focus:outline-none transition-colors resize-none" placeholder="Provide as much detail as possible..."></textarea>
                  </div>
                  <button disabled={isSubmitting} type="submit" className="py-3 px-8 rounded-xl bg-white text-[#00363d] font-bold text-sm hover:bg-gray-200 transition-all flex items-center gap-2 disabled:opacity-50">
                    {isSubmitting ? <div className="w-5 h-5 rounded-full border-2 border-[#00363d]/30 border-t-[#00363d] animate-spin" /> : 'Submit Feedback'}
                  </button>
                </form>
              )}
            </div>
          )}

          {/* ABOUT TAB */}
          {activeTab === 'about' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="glass-card rounded-3xl p-8 border border-white/10 flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#00e5ff]/20 to-[#6001d1]/30 border border-[#00e5ff]/40 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(0,229,255,0.2)]">
                  <Shield size={32} className="text-[#00daf3]" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-1">FinGuard AI</h2>
                <p className="text-[#bac9cc] text-sm mb-4">Version 2.4.0 (Stable)</p>
                <p className="text-xs text-[#bac9cc]/70">© 2024 FinGuard Security Systems. All rights reserved.</p>
              </div>

              <div className="space-y-4">
                <button className="w-full glass-card p-5 rounded-2xl border border-white/10 hover:bg-white/5 transition-colors flex items-center justify-between group">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-white/5 text-[#bac9cc] group-hover:text-white"><FileText size={18} /></div>
                    <span className="font-bold text-white">Terms of Service</span>
                  </div>
                  <ChevronDown size={18} className="text-[#bac9cc] -rotate-90" />
                </button>
                <button className="w-full glass-card p-5 rounded-2xl border border-white/10 hover:bg-white/5 transition-colors flex items-center justify-between group">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-white/5 text-[#bac9cc] group-hover:text-white"><Shield size={18} /></div>
                    <span className="font-bold text-white">Privacy Policy</span>
                  </div>
                  <ChevronDown size={18} className="text-[#bac9cc] -rotate-90" />
                </button>
                <button className="w-full glass-card p-5 rounded-2xl border border-white/10 hover:bg-white/5 transition-colors flex items-center justify-between group">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-white/5 text-[#bac9cc] group-hover:text-white"><Bug size={18} /></div>
                    <span className="font-bold text-white">Release Notes</span>
                  </div>
                  <ChevronDown size={18} className="text-[#bac9cc] -rotate-90" />
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

    </div>
  );
};
