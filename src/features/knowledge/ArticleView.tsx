import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { articles, Article } from './data/articles';
import { ArrowLeft, Bookmark, Share2, Clock, Calendar, ShieldAlert, ShieldCheck, HelpCircle, AlertTriangle, User, Tag, Award } from 'lucide-react';
import { motion, useScroll, useSpring } from 'framer-motion';

const STORAGE_KEY = 'scam_knowledge_bookmarks_v1';

export const ArticleView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const article = articles.find(a => a.id === id);

  useEffect(() => {
    // Scroll to top on load
    window.scrollTo(0, 0);

    // Check localStorage for bookmark status
    if (id) {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const bookmarkSet = new Set(JSON.parse(saved));
          setIsBookmarked(bookmarkSet.has(id));
        }
      } catch {
        // Fallback
      }
    }
  }, [id]);

  const toggleBookmark = () => {
    if (!id) return;
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      const bookmarkSet = new Set<string>(saved ? JSON.parse(saved) : ['banking-scam-1']);
      if (bookmarkSet.has(id)) {
        bookmarkSet.delete(id);
        setIsBookmarked(false);
      } else {
        bookmarkSet.add(id);
        setIsBookmarked(true);
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(bookmarkSet)));
    } catch {
      setIsBookmarked(!isBookmarked);
    }
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }
  };

  if (!article) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Article Not Found</h2>
        <p className="text-[#bac9cc] mb-6">The article you are looking for does not exist or has been moved.</p>
        <button onClick={() => navigate('/knowledge')} className="px-6 py-2 rounded-xl bg-[#00daf3] text-[#00363d] font-bold text-xs hover:brightness-110 transition-colors">
          Return to Knowledge Center
        </button>
      </div>
    );
  }

  const relatedArticles = articles.filter(a => article.relatedIds?.includes(a.id));

  return (
    <div className="animate-in fade-in duration-500 pb-20 relative">
      {/* Reading Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-[#00daf3] origin-left z-50 shadow-[0_0_10px_#00daf3]" 
        style={{ scaleX }} 
      />

      {/* Navigation & Actions */}
      <div className="flex items-center justify-between mb-8">
        <button 
          onClick={() => navigate('/knowledge')}
          className="flex items-center gap-2 text-[#bac9cc] hover:text-white transition-colors font-mono text-xs font-bold uppercase tracking-wider"
        >
          <ArrowLeft size={16} /> Back to Knowledge Center
        </button>
        <div className="flex gap-2 items-center">
          <button 
            onClick={toggleBookmark}
            title={isBookmarked ? 'Remove Bookmark' : 'Save Article'}
            className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white transition-colors flex items-center gap-2 text-xs font-mono"
          >
            <Bookmark size={18} className={isBookmarked ? 'fill-[#00daf3] text-[#00daf3]' : 'text-white'} />
            <span className="hidden sm:inline">{isBookmarked ? 'Saved' : 'Save'}</span>
          </button>
          <button 
            onClick={handleShare}
            title="Share Article"
            className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white transition-colors flex items-center gap-2 text-xs font-mono relative"
          >
            <Share2 size={18} />
            <span className="hidden sm:inline">{copySuccess ? 'Copied Link!' : 'Share'}</span>
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto space-y-12">
        {/* Hero Section */}
        <div className="space-y-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00daf3]/10 border border-[#00daf3]/30 text-[#00daf3] text-xs font-mono">
            <span>{article.category}</span>
            {article.severity && (
              <>
                <span>•</span>
                <span className="font-bold">{article.severity} Severity</span>
              </>
            )}
          </div>

          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-[#bac9cc] font-mono">
            {article.author && (
              <span className="flex items-center gap-1.5 text-white font-bold"><User size={14} className="text-[#00daf3]" /> {article.author}</span>
            )}
            <span className="flex items-center gap-1.5"><Clock size={14} /> {article.readTime}</span>
            <span className="flex items-center gap-1.5"><Calendar size={14} /> {article.date}</span>
            {article.difficultyLevel && (
              <span className="flex items-center gap-1.5"><Award size={14} className="text-amber-400" /> {article.difficultyLevel} Level</span>
            )}
          </div>

          {article.tags && article.tags.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2 pt-2">
              {article.tags.map((tag, idx) => (
                <span key={idx} className="px-2.5 py-1 rounded-md bg-white/5 text-[#bac9cc] text-xs font-mono border border-white/5">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Description / Intro */}
        <div className="text-lg text-[#dfe1f6] leading-relaxed border-l-4 border-[#00daf3] pl-6 font-sans bg-white/[0.02] py-4 pr-4 rounded-r-2xl">
          {article.description}
        </div>

        {/* How It Works */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <ShieldAlert className="text-red-400" /> How the Scam Works
          </h2>
          <div className="grid gap-4">
            {article.howItWorks.map((step, index) => (
              <div key={index} className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors">
                <div className="w-8 h-8 rounded-full bg-red-500/10 text-red-400 flex items-center justify-center font-bold font-mono shrink-0">
                  {index + 1}
                </div>
                <p className="text-[#bac9cc] leading-relaxed pt-1 text-sm md:text-base">{step}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Warning Signs */}
          <section className="space-y-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <AlertTriangle className="text-amber-400" /> Warning Signs (Red Flags)
            </h2>
            <ul className="space-y-3">
              {article.warningSigns.map((sign, index) => (
                <li key={index} className="flex gap-3 text-[#bac9cc] text-sm leading-relaxed p-3 rounded-xl bg-white/5 border border-white/5">
                  <span className="text-amber-400 font-bold mt-0.5">•</span>
                  <span>{sign}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Prevention Tips */}
          <section className="space-y-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <ShieldCheck className="text-green-400" /> Prevention Tips
            </h2>
            <ul className="space-y-3">
              {article.preventionTips.map((tip, index) => (
                <li key={index} className="flex gap-3 text-[#bac9cc] text-sm leading-relaxed p-3 rounded-xl bg-white/5 border border-white/5">
                  <span className="text-green-400 font-bold mt-0.5">✓</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Real Example Case Study */}
        <section className="glass-card rounded-3xl p-8 border border-[#00daf3]/30 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#00daf3]/5 rounded-full blur-3xl pointer-events-none" />
          <div className="text-xs font-mono font-bold text-[#00daf3] uppercase tracking-wider mb-1">Real-World Case Study</div>
          <h3 className="text-xl font-bold text-white mb-4">{article.realExample.title}</h3>
          <p className="text-[#bac9cc] leading-relaxed relative z-10 italic text-sm md:text-base">
            "{article.realExample.description}"
          </p>
        </section>

        {/* FAQs */}
        {article.faqs && article.faqs.length > 0 && (
          <section className="space-y-6 pt-8 border-t border-white/10">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <HelpCircle className="text-[#00daf3]" /> Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {article.faqs.map((faq, index) => (
                <div key={index} className="p-5 rounded-2xl bg-[#0a0d1c] border border-white/10">
                  <h4 className="font-bold text-white mb-2 text-base">{faq.question}</h4>
                  <p className="text-sm text-[#bac9cc] leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <section className="pt-12 border-t border-white/10">
            <h2 className="text-xl font-bold text-white mb-6">Related Articles</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {relatedArticles.map(rel => (
                <div 
                  key={rel.id} 
                  onClick={() => navigate(`/knowledge/${rel.id}`)}
                  className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-[#00daf3]/40 cursor-pointer transition-colors group"
                >
                  <span className="text-[10px] uppercase font-bold text-[#00daf3] font-mono">{rel.category}</span>
                  <h4 className="font-bold text-white mt-1 group-hover:text-[#00daf3] transition-colors">{rel.title}</h4>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
