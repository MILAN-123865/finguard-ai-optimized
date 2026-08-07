import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, BookOpen, Flame, Bookmark, ChevronRight, ShieldAlert, Layers, FilterX } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { articles, Article } from './data/articles';

const STORAGE_KEY = 'scam_knowledge_bookmarks_v1';

export const KnowledgeCenterView: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeTab, setActiveTab] = useState<'all' | 'trending' | 'bookmarks'>('all');
  
  const [bookmarks, setBookmarks] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return new Set(JSON.parse(saved));
      }
    } catch {
      // Fallback
    }
    return new Set(['banking-scam-1', 'payments-scam-1', 'social-scam-2', 'mobile-scam-1']);
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(bookmarks)));
    } catch {
      // Ignore
    }
  }, [bookmarks]);

  const toggleBookmark = (e: React.MouseEvent, articleId: string) => {
    e.stopPropagation();
    setBookmarks(prev => {
      const next = new Set(prev);
      if (next.has(articleId)) {
        next.delete(articleId);
      } else {
        next.add(articleId);
      }
      return next;
    });
  };

  const categories = useMemo(() => {
    const defaultCategories = [
      'All',
      'Banking',
      'Payments',
      'Social Media',
      'Mobile Security',
      'Identity Theft',
      'Financial Fraud',
      'Employment Scams',
      'Investment Scams',
      'General Fraud'
    ];
    const existingFromData = Array.from(new Set(articles.map(a => a.category)));
    return Array.from(new Set([...defaultCategories, ...existingFromData]));
  }, []);

  const filteredArticles = useMemo(() => {
    let result = articles;

    if (activeTab === 'trending') {
      result = result.filter(a => a.isTrending || a.severity === 'Critical' || a.severity === 'High');
    } else if (activeTab === 'bookmarks') {
      result = result.filter(a => bookmarks.has(a.id));
    }

    if (activeCategory !== 'All') {
      result = result.filter(a => a.category === activeCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(a => {
        const titleMatch = a.title.toLowerCase().includes(q);
        const descMatch = a.description.toLowerCase().includes(q);
        const categoryMatch = a.category.toLowerCase().includes(q);
        const tagsMatch = a.tags?.some(tag => tag.toLowerCase().includes(q));
        return titleMatch || descMatch || categoryMatch || tagsMatch;
      });
    }

    return result;
  }, [searchQuery, activeCategory, activeTab, bookmarks]);

  const getSeverityBadge = (severity?: Article['severity']) => {
    switch (severity) {
      case 'Critical':
        return <span className="px-2 py-0.5 rounded-md bg-red-50 text-[#EF4444] border border-red-200 text-[10px] font-bold">CRITICAL</span>;
      case 'High':
        return <span className="px-2 py-0.5 rounded-md bg-amber-50 text-[#F59E0B] border border-amber-200 text-[10px] font-bold">HIGH</span>;
      case 'Medium':
        return <span className="px-2 py-0.5 rounded-md bg-[#DDF2EA] text-[#11875D] border border-[#11875D]/30 text-[10px] font-bold">MEDIUM</span>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300 pb-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#DDF2EA] border border-[#11875D]/30 text-[#11875D] text-xs font-bold mb-2">
            <BookOpen size={14} />
            <span>Knowledge Hub</span>
          </div>
          <h1 className="text-3xl font-bold text-[#111827] tracking-tight">Scam Knowledge Center</h1>
          <p className="text-xs text-[#64748B] mt-1 font-medium">
            Learn to identify, prevent, and respond to modern financial cybercrimes across expert guides.
          </p>
        </div>
      </div>

      {/* Search & Categories */}
      <div className="flex flex-col gap-4 bg-white p-4 rounded-[20px] border border-[#E4E7E5] shadow-xs">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3.5 top-3.5 text-[#64748B] w-4 h-4" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search scams, techniques, tags, or prevention tips..."
            className="w-full bg-[#F8FAFC] border border-[#E4E7E5] rounded-[16px] py-2.5 pl-10 pr-10 text-xs text-[#111827] placeholder-[#64748B] focus:border-[#11875D] focus:outline-none transition-colors"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-3 text-[#64748B] hover:text-[#111827] text-xs font-bold"
            >
              ✕
            </button>
          )}
        </div>
        
        <div className="flex flex-wrap gap-2 items-center">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-[12px] text-xs font-bold transition-all border cursor-pointer ${
                activeCategory === cat 
                  ? 'bg-[#11875D] border-[#11875D] text-white shadow-2xs' 
                  : 'bg-[#F8FAFC] border-[#E4E7E5] text-[#64748B] hover:text-[#111827] hover:bg-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center justify-between border-b border-[#E4E7E5] pb-2">
        <div className="flex gap-6">
          <button 
            onClick={() => setActiveTab('all')}
            className={`flex items-center gap-2 text-sm font-bold transition-colors relative pb-2 cursor-pointer ${activeTab === 'all' ? 'text-[#11875D]' : 'text-[#64748B] hover:text-[#111827]'}`}
          >
            <Layers size={16} className={activeTab === 'all' ? 'text-[#11875D]' : ''} />
            All Articles ({articles.length})
            {activeTab === 'all' && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#11875D] rounded-t-md" />}
          </button>
          <button 
            onClick={() => setActiveTab('trending')}
            className={`flex items-center gap-2 text-sm font-bold transition-colors relative pb-2 cursor-pointer ${activeTab === 'trending' ? 'text-[#11875D]' : 'text-[#64748B] hover:text-[#111827]'}`}
          >
            <Flame size={16} className={activeTab === 'trending' ? 'text-[#EF4444]' : ''} />
            Trending & Critical
            {activeTab === 'trending' && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#EF4444] rounded-t-md" />}
          </button>
          <button 
            onClick={() => setActiveTab('bookmarks')}
            className={`flex items-center gap-2 text-sm font-bold transition-colors relative pb-2 cursor-pointer ${activeTab === 'bookmarks' ? 'text-[#11875D]' : 'text-[#64748B] hover:text-[#111827]'}`}
          >
            <Bookmark size={16} className={activeTab === 'bookmarks' ? 'text-[#11875D]' : ''} />
            Saved ({bookmarks.size})
            {activeTab === 'bookmarks' && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#11875D] rounded-t-md" />}
          </button>
        </div>
      </div>

      {/* Articles Grid */}
      {filteredArticles.length === 0 ? (
        <div className="bg-white rounded-[20px] p-12 flex flex-col items-center justify-center text-center border border-[#E4E7E5] shadow-xs">
          <ShieldAlert size={48} className="text-[#64748B] mb-4" />
          <h3 className="text-lg font-bold text-[#111827]">No articles found</h3>
          <p className="text-xs text-[#64748B] mt-1 max-w-md">
            We couldn't find any articles matching your search query or category selection.
          </p>
          <button 
            onClick={() => { setSearchQuery(''); setActiveCategory('All'); setActiveTab('all'); }}
            className="mt-4 inline-flex items-center gap-2 px-5 py-2 rounded-[12px] bg-[#DDF2EA] text-[#11875D] text-xs font-bold transition-all cursor-pointer"
          >
            <FilterX size={14} /> Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map(article => {
            const isSaved = bookmarks.has(article.id);
            return (
              <div 
                key={article.id} 
                onClick={() => navigate(`/knowledge/${article.id}`)}
                className="bg-white rounded-[20px] p-6 border border-[#E4E7E5] hover:shadow-md transition-shadow cursor-pointer group flex flex-col h-full relative"
              >
                <div className="flex justify-between items-center mb-4 gap-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-md bg-[#DDF2EA] text-[#11875D] text-[10px] uppercase font-bold tracking-wider">
                      {article.category}
                    </span>
                    {getSeverityBadge(article.severity)}
                  </div>
                  <button
                    onClick={(e) => toggleBookmark(e, article.id)}
                    title={isSaved ? 'Remove Bookmark' : 'Save Bookmark'}
                    className="p-1.5 rounded-lg hover:bg-[#F8FAFC] text-[#64748B] transition-colors"
                  >
                    <Bookmark 
                      size={16} 
                      className={isSaved ? 'text-[#11875D] fill-[#11875D]' : 'text-[#64748B]'} 
                    />
                  </button>
                </div>
                
                <h3 className="text-lg font-bold text-[#111827] group-hover:text-[#11875D] transition-colors mb-2 leading-snug">
                  {article.title}
                </h3>
                
                <p className="text-xs text-[#64748B] line-clamp-3 mb-6 flex-1 leading-relaxed">
                  {article.description}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-[#E4E7E5] text-[11px] text-[#64748B]">
                  <span>{article.readTime} • {article.date}</span>
                  <span className="flex items-center gap-1 text-[#11875D] font-bold uppercase tracking-wider">
                    Read <ChevronRight size={14} />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
