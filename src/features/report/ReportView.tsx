import React, { useState, useEffect, useRef } from 'react';
import { reportService } from '../../services/reportService';
import { ReportItem, ScanType } from '../../types';
import { ShieldAlert, ThumbsUp, PlusCircle, CheckCircle2, Globe, Send, UploadCloud, FileText, Image as ImageIcon, Sparkles, X, ChevronRight, ChevronLeft, AlertCircle, RotateCcw, Search } from 'lucide-react';
import { WeeklyReportCard, MonthlyReportCard, ReportTopCategories, ReportFilterSearch } from './components/ReportWidgets';
import { motion, AnimatePresence } from 'motion/react';
import { Select } from '../../components/ui/Select';

export const ReportView: React.FC = () => {
  const [reports, setReports] = useState<ReportItem[]>([]);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [selectedVector, setSelectedVector] = useState('ALL');

  const [confirmedThreatIds, setConfirmedThreatIds] = useState<string[]>([]);
  const [newReportsCount, setNewReportsCount] = useState(0);

  const [step, setStep] = useState(1);
  const totalSteps = 3;

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<ScanType>('sms');
  const [description, setDescription] = useState('');
  const [evidenceUrl, setEvidenceUrl] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [scamAmount, setScamAmount] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submittedSuccess, setSubmittedSuccess] = useState(false);
  const [validationError, setValidationError] = useState('');

  useEffect(() => {
    async function loadReports() {
      const data = await reportService.getReports();
      setReports(Array.isArray(data) ? data : []);
    }
    loadReports();
  }, []);

  const handleUpvote = async (id: string) => {
    if (confirmedThreatIds.includes(id)) return;

    setConfirmedThreatIds((prev) => [...prev, id]);
    setReports((prev) =>
      (Array.isArray(prev) ? prev : []).map((r) =>
        r.id === id ? { ...r, upvotes: r.upvotes + 1 } : r
      )
    );

    try {
      await reportService.upvoteReport(id);
    } catch {
      // Ignore
    }
  };

  const resetForm = () => {
    setStep(1);
    setTitle('');
    setCategory('sms');
    setDescription('');
    setEvidenceUrl('');
    setPhoneNumber('');
    setScamAmount('');
    setLocation('');
    setDate(new Date().toISOString().split('T')[0]);
    setUploadedFiles([]);
    setSubmitError('');
    setValidationError('');
    setSubmittedSuccess(false);
  };

  const handleNextStep = () => {
    if (step === 1) {
      if (!title.trim() || !description.trim()) {
        setValidationError('Please fill in campaign title and detailed description (*)');
        return;
      }
    }
    setValidationError('');
    setStep((prev) => Math.min(prev + 1, totalSteps));
  };

  const handlePrevStep = () => {
    setValidationError('');
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setUploadedFiles((prev) => [...prev, ...Array.from(e.dataTransfer.files)]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setUploadedFiles((prev) => [...prev, ...Array.from(e.target.files!)]);
    }
  };

  const handleSubmit = async () => {
    if (!title.trim() || !description.trim()) {
      setValidationError('Please fill in required fields: Campaign Title and Description.');
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');
    
    try {
      await new Promise((resolve) => setTimeout(resolve, 1200));
      
      const newReportData: ReportItem = {
        id: 'rep_' + Date.now(),
        title: title.trim(),
        category,
        description: description.trim(),
        evidenceUrl: evidenceUrl.trim() || phoneNumber.trim() || undefined,
        reportedBy: 'security_analyst_user',
        status: 'PENDING',
        timestamp: new Date().toISOString(),
        upvotes: 1
      };

      setReports((prev) => [newReportData, ...(Array.isArray(prev) ? prev : [])]);
      setNewReportsCount((prev) => prev + 1);
      setConfirmedThreatIds((prev) => [...prev, newReportData.id]);
      setSubmittedSuccess(true);
      
      setTimeout(() => {
        setShowSubmitModal(false);
        resetForm();
      }, 2200);
    } catch {
      setSubmitError('Failed to submit report. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredReports = reports.filter((item) => {
    const q = searchQuery.trim().toLowerCase();
    const matchesSearch =
      !q ||
      item.title.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      (item.evidenceUrl && item.evidenceUrl.toLowerCase().includes(q)) ||
      item.reportedBy.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q);

    const matchesStatus =
      selectedStatus === 'ALL' ||
      item.status.toUpperCase() === selectedStatus.toUpperCase();

    const matchesVector =
      selectedVector === 'ALL' ||
      item.category.toUpperCase() === selectedVector.toUpperCase();

    return matchesSearch && matchesStatus && matchesVector;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-300 pb-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-[#EF4444] border border-red-200 text-xs font-bold mb-2">
            <ShieldAlert size={14} />
            <span>Official Scam Reporting Portal</span>
          </div>
          <h1 className="text-3xl font-bold text-[#111827] tracking-tight">Report Phishing & Fraud Campaigns</h1>
          <p className="text-xs text-[#64748B] mt-1 font-medium">
            Crowdsourced cyber threat verification network • Safeguarding digital financial ecosystem
          </p>
        </div>

        <button
          onClick={() => { resetForm(); setShowSubmitModal(true); }}
          className="bg-[#11875D] hover:bg-[#0e704d] text-white px-6 py-3 rounded-[16px] font-bold text-sm transition-all shadow-2xs flex items-center gap-2 self-start md:self-auto cursor-pointer"
        >
          <PlusCircle size={18} />
          <span>Report New Scam Campaign</span>
        </button>
      </div>

      {/* Analytics Summary Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <WeeklyReportCard reportsCount={newReportsCount} />
        <MonthlyReportCard reportsCount={newReportsCount} />
        <ReportTopCategories reports={reports} />
      </div>

      <div className="border-t border-[#E4E7E5] pt-8" />

      {/* Reports Search & Filter */}
      <ReportFilterSearch
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
        selectedVector={selectedVector}
        setSelectedVector={setSelectedVector}
      />

      {/* Reports List */}
      <div className="grid grid-cols-1 gap-6">
        {filteredReports.length === 0 ? (
          <div className="bg-white rounded-[20px] p-12 text-center border border-[#E4E7E5] space-y-4 shadow-xs">
            <div className="w-12 h-12 rounded-full bg-[#F8FAFC] border border-[#E4E7E5] flex items-center justify-center mx-auto text-[#64748B]">
              <Search size={24} />
            </div>
            <h3 className="text-lg font-bold text-[#111827]">No matching scam reports found</h3>
            <p className="text-xs text-[#64748B] max-w-md mx-auto">
              No entries matched your search query or filter parameters. Adjust your filters or search term.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedStatus('ALL');
                setSelectedVector('ALL');
              }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-[12px] bg-[#DDF2EA] border border-[#11875D]/30 text-[#11875D] text-xs font-bold transition-all cursor-pointer"
            >
              <RotateCcw size={14} />
              <span>Reset Filters</span>
            </button>
          </div>
        ) : (
          filteredReports.map((item) => {
            const isConfirmed = confirmedThreatIds.includes(item.id);
            return (
              <div key={item.id} className="bg-white rounded-[20px] p-6 border border-[#E4E7E5] shadow-xs hover:shadow-md transition-shadow space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-[#DDF2EA] text-[#11875D] text-xs font-bold uppercase">
                      {item.category}
                    </span>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] uppercase font-bold border ${
                        item.status === 'VERIFIED'
                          ? 'bg-emerald-50 text-[#10B981] border-emerald-200'
                          : item.status === 'UNDER INVESTIGATION'
                          ? 'bg-amber-50 text-[#F59E0B] border-amber-200'
                          : 'bg-[#F8FAFC] text-[#64748B] border-[#E4E7E5]'
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>

                  <span className="text-xs text-[#64748B] font-medium">
                    {new Date(item.timestamp).toLocaleDateString()}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-[#111827]">{item.title}</h3>
                  <p className="text-xs text-[#64748B] mt-2 leading-relaxed font-normal">{item.description}</p>
                </div>

                {item.evidenceUrl && (
                  <div className="p-3 rounded-[12px] bg-[#F8FAFC] border border-[#E4E7E5] text-xs font-mono text-[#11875D] flex items-center gap-2 break-all">
                    <Globe size={14} className="flex-shrink-0 text-[#64748B]" />
                    <span>{item.evidenceUrl}</span>
                  </div>
                )}

                <div className="flex justify-between items-center pt-2 border-t border-[#E4E7E5] text-xs">
                  <span className="text-[#64748B]">Reported by: <span className="text-[#111827] font-semibold">{item.reportedBy}</span></span>

                  <button
                    onClick={() => handleUpvote(item.id)}
                    disabled={isConfirmed}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-[12px] text-xs font-bold transition-all border ${
                      isConfirmed
                        ? 'bg-[#DDF2EA] text-[#11875D] border-[#11875D]/30 cursor-default'
                        : 'bg-white hover:bg-[#F8FAFC] text-[#111827] border-[#E4E7E5] cursor-pointer'
                    }`}
                  >
                    <ThumbsUp size={14} className={isConfirmed ? 'text-[#11875D] fill-[#11875D]' : ''} />
                    <span>{isConfirmed ? 'Threat Confirmed ✓' : `Confirm Threat (${item.upvotes})`}</span>
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Government Portal Multi-step Modal Form */}
      <AnimatePresence>
        {showSubmitModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/40 backdrop-blur-xs" 
              onClick={() => !isSubmitting && !submittedSuccess && setShowSubmitModal(false)}
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-[20px] w-full max-w-2xl border border-[#E4E7E5] shadow-2xl overflow-hidden relative flex flex-col max-h-[90vh] z-10"
            >
              {submittedSuccess ? (
                <div className="p-12 flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-20 h-20 rounded-full bg-[#DDF2EA] border border-[#11875D]/30 flex items-center justify-center text-[#11875D] mb-2">
                    <CheckCircle2 size={40} />
                  </div>
                  <h2 className="text-2xl font-bold text-[#111827]">Report Submitted Successfully</h2>
                  <p className="text-sm text-[#64748B] max-w-sm">Your report has been logged into the official cyber threat database.</p>
                </div>
              ) : (
                <>
                  {/* Header & Progress Bar */}
                  <div className="p-6 border-b border-[#E4E7E5] bg-[#F8FAFC] shrink-0">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-xl font-bold text-[#111827]">Report New Scam Campaign</h2>
                      <button onClick={() => setShowSubmitModal(false)} disabled={isSubmitting} className="p-2 rounded-full hover:bg-white text-[#64748B] transition-colors cursor-pointer">
                        <X size={18} />
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between relative">
                      <div className="absolute top-1/2 left-0 w-full h-1 bg-[#E4E7E5] -translate-y-1/2 rounded-full z-0" />
                      <div className="absolute top-1/2 left-0 h-1 bg-[#11875D] -translate-y-1/2 rounded-full z-0 transition-all duration-300" style={{ width: `${((step - 1) / (totalSteps - 1)) * 100}%` }} />
                      
                      {[1, 2, 3].map((s) => (
                        <div key={s} className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${step >= s ? 'bg-[#11875D] text-white shadow-2xs' : 'bg-white text-[#64748B] border border-[#E4E7E5]'}`}>
                          {s}
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between text-xs text-[#64748B] font-bold uppercase mt-2">
                      <span>1. Campaign Details</span>
                      <span>2. Evidence Info</span>
                      <span>3. Review & Submit</span>
                    </div>
                  </div>

                  {/* Form Body */}
                  <div className="p-6 overflow-y-auto custom-scrollbar flex-1 relative bg-white space-y-4">
                    
                    {validationError && (
                      <div className="p-3 rounded-[12px] bg-red-50 border border-red-200 text-[#EF4444] text-xs font-bold flex items-center gap-2">
                        <AlertCircle size={14} /> {validationError}
                      </div>
                    )}

                    {step === 1 && (
                      <div className="space-y-4">
                        <div>
                          <label className="text-xs font-bold text-[#111827] block mb-1">Campaign Title *</label>
                          <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Fake Bank Account Verification SMS" className="w-full bg-[#F8FAFC] border border-[#E4E7E5] rounded-[12px] p-3 text-xs text-[#111827] focus:border-[#11875D] focus:outline-none" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Select
                              label="Scam Vector *"
                              value={category}
                              onChange={(e) => setCategory(e.target.value as ScanType)}
                              options={[
                                { value: 'sms', label: 'SMS' },
                                { value: 'email', label: 'Email' },
                                { value: 'whatsapp', label: 'WhatsApp' },
                                { value: 'url', label: 'URL / Malicious Domain' },
                                { value: 'voice', label: 'Voice Call' }
                              ]}
                            />
                          </div>
                          <div>
                            <label className="text-xs font-bold text-[#111827] block mb-1">Date Encountered</label>
                            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full bg-[#F8FAFC] border border-[#E4E7E5] rounded-[12px] p-3 text-xs text-[#111827] focus:border-[#11875D] focus:outline-none" />
                          </div>
                        </div>

                        <div>
                          <label className="text-xs font-bold text-[#111827] block mb-1">Scam Description / Raw Message *</label>
                          <textarea required rows={4} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Provide full text of the scam message, link, or details..." className="w-full bg-[#F8FAFC] border border-[#E4E7E5] rounded-[12px] p-3 text-xs text-[#111827] focus:border-[#11875D] focus:outline-none resize-none" />
                        </div>
                      </div>
                    )}

                    {step === 2 && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="text-xs font-bold text-[#111827] block mb-1">Suspicious Link / URL</label>
                            <input type="url" value={evidenceUrl} onChange={(e) => setEvidenceUrl(e.target.value)} placeholder="https://spoofed-bank.com" className="w-full bg-[#F8FAFC] border border-[#E4E7E5] rounded-[12px] p-3 text-xs text-[#111827] focus:border-[#11875D] focus:outline-none" />
                          </div>
                          <div>
                            <label className="text-xs font-bold text-[#111827] block mb-1">Sender Phone Number</label>
                            <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} placeholder="+91 9876543210" className="w-full bg-[#F8FAFC] border border-[#E4E7E5] rounded-[12px] p-3 text-xs text-[#111827] focus:border-[#11875D] focus:outline-none" />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="text-xs font-bold text-[#111827] block mb-1">Estimated Loss Amount</label>
                            <input type="text" value={scamAmount} onChange={(e) => setScamAmount(e.target.value)} placeholder="e.g. ₹5,000" className="w-full bg-[#F8FAFC] border border-[#E4E7E5] rounded-[12px] p-3 text-xs text-[#111827] focus:border-[#11875D] focus:outline-none" />
                          </div>
                          <div>
                            <label className="text-xs font-bold text-[#111827] block mb-1">Target Location / City</label>
                            <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="e.g. Ahmedabad, India" className="w-full bg-[#F8FAFC] border border-[#E4E7E5] rounded-[12px] p-3 text-xs text-[#111827] focus:border-[#11875D] focus:outline-none" />
                          </div>
                        </div>

                        <div>
                          <label className="text-xs font-bold text-[#111827] block mb-2">Upload File Proof / Screenshot</label>
                          <div 
                            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                            onDragLeave={() => setIsDragging(false)}
                            onDrop={handleFileDrop}
                            onClick={() => fileInputRef.current?.click()}
                            className={`border-2 border-dashed rounded-[16px] p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-colors ${
                              isDragging ? 'border-[#11875D] bg-[#DDF2EA]' : 'border-[#E4E7E5] bg-[#F8FAFC] hover:border-[#11875D]'
                            }`}
                          >
                            <input type="file" multiple accept="image/*,.pdf" ref={fileInputRef} className="hidden" onChange={handleFileSelect} />
                            <UploadCloud size={28} className="text-[#11875D] mb-1" />
                            <p className="text-xs font-bold text-[#111827]">Drag & drop proof here</p>
                            <p className="text-[11px] text-[#64748B]">PNG, JPG, or PDF up to 10MB</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {step === 3 && (
                      <div className="space-y-4">
                        <div className="p-4 rounded-[16px] bg-[#DDF2EA] border border-[#11875D]/30 space-y-1">
                          <h4 className="text-xs font-bold text-[#11875D] uppercase tracking-wider">Automated Verification Notice</h4>
                          <p className="text-xs text-[#111827]">
                            Your report for <span className="font-bold uppercase">{category}</span> will be published to the cyber threat database for analyst review.
                          </p>
                        </div>

                        <div>
                          <h4 className="text-xs font-bold text-[#111827] mb-2">Submission Preview</h4>
                          <div className="grid grid-cols-2 gap-3 text-xs">
                            <div className="p-3 rounded-[12px] bg-[#F8FAFC] border border-[#E4E7E5]">
                              <span className="text-[#64748B] block text-[10px] mb-1">Title</span>
                              <span className="text-[#111827] font-bold truncate block">{title || 'N/A'}</span>
                            </div>
                            <div className="p-3 rounded-[12px] bg-[#F8FAFC] border border-[#E4E7E5]">
                              <span className="text-[#64748B] block text-[10px] mb-1">Vector</span>
                              <span className="text-[#11875D] font-bold uppercase">{category}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Footer Modal Actions */}
                  <div className="p-4 border-t border-[#E4E7E5] bg-[#F8FAFC] flex justify-between shrink-0">
                    {step > 1 ? (
                      <button onClick={handlePrevStep} disabled={isSubmitting} className="px-5 py-2 rounded-[12px] bg-white border border-[#E4E7E5] text-[#111827] text-xs font-bold flex items-center gap-1 cursor-pointer">
                        <ChevronLeft size={16} /> Back
                      </button>
                    ) : <div />}

                    {step < totalSteps ? (
                      <button onClick={handleNextStep} className="px-5 py-2 rounded-[12px] bg-[#11875D] text-white text-xs font-bold flex items-center gap-1 cursor-pointer shadow-2xs">
                        Next <ChevronRight size={16} />
                      </button>
                    ) : (
                      <button onClick={handleSubmit} disabled={isSubmitting} className="px-6 py-2 rounded-[12px] bg-[#11875D] text-white font-bold text-xs flex items-center gap-2 cursor-pointer shadow-2xs">
                        <Send size={14} /> Submit Report
                      </button>
                    )}
                  </div>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
