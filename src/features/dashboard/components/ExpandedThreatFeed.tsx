import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, X, Filter, Bookmark, BookmarkCheck, TrendingUp, AlertTriangle, 
  ShieldAlert, ShieldCheck, Zap, Activity, Globe, Smartphone, RefreshCw, XCircle
} from 'lucide-react';
import { ThreatDetailsDrawer, ThreatDetail } from './ThreatDetailsDrawer';

const mockCategories = [
  "All", "Banking Scam", "UPI Fraud", "WhatsApp Scam", "SMS Scam", 
  "Investment Scam", "Loan Scam", "KYC Scam", "Lottery Scam", "Courier Scam"
];

const mockThreats: ThreatDetail[] = [
  {
    id: "1",
    name: "Fake KYC Verification",
    type: "Phishing SMS",
    target: "Bank Customers",
    risk: "CRITICAL",
    time: "2m ago",
    category: "KYC Scam",
    description: "Fraudsters send SMS claiming bank account will be blocked unless KYC is updated via a malicious link.",
    targetAudience: "Seniors & Non-tech savvy",
    method: "SMS Phishing (Smishing)",
    preventionTips: ["Never click links in SMS", "Call bank directly", "Use official banking app"],
    relatedThreats: ["PAN Card Link Scam", "Aadhaar Update Fraud"],
    timeline: [
      { status: 'New Threat', date: 'Oct 12, 10:00 AM' },
      { status: 'Updated Threat', date: 'Oct 12, 11:30 AM' }
    ],
    region: "Global",
    status: "Active"
  },
  {
    id: "2",
    name: "WhatsApp Job Offer",
    type: "Social Engineering",
    target: "Job Seekers",
    risk: "HIGH",
    time: "15m ago",
    category: "WhatsApp Scam",
    description: "Scammers offer part-time jobs via WhatsApp, asking for an initial 'training fee' or 'deposit'.",
    targetAudience: "Students & Unemployed",
    method: "Advance Fee Fraud",
    preventionTips: ["Verify company details", "Never pay for a job", "Report sender"],
    relatedThreats: ["Telegram Task Scam", "YouTube Like Fraud"],
    timeline: [
      { status: 'New Threat', date: 'Oct 10, 09:00 AM' },
      { status: 'Updated Threat', date: 'Oct 11, 02:15 PM' },
      { status: 'Resolved Threat', date: 'Oct 12, 08:00 AM' }
    ],
    region: "Asia",
    status: "Resolved"
  },
  {
    id: "3",
    name: "FedEx Courier Held",
    type: "Impersonation",
    target: "Online Shoppers",
    risk: "MEDIUM",
    time: "1h ago",
    category: "Courier Scam",
    description: "Victims receive calls stating a parcel with illegal items is held in their name by customs.",
    targetAudience: "General Public",
    method: "Vishing (Voice Phishing)",
    preventionTips: ["Do not panic", "Ask for tracking number", "Disconnect and contact police"],
    relatedThreats: ["Customs Clearance Scam"],
    timeline: [
      { status: 'New Threat', date: 'Oct 12, 07:00 AM' }
    ],
    region: "North America",
    status: "Active"
  },
  {
    id: "4",
    name: "Crypto Doubling Scheme",
    type: "Investment Fraud",
    target: "Crypto Enthusiasts",
    risk: "CRITICAL",
    time: "3h ago",
    category: "Investment Scam",
    description: "Fake websites promising 200% returns on Bitcoin deposits within 24 hours.",
    targetAudience: "Young Investors",
    method: "Ponzi Scheme",
    preventionTips: ["If it sounds too good to be true, it is", "Research the platform", "Check regulatory licenses"],
    relatedThreats: ["Fake Trading Bot", "Rug Pull Token"],
    timeline: [
      { status: 'New Threat', date: 'Oct 09, 11:00 AM' },
      { status: 'Updated Threat', date: 'Oct 10, 10:00 AM' }
    ],
    region: "Europe",
    status: "Active"
  },
  {
    id: "5",
    name: "Instant Loan App Extortion",
    type: "Malware/Extortion",
    target: "Low Income Individuals",
    risk: "HIGH",
    time: "5h ago",
    category: "Loan Scam",
    description: "Apps offer quick loans but steal contacts and gallery photos to blackmail victims later.",
    targetAudience: "Financially Vulnerable",
    method: "Malicious App / Blackmail",
    preventionTips: ["Check app permissions", "Read reviews", "Use registered NBFCs only"],
    relatedThreats: ["Fake Loan Approval Fee"],
    timeline: [
      { status: 'New Threat', date: 'Oct 01, 10:00 AM' },
      { status: 'Updated Threat', date: 'Oct 05, 04:30 PM' }
    ],
    region: "South Asia",
    status: "Active"
  }
];

export const ExpandedThreatFeed: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(new Set());
  const [showBookmarksOnly, setShowBookmarksOnly] = useState(false);
  const [selectedThreat, setSelectedThreat] = useState<ThreatDetail | null>(null);
  
  // States for simulating network
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const toggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setBookmarkedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const simulateError = () => {
    setIsLoading(true);
    setHasError(false);
    setTimeout(() => {
      setIsLoading(false);
      setHasError(true);
    }, 1000);
  };

  const retryLoad = () => {
    setIsLoading(true);
    setHasError(false);
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  const filteredThreats = mockThreats.filter(threat => {
    const matchesCategory = activeCategory === "All" || threat.category === activeCategory;
    const matchesSearch = threat.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          threat.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          threat.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesBookmark = showBookmarksOnly ? bookmarkedIds.has(threat.id) : true;
    return matchesCategory && matchesSearch && matchesBookmark;
  });

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-black/80 backdrop-blur-md"
    >
      <div className="relative w-full max-w-7xl h-full max-h-[90vh] bg-[#0a0d1a] border border-white/10 rounded-3xl shadow-2xl flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#00daf3]/10 rounded-lg">
              <Globe className="text-[#00daf3]" size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Threat Intelligence</h2>
              <p className="text-sm text-[#bac9cc] font-mono">Global SOC Feed & Analytics</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-colors text-white">
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
          
          {/* Stats Row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-4">
              <div className="p-3 bg-blue-500/20 rounded-xl text-blue-400"><Activity size={24} /></div>
              <div>
                <div className="text-2xl font-bold text-white">2,451</div>
                <div className="text-xs text-[#bac9cc]">Active Threats</div>
              </div>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-4">
              <div className="p-3 bg-red-500/20 rounded-xl text-red-400"><ShieldAlert size={24} /></div>
              <div>
                <div className="text-2xl font-bold text-white">184</div>
                <div className="text-xs text-[#bac9cc]">High Risk</div>
              </div>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-4">
              <div className="p-3 bg-yellow-500/20 rounded-xl text-yellow-400"><AlertTriangle size={24} /></div>
              <div>
                <div className="text-2xl font-bold text-white">892</div>
                <div className="text-xs text-[#bac9cc]">Medium Risk</div>
              </div>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-4">
              <div className="p-3 bg-green-500/20 rounded-xl text-green-400"><ShieldCheck size={24} /></div>
              <div>
                <div className="text-2xl font-bold text-white">1,240</div>
                <div className="text-xs text-[#bac9cc]">Safe Alerts</div>
              </div>
            </div>
          </div>

          {/* Trending Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <TrendingUp size={20} className="text-[#00daf3]" /> Trending Threats
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-gradient-to-br from-red-500/10 to-transparent border border-red-500/20">
                <div className="text-xs text-red-400 font-bold mb-1">Top Active Scam</div>
                <div className="text-white font-medium">Crypto Doubling Scheme</div>
                <div className="text-xs text-[#bac9cc] mt-2">+240% increase this week</div>
              </div>
              <div className="p-4 rounded-xl bg-gradient-to-br from-orange-500/10 to-transparent border border-orange-500/20">
                <div className="text-xs text-orange-400 font-bold mb-1">Most Reported</div>
                <div className="text-white font-medium">Fake KYC Verification</div>
                <div className="text-xs text-[#bac9cc] mt-2">1,200+ reports today</div>
              </div>
              <div className="p-4 rounded-xl bg-gradient-to-br from-purple-500/10 to-transparent border border-purple-500/20">
                <div className="text-xs text-purple-400 font-bold mb-1">Recently Blocked Domain</div>
                <div className="text-white font-medium">secure-bank-update-auth.com</div>
                <div className="text-xs text-[#bac9cc] mt-2">Blocked 5 mins ago</div>
              </div>
            </div>
          </div>

          {/* Controls: Search, Filter, Categories */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="relative w-full sm:w-96">
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#bac9cc]" />
                <input 
                  type="text" 
                  placeholder="Search by Scam Name, Domain, Category..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#0a0d1a] border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-[#00daf3]/50 transition-colors"
                />
              </div>
              
              <div className="flex items-center gap-3 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0">
                <button 
                  onClick={() => setShowBookmarksOnly(!showBookmarksOnly)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm transition-colors whitespace-nowrap ${showBookmarksOnly ? 'bg-blue-500/20 text-blue-400 border border-blue-500/40' : 'bg-white/5 text-[#bac9cc] border border-white/10 hover:bg-white/10'}`}
                >
                  {showBookmarksOnly ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
                  Saved Threats
                </button>
                <button onClick={simulateError} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-[#bac9cc] hover:bg-white/10 transition-colors text-sm whitespace-nowrap">
                  <Filter size={16} /> Advanced Filters
                </button>
              </div>
            </div>

            {/* Category Chips */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 custom-scrollbar">
              {mockCategories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                    activeCategory === cat 
                      ? 'bg-[#00daf3] text-[#0a0d1a]' 
                      : 'bg-white/5 text-[#bac9cc] border border-white/10 hover:bg-white/10'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Main Feed Content */}
          <div className="min-h-[300px]">
            {isLoading ? (
              // Loading State (Skeletons)
              <div className="space-y-3">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center gap-4 animate-pulse">
                    <div className="w-10 h-10 rounded-full bg-white/10 shrink-0" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-white/10 rounded w-1/3" />
                      <div className="h-3 bg-white/5 rounded w-1/4" />
                    </div>
                    <div className="w-16 h-6 bg-white/10 rounded-full" />
                  </div>
                ))}
              </div>
            ) : hasError ? (
              // Error State
              <div className="flex flex-col items-center justify-center py-12 space-y-4">
                <div className="p-4 rounded-full bg-red-500/10 text-red-400">
                  <XCircle size={40} />
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-bold text-white mb-1">Network Error</h3>
                  <p className="text-sm text-[#bac9cc]">Failed to fetch threat intelligence data.</p>
                </div>
                <button onClick={retryLoad} className="flex items-center gap-2 px-6 py-2 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-colors text-sm">
                  <RefreshCw size={16} /> Retry
                </button>
              </div>
            ) : filteredThreats.length === 0 ? (
              // Empty State
              <div className="flex flex-col items-center justify-center py-16 space-y-4 opacity-70">
                <div className="relative">
                  <ShieldCheck size={64} className="text-[#00daf3]/50" />
                  <motion.div 
                    animate={{ rotate: 360 }} 
                    transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                    className="absolute inset-0 border-2 border-dashed border-[#00daf3]/30 rounded-full scale-125"
                  />
                </div>
                <div className="text-center mt-6">
                  <h3 className="text-lg font-bold text-white mb-1">No Threats Found</h3>
                  <p className="text-sm text-[#bac9cc]">Adjust your filters or search query.</p>
                </div>
              </div>
            ) : (
              // Threat List
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <AnimatePresence>
                  {filteredThreats.map((threat) => (
                    <motion.div
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      whileHover={{ scale: 1.02 }}
                      key={threat.id}
                      onClick={() => setSelectedThreat(threat)}
                      className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-[#00daf3]/50 transition-all cursor-pointer flex flex-col justify-between group"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${threat.risk === 'CRITICAL' ? 'bg-red-500/20 text-red-400' : threat.risk === 'HIGH' ? 'bg-orange-500/20 text-orange-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                            {threat.category.includes('WhatsApp') || threat.category.includes('SMS') ? <Smartphone size={20} /> : <Zap size={20} />}
                          </div>
                          <div>
                            <h4 className="text-white font-bold text-sm group-hover:text-[#00daf3] transition-colors">{threat.name}</h4>
                            <p className="text-xs text-[#bac9cc] font-mono">{threat.category}</p>
                          </div>
                        </div>
                        <button 
                          onClick={(e) => toggleBookmark(threat.id, e)}
                          className="text-[#bac9cc] hover:text-white transition-colors"
                        >
                          {bookmarkedIds.has(threat.id) ? <BookmarkCheck size={20} className="text-blue-400" /> : <Bookmark size={20} />}
                        </button>
                      </div>

                      <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                        <div className="flex items-center gap-2">
                           <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold font-mono border ${threat.risk === 'CRITICAL' ? 'border-red-500/40 text-red-400 bg-red-500/10' : threat.risk === 'HIGH' ? 'border-orange-500/40 text-orange-400 bg-orange-500/10' : 'border-yellow-500/40 text-yellow-400 bg-yellow-500/10'}`}>
                            {threat.risk}
                          </span>
                          <span className="text-[10px] text-[#bac9cc] font-mono">{threat.time}</span>
                        </div>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full border ${threat.status === 'Active' ? 'border-red-500/30 text-red-300' : 'border-green-500/30 text-green-300'}`}>
                          {threat.status}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Drawer Overlay */}
      <ThreatDetailsDrawer 
        isOpen={!!selectedThreat} 
        onClose={() => setSelectedThreat(null)} 
        threat={selectedThreat} 
      />
    </motion.div>
  );
};
