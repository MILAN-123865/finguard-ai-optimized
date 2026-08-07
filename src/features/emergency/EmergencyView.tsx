import React, { useState, useEffect } from 'react';
import {
  AlertOctagon,
  Phone,
  ShieldAlert,
  Lock,
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
  Smartphone,
  Activity,
  Info,
  X,
  MapPin,
  Plus,
  Trash2,
  Edit2,
  Mail,
  UserCheck,
  History,
  Clock,
  ExternalLink,
  RotateCcw,
  ShieldCheck,
  Send
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { emergencyService, EmergencyContact, SOSEventRecord } from '../../services/emergencyService';
import { useAuth } from '../../hooks/useAuth';

export const EmergencyView: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useAuth();

  // Active Tab: 'response' | 'contacts' | 'history'
  const [activeTab, setActiveTab] = useState<'response' | 'contacts' | 'history'>('response');

  const [isLoading, setIsLoading] = useState(true);
  const [contacts, setContacts] = useState<EmergencyContact[]>([]);
  const [history, setHistory] = useState<SOSEventRecord[]>([]);
  const [activeSOSEvent, setActiveSOSEvent] = useState<SOSEventRecord | null>(null);

  // Modals & UI States
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showCountdownModal, setShowCountdownModal] = useState(false);
  const [countdownSeconds, setCountdownSeconds] = useState(5);
  const [countdownTimer, setCountdownTimer] = useState<NodeJS.Timeout | null>(null);

  const [showContactModal, setShowContactModal] = useState(false);
  const [editingContact, setEditingContact] = useState<EmergencyContact | null>(null);

  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [toastMessage, setToastMessage] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null);

  // Form inputs
  const [customMessage, setCustomMessage] = useState('Suspected security breach or financial compromise. Please respond immediately.');
  const [contactForm, setContactForm] = useState({ name: '', relation: 'Family / Relative', email: '', phone: '' });
  const [contactFormError, setContactFormError] = useState('');

  // GPS State
  const [gpsLocation, setGpsLocation] = useState<{ latitude: number; longitude: number; accuracy?: number } | null>(null);
  const [gpsStatus, setGpsStatus] = useState<'locating' | 'locked' | 'denied'>('locating');

  // Safety Checklist
  const [checklist, setChecklist] = useState([
    { id: 1, text: "Stop all communication with the suspected scammer immediately.", completed: false },
    { id: 2, text: "Do not click any further links or download any files.", completed: false },
    { id: 3, text: "Note down phone numbers, websites, or emails used by the scammer.", completed: false },
    { id: 4, text: "Change passwords for critical accounts (email, banking).", completed: false }
  ]);

  const showToast = (type: 'success' | 'error' | 'info', text: string) => {
    setToastMessage({ type, text });
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Load Contacts, History, and Geolocation on Mount
  useEffect(() => {
    const loadInitialData = async () => {
      setIsLoading(true);
      try {
        const userId = user?.id || 'usr_109283';
        const fetchedContacts = await emergencyService.getContacts(userId);
        setContacts(fetchedContacts);

        const fetchedHistory = await emergencyService.getHistory(userId);
        setHistory(fetchedHistory);

        const active = fetchedHistory.find(e => e.status === 'ACTIVE');
        if (active) setActiveSOSEvent(active);
      } catch (err) {
        console.error('Error loading emergency data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadInitialData();
    requestGpsLocation();
  }, [user]);

  // GPS Location Handler
  const requestGpsLocation = () => {
    setGpsStatus('locating');
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setGpsLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy
          });
          setGpsStatus('locked');
        },
        (error) => {
          console.warn('Geolocation access denied or unavailable:', error);
          setGpsStatus('denied');
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    } else {
      setGpsStatus('denied');
    }
  };

  const toggleChecklist = (id: number) => {
    setChecklist(prev => prev.map(item => item.id === id ? { ...item, completed: !item.completed } : item));
  };

  // Open Contact Form
  const handleOpenAddContact = () => {
    if (contacts.length >= 5) {
      showToast('error', 'Maximum limit of 5 emergency contacts reached.');
      return;
    }
    setEditingContact(null);
    setContactForm({ name: '', relation: 'Family / Relative', email: '', phone: '' });
    setContactFormError('');
    setShowContactModal(true);
  };

  const handleOpenEditContact = (contact: EmergencyContact) => {
    setEditingContact(contact);
    setContactForm({
      name: contact.name,
      relation: contact.relation,
      email: contact.email,
      phone: contact.phone
    });
    setContactFormError('');
    setShowContactModal(true);
  };

  // Save Contact Form Submit
  const handleSaveContact = async (e: React.FormEvent) => {
    e.preventDefault();
    setContactFormError('');

    if (!contactForm.name.trim() || !contactForm.email.trim() || !contactForm.phone.trim()) {
      setContactFormError('Name, email, and phone number are required.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(contactForm.email)) {
      setContactFormError('Please enter a valid email address.');
      return;
    }

    try {
      const userId = user?.id || 'usr_109283';
      if (editingContact) {
        const updated = await emergencyService.updateContact(editingContact.id, contactForm, userId);
        setContacts(prev => prev.map(c => c.id === updated.id ? updated : c));
        showToast('success', `Emergency contact "${updated.name}" updated successfully.`);
      } else {
        const created = await emergencyService.addContact(contactForm, userId);
        setContacts(prev => [created, ...prev]);
        showToast('success', `Emergency contact "${created.name}" added successfully.`);
      }
      setShowContactModal(false);
    } catch (err: any) {
      setContactFormError(err.message || 'Failed to save contact.');
    }
  };

  // Delete Contact
  const handleDeleteContact = async (id: string, name: string) => {
    if (!window.confirm(`Are you sure you want to remove "${name}" from your emergency contacts?`)) return;
    try {
      const userId = user?.id || 'usr_109283';
      await emergencyService.deleteContact(id, userId);
      setContacts(prev => prev.filter(c => c.id !== id));
      showToast('info', `Contact "${name}" removed.`);
    } catch (err: any) {
      showToast('error', err.message || 'Failed to delete contact.');
    }
  };

  // SOS Initial Step: User clicks main red SOS button
  const handleSOSButtonClick = () => {
    setShowConfirmModal(true);
  };

  // User confirms SOS in modal -> Start 5-second countdown
  const handleProceedToCountdown = () => {
    setShowConfirmModal(false);
    setCountdownSeconds(5);
    setShowCountdownModal(true);

    const timer = setInterval(() => {
      setCountdownSeconds(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          executeSOSTrigger();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    setCountdownTimer(timer);
  };

  // User clicks "Cancel SOS" during 5-second countdown
  const handleCancelCountdown = () => {
    if (countdownTimer) clearInterval(countdownTimer);
    setCountdownTimer(null);
    setShowCountdownModal(false);
    showToast('info', 'SOS Emergency Protocol cancelled.');
  };

  // Execute SOS Trigger after countdown completes
  const executeSOSTrigger = async () => {
    setShowCountdownModal(false);
    try {
      const userId = user?.id || 'usr_109283';
      const userName = user?.name || 'Security User';
      const userEmail = user?.email || 'milanrathod5201@gmail.com';

      const sosEvent = await emergencyService.triggerSOS(
        {
          customMessage,
          gpsLocation
        },
        userId,
        userName,
        userEmail
      );

      setActiveSOSEvent(sosEvent);
      setHistory(prev => [sosEvent, ...prev.filter(h => h._id !== sosEvent._id)]);
      setShowSuccessDialog(true);
      showToast('success', `Emergency Alert dispatched to ${contacts.length} contacts!`);
    } catch (err: any) {
      showToast('error', err.message || 'Failed to trigger SOS Emergency broadcast.');
    }
  };

  // "I'm Safe" Resolution Action
  const handleMarkSafe = async (eventId?: string) => {
    try {
      const userId = user?.id || 'usr_109283';
      const userName = user?.name || 'Security User';

      const resolved = await emergencyService.resolveSOS(eventId || activeSOSEvent?._id, userId, userName);

      setActiveSOSEvent(null);
      setHistory(prev => prev.map(e => e._id === resolved._id ? resolved : e));
      showToast('success', "SOS state cleared! Emergency contacts notified that you are safe.");
    } catch (err: any) {
      showToast('error', err.message || "Failed to resolve emergency state.");
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-16 h-16 rounded-full border-4 border-red-500/20 border-t-red-500 animate-spin mb-4" />
        <h3 className="text-xl font-bold text-white">{t('common.loading', 'Initializing Emergency Protocols...')}</h3>
        <p className="text-[#bac9cc] text-sm mt-2">{t('emergency.instructions', 'Loading secure communication channels and contacts.')}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-12">

      {/* Floating Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className={`fixed top-6 right-6 z-[200] max-w-md px-5 py-3.5 rounded-2xl shadow-2xl border backdrop-blur-xl flex items-center gap-3 text-sm font-semibold text-white ${
              toastMessage.type === 'success'
                ? 'bg-emerald-950/90 border-emerald-500/50 shadow-emerald-900/40'
                : toastMessage.type === 'error'
                ? 'bg-red-950/90 border-red-500/50 shadow-red-900/40'
                : 'bg-cyan-950/90 border-cyan-500/50 shadow-cyan-900/40'
            }`}
          >
            {toastMessage.type === 'success' && <CheckCircle2 className="text-emerald-400 shrink-0" size={20} />}
            {toastMessage.type === 'error' && <AlertTriangle className="text-red-400 shrink-0" size={20} />}
            {toastMessage.type === 'info' && <Info className="text-cyan-400 shrink-0" size={20} />}
            <span className="flex-1">{toastMessage.text}</span>
            <button onClick={() => setToastMessage(null)} className="text-white/60 hover:text-white">
              <X size={16} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Active Emergency Live Banner */}
      <AnimatePresence>
        {activeSOSEvent && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-red-950/90 via-red-900/80 to-[#0f1321] border-2 border-red-500 shadow-[0_0_40px_rgba(239,68,68,0.3)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-full bg-red-500/10 blur-2xl pointer-events-none animate-pulse" />
            <div className="flex items-start gap-4 z-10">
              <div className="w-12 h-12 rounded-2xl bg-red-500 text-white flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(239,68,68,0.6)] animate-pulse">
                <ShieldAlert size={26} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-red-500/30 text-red-300 font-mono text-[11px] font-bold tracking-wider uppercase border border-red-400/40">
                    ACTIVE SOS BROADCAST
                  </span>
                  <span className="text-xs text-[#bac9cc] font-mono">
                    {new Date(activeSOSEvent.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mt-1">Emergency Protocol Currently Active</h3>
                <p className="text-xs text-[#bac9cc] mt-0.5">
                  Emergency contacts notified: <strong className="text-white">{activeSOSEvent.contactsNotified.length}</strong> | Location broadcasted to Google Maps
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto justify-end z-10">
              {activeSOSEvent.googleMapsUrl && (
                <a
                  href={activeSOSEvent.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center gap-1.5 transition-colors border border-white/10"
                >
                  <MapPin size={14} className="text-red-400" />
                  <span>View Map</span>
                  <ExternalLink size={12} />
                </a>
              )}

              <button
                onClick={() => handleMarkSafe(activeSOSEvent._id)}
                className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(16,185,129,0.4)] cursor-pointer"
              >
                <ShieldCheck size={18} />
                <span>I'm Safe (Resolve)</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Header & Tab Navigation */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono mb-2 animate-pulse">
            <AlertOctagon size={14} />
            <span>{t('emergency.commandCenter', 'Emergency Command Center')}</span>
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">{t('emergency.rapidResponse', 'Rapid Response Protocol')}</h1>
          <p className="text-xs font-mono text-[#bac9cc] mt-1">
            {t('emergency.subtitle', 'Immediate actions, emergency broadcasts, and contact alerts to protect your identity & financial assets.')}
          </p>
        </div>

        {/* Tab Selector Buttons */}
        <div className="flex items-center gap-2 bg-[#0c1020] p-1.5 rounded-2xl border border-white/10">
          <button
            onClick={() => setActiveTab('response')}
            className={`px-4 py-2 rounded-xl text-xs font-bold font-mono transition-all flex items-center gap-2 ${
              activeTab === 'response'
                ? 'bg-red-500 text-white shadow-[0_0_15px_rgba(239,68,68,0.4)]'
                : 'text-[#bac9cc] hover:text-white hover:bg-white/5'
            }`}
          >
            <AlertTriangle size={15} />
            <span>SOS Command</span>
          </button>

          <button
            onClick={() => setActiveTab('contacts')}
            className={`px-4 py-2 rounded-xl text-xs font-bold font-mono transition-all flex items-center gap-2 ${
              activeTab === 'contacts'
                ? 'bg-[#00daf3] text-slate-950 shadow-[0_0_15px_rgba(0,218,243,0.4)]'
                : 'text-[#bac9cc] hover:text-white hover:bg-white/5'
            }`}
          >
            <Phone size={15} />
            <span>Emergency Contacts ({contacts.length}/5)</span>
          </button>

          <button
            onClick={() => setActiveTab('history')}
            className={`px-4 py-2 rounded-xl text-xs font-bold font-mono transition-all flex items-center gap-2 ${
              activeTab === 'history'
                ? 'bg-purple-600 text-white shadow-[0_0_15px_rgba(147,51,234,0.4)]'
                : 'text-[#bac9cc] hover:text-white hover:bg-white/5'
            }`}
          >
            <History size={15} />
            <span>SOS History ({history.length})</span>
          </button>
        </div>
      </div>

      {/* TAB 1: SOS RESPONSE COMMAND */}
      {activeTab === 'response' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in duration-300">
          
          {/* Left Column (Primary Actions) */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Main SOS Button Card */}
            <div className="glass-card rounded-3xl p-8 border-2 border-red-500/30 relative overflow-hidden bg-gradient-to-br from-[#0f1321] to-red-950/20 text-center flex flex-col items-center justify-center min-h-[320px]">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-red-500/10 rounded-full blur-3xl pointer-events-none animate-pulse" />
              
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSOSButtonClick}
                className="relative z-10 w-44 h-44 rounded-full bg-gradient-to-br from-red-500 via-red-600 to-red-800 text-white shadow-[0_0_60px_rgba(239,68,68,0.6)] border-4 border-red-400/60 flex flex-col items-center justify-center gap-2 mb-6 group cursor-pointer"
              >
                <AlertTriangle size={52} className="group-hover:scale-110 transition-transform text-white drop-shadow-md" />
                <span className="font-black text-2xl uppercase tracking-widest drop-shadow-md">SOS</span>
              </motion.button>

              <h2 className="text-2xl font-bold text-white relative z-10">{t('emergency.sosTitle', "I Think I'm Being Scammed")}</h2>
              <p className="text-[#bac9cc] max-w-md mt-2 relative z-10 text-sm">
                {t('emergency.sosDesc', 'Press this button immediately if you have shared sensitive information, sent money, or granted remote access. Broadcasts GPS telemetry & emails emergency contacts.')}
              </p>

              {/* GPS Telemetry Indicator */}
              <div className="mt-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#bac9cc]">
                <MapPin size={14} className={gpsStatus === 'locked' ? 'text-emerald-400' : 'text-amber-400 animate-spin'} />
                <span>
                  {gpsStatus === 'locked' && gpsLocation
                    ? `GPS Locked: ${gpsLocation.latitude.toFixed(4)}, ${gpsLocation.longitude.toFixed(4)}`
                    : gpsStatus === 'locating'
                    ? 'Acquiring GPS Telemetry...'
                    : 'GPS Unavailable (Fallback Location Used)'}
                </span>
                {gpsStatus !== 'locked' && (
                  <button onClick={requestGpsLocation} className="text-[#00daf3] hover:underline ml-1">Retry GPS</button>
                )}
              </div>
            </div>

            {/* Action Cards */}
            <div>
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <ShieldAlert className="text-[#00daf3]" /> Immediate Defensive Actions
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button 
                  onClick={() => showToast('info', 'Contacting Cyber Crime Helpline at 1930 or your bank desk.')}
                  className="glass-card p-5 rounded-2xl border border-white/10 hover:border-amber-400/50 hover:bg-amber-400/5 transition-all text-left flex items-start gap-4 group cursor-pointer"
                >
                  <div className="p-3 rounded-xl bg-amber-400/10 text-amber-400 group-hover:scale-110 transition-transform">
                    <Lock size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-white">Freeze Bank Account</h4>
                    <p className="text-xs text-[#bac9cc] mt-1">Instantly contact your bank to halt all outgoing debit transactions.</p>
                  </div>
                </button>
                
                <button 
                  onClick={() => showToast('info', 'Disabling active UPI handles on phone app.')}
                  className="glass-card p-5 rounded-2xl border border-white/10 hover:border-blue-400/50 hover:bg-blue-400/5 transition-all text-left flex items-start gap-4 group cursor-pointer"
                >
                  <div className="p-3 rounded-xl bg-blue-400/10 text-blue-400 group-hover:scale-110 transition-transform">
                    <Smartphone size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-white">Block UPI ID</h4>
                    <p className="text-xs text-[#bac9cc] mt-1">Disable your UPI ID to prevent unauthorized digital payment attempts.</p>
                  </div>
                </button>

                <button 
                  onClick={() => window.open('https://cybercrime.gov.in', '_blank')}
                  className="glass-card p-5 rounded-2xl border border-white/10 hover:border-purple-400/50 hover:bg-purple-400/5 transition-all text-left flex items-start gap-4 group cursor-pointer"
                >
                  <div className="p-3 rounded-xl bg-purple-400/10 text-purple-400 group-hover:scale-110 transition-transform">
                    <ShieldAlert size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-white">Report Cyber Crime</h4>
                    <p className="text-xs text-[#bac9cc] mt-1">File an official complaint with the national cyber crime portal (1930).</p>
                  </div>
                </button>

                <button 
                  onClick={() => showToast('info', 'Turn off Wi-Fi and Mobile Data immediately.')}
                  className="glass-card p-5 rounded-2xl border border-white/10 hover:border-green-400/50 hover:bg-green-400/5 transition-all text-left flex items-start gap-4 group cursor-pointer"
                >
                  <div className="p-3 rounded-xl bg-green-400/10 text-green-400 group-hover:scale-110 transition-transform">
                    <Smartphone size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-white">Secure Device</h4>
                    <p className="text-xs text-[#bac9cc] mt-1">Disconnect device from Wi-Fi/data to block remote control tools.</p>
                  </div>
                </button>
              </div>
            </div>

          </div>

          {/* Right Column (Emergency Contacts & Checklist Sidebar) */}
          <div className="space-y-6">
            
            {/* Quick Emergency Contacts Card */}
            <div className="glass-card p-6 rounded-3xl border border-red-500/20 bg-red-950/10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-red-400 flex items-center gap-2">
                  <Phone size={18} /> Emergency Contacts ({contacts.length}/5)
                </h3>
                <button
                  onClick={() => setActiveTab('contacts')}
                  className="text-xs font-mono text-[#00daf3] hover:underline flex items-center gap-1"
                >
                  <span>Manage</span>
                  <ChevronRight size={14} />
                </button>
              </div>

              {contacts.length === 0 ? (
                <div className="p-4 rounded-2xl border border-dashed border-red-500/30 text-center">
                  <p className="text-xs text-[#bac9cc] mb-3">No custom emergency contacts added yet.</p>
                  <button
                    onClick={handleOpenAddContact}
                    className="px-3.5 py-1.5 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/40 font-bold text-xs inline-flex items-center gap-1.5"
                  >
                    <Plus size={14} /> Add Contact Now
                  </button>
                </div>
              ) : (
                <div className="space-y-2.5">
                  {contacts.map(c => (
                    <div key={c.id} className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between gap-2">
                      <div className="overflow-hidden">
                        <h4 className="font-bold text-white text-sm truncate">{c.name}</h4>
                        <p className="text-[11px] text-[#bac9cc] truncate">{c.relation} • {c.email}</p>
                      </div>
                      <a
                        href={`tel:${c.phone}`}
                        className="px-3 py-1 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-300 font-mono text-xs font-bold border border-red-500/40 shrink-0"
                      >
                        Call
                      </a>
                    </div>
                  ))}
                </div>
              )}

              {/* National Helpline Shortcuts */}
              <div className="mt-4 pt-4 border-t border-white/10 space-y-2">
                <div className="flex justify-between items-center p-2.5 rounded-xl bg-white/5 border border-white/10">
                  <div>
                    <h4 className="font-bold text-white text-xs">National Cyber Crime</h4>
                    <p className="text-[10px] text-[#bac9cc]">Financial fraud hotline</p>
                  </div>
                  <a href="tel:1930" className="px-3 py-1 rounded-lg bg-red-500 text-white font-bold text-xs hover:bg-red-600 transition-colors">1930</a>
                </div>
                <div className="flex justify-between items-center p-2.5 rounded-xl bg-white/5 border border-white/10">
                  <div>
                    <h4 className="font-bold text-white text-xs">Police Emergency</h4>
                    <p className="text-[10px] text-[#bac9cc]">Physical safety response</p>
                  </div>
                  <a href="tel:112" className="px-3 py-1 rounded-lg bg-white/10 text-white font-bold text-xs hover:bg-white/20 transition-colors">112</a>
                </div>
              </div>
            </div>

            {/* Checklist */}
            <div className="glass-card p-6 rounded-3xl border border-white/10">
              <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-4">
                <CheckCircle2 className="text-[#00daf3]" size={18} /> Immediate Checklist
              </h3>
              <div className="space-y-2.5">
                {checklist.map(item => (
                  <label key={item.id} className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${item.completed ? 'bg-green-500/10 border-green-500/30' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}>
                    <input
                      type="checkbox"
                      checked={item.completed}
                      onChange={() => toggleChecklist(item.id)}
                      className="hidden"
                    />
                    <div className={`mt-0.5 w-5 h-5 rounded border flex items-center justify-center shrink-0 transition-colors ${item.completed ? 'bg-green-500 border-green-500 text-slate-950' : 'border-[#bac9cc]'}`}>
                      {item.completed && <CheckCircle2 size={14} />}
                    </div>
                    <span className={`text-xs leading-relaxed ${item.completed ? 'text-green-400 line-through opacity-70' : 'text-[#bac9cc]'}`}>
                      {item.text}
                    </span>
                  </label>
                ))}
              </div>
            </div>

          </div>

        </div>
      )}

      {/* TAB 2: EMERGENCY CONTACTS MANAGEMENT */}
      {activeTab === 'contacts' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-card p-6 rounded-3xl border border-white/10">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Phone className="text-[#00daf3]" size={22} /> Managed Emergency Contacts
              </h2>
              <p className="text-xs text-[#bac9cc] mt-1">
                Configure up to 5 trusted emergency contacts. During an SOS event, instant emails containing your GPS coordinates, IP, device telemetry, and Google Maps link will be dispatched to them.
              </p>
            </div>

            <button
              onClick={handleOpenAddContact}
              disabled={contacts.length >= 5}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer shrink-0 ${
                contacts.length >= 5
                  ? 'bg-white/10 text-white/40 cursor-not-allowed'
                  : 'bg-[#00daf3] hover:bg-[#00daf3]/90 text-slate-950 shadow-[0_0_20px_rgba(0,218,243,0.3)]'
              }`}
            >
              <Plus size={16} />
              <span>Add Contact ({contacts.length}/5)</span>
            </button>
          </div>

          {/* Contacts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {contacts.map((contact, idx) => (
              <motion.div
                key={contact.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="glass-card p-6 rounded-3xl border border-white/10 relative overflow-hidden flex flex-col justify-between group hover:border-[#00daf3]/40 transition-all"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div>
                      <span className="px-2.5 py-0.5 rounded-full bg-[#00daf3]/10 border border-[#00daf3]/30 text-[#00daf3] font-mono text-[10px] font-bold">
                        {contact.relation}
                      </span>
                      <h3 className="text-lg font-bold text-white mt-2">{contact.name}</h3>
                    </div>
                    
                    <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleOpenEditContact(contact)}
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/80 hover:text-white transition-colors"
                        title="Edit Contact"
                      >
                        <Edit2 size={14} />
                      </button>
                      <button
                        onClick={() => handleDeleteContact(contact.id, contact.name)}
                        className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors"
                        title="Delete Contact"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2 mt-4 text-xs font-mono text-[#bac9cc]">
                    <div className="flex items-center gap-2">
                      <Mail size={14} className="text-[#00daf3] shrink-0" />
                      <span className="truncate">{contact.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone size={14} className="text-emerald-400 shrink-0" />
                      <span>{contact.phone}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] text-[#bac9cc]">
                  <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                    <UserCheck size={12} /> Email Alerts Active
                  </span>
                  <a
                    href={`mailto:${contact.email}`}
                    className="text-[#00daf3] hover:underline flex items-center gap-1 font-mono"
                  >
                    <span>Test Mail</span>
                  </a>
                </div>
              </motion.div>
            ))}

            {/* Empty slots placeholders */}
            {Array.from({ length: Math.max(0, 5 - contacts.length) }).map((_, idx) => (
              <div
                key={`empty_${idx}`}
                onClick={handleOpenAddContact}
                className="border-2 border-dashed border-white/10 hover:border-[#00daf3]/40 rounded-3xl p-6 flex flex-col items-center justify-center text-center cursor-pointer min-h-[200px] transition-all bg-white/[0.02] hover:bg-white/[0.04]"
              >
                <div className="w-12 h-12 rounded-full bg-white/5 text-white/40 flex items-center justify-center mb-3">
                  <Plus size={22} />
                </div>
                <h4 className="font-bold text-white/60 text-sm">Add Emergency Contact Slot</h4>
                <p className="text-xs text-[#bac9cc]/60 mt-1">Slot {contacts.length + idx + 1} of 5 available</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: SOS EMERGENCY HISTORY */}
      {activeTab === 'history' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="glass-card p-6 rounded-3xl border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <History className="text-purple-400" size={22} /> SOS Emergency Event Log
              </h2>
              <p className="text-xs text-[#bac9cc] mt-1">
                Every emergency broadcast triggered on this device is permanently logged here with timestamp, status, GPS coordinates, and contact email delivery states.
              </p>
            </div>
            
            <button
              onClick={async () => {
                const fetched = await emergencyService.getHistory(user?.id);
                setHistory(fetched);
                showToast('info', 'Emergency history refreshed.');
              }}
              className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white font-mono text-xs font-bold border border-white/10 flex items-center gap-2 cursor-pointer shrink-0"
            >
              <RotateCcw size={14} /> Refresh Log
            </button>
          </div>

          {history.length === 0 ? (
            <div className="glass-card p-12 rounded-3xl border border-white/10 text-center flex flex-col items-center justify-center">
              <ShieldCheck size={48} className="text-emerald-400 mb-3 opacity-60" />
              <h3 className="text-lg font-bold text-white">No Emergency Events Logged</h3>
              <p className="text-xs text-[#bac9cc] mt-1 max-w-sm">
                No SOS alerts have been triggered on this account. Your system remains secure.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {history.map(event => (
                <div
                  key={event._id}
                  className="glass-card p-6 rounded-3xl border border-white/10 hover:border-white/20 transition-all space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
                    <div className="flex items-center gap-3">
                      <span className={`px-3 py-1 rounded-full font-mono text-xs font-bold ${
                        event.status === 'ACTIVE'
                          ? 'bg-red-500/20 text-red-400 border border-red-500/50 animate-pulse'
                          : event.status === 'RESOLVED'
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50'
                          : 'bg-slate-500/20 text-slate-400 border border-slate-500/50'
                      }`}>
                        {event.status}
                      </span>
                      <div>
                        <h4 className="font-bold text-white text-base">
                          SOS Broadcast #{event._id.slice(-6)}
                        </h4>
                        <p className="text-xs text-[#bac9cc] font-mono flex items-center gap-1 mt-0.5">
                          <Clock size={12} />
                          {new Date(event.timestamp).toLocaleString()}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {event.status === 'ACTIVE' && (
                        <button
                          onClick={() => handleMarkSafe(event._id)}
                          className="px-4 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs uppercase flex items-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <ShieldCheck size={14} />
                          <span>I'm Safe</span>
                        </button>
                      )}

                      {event.googleMapsUrl && (
                        <a
                          href={event.googleMapsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-[#00daf3] font-mono text-xs font-bold border border-[#00daf3]/30 flex items-center gap-1.5 transition-colors"
                        >
                          <MapPin size={14} />
                          <span>View Map Location</span>
                          <ExternalLink size={12} />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
                    <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                      <p className="text-[#bac9cc] font-bold uppercase tracking-wider text-[10px] mb-1">Emergency Message Note</p>
                      <p className="text-white font-sans italic">"{event.message || 'No custom note provided.'}"</p>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                      <p className="text-[#bac9cc] font-bold uppercase tracking-wider text-[10px] mb-1">Device Telemetry</p>
                      <p className="text-white truncate">IP: <span className="text-[#00daf3]">{event.ipAddress}</span></p>
                      <p className="text-[#bac9cc] truncate">Agent: {event.deviceInfo}</p>
                    </div>
                  </div>

                  {/* Contacts Notified Status */}
                  <div className="pt-2">
                    <p className="text-xs font-bold text-[#bac9cc] mb-2 font-mono uppercase tracking-wider">
                      Contacts Alerted Status ({event.contactsNotified.length}):
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                      {event.contactsNotified.map((cn, i) => (
                        <div key={i} className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between text-xs">
                          <div>
                            <p className="font-bold text-white">{cn.name}</p>
                            <p className="text-[10px] text-[#bac9cc] font-mono">{cn.email}</p>
                          </div>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                            cn.status === 'SENT' || cn.status === 'RETRIED_SENT'
                              ? 'bg-emerald-500/20 text-emerald-400'
                              : 'bg-red-500/20 text-red-400'
                          }`}>
                            {cn.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* MODAL 1: SOS CONFIRMATION MODAL */}
      <AnimatePresence>
        {showConfirmModal && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
              onClick={() => setShowConfirmModal(false)}
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-[#0f1321] border border-red-500/50 p-6 sm:p-8 rounded-3xl shadow-2xl relative z-10 max-w-lg w-full overflow-hidden text-white"
            >
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-red-500 via-red-600 to-red-800" />
              
              <div className="w-16 h-16 rounded-full bg-red-500/20 text-red-500 flex items-center justify-center mx-auto mb-4 border border-red-500/50 shadow-[0_0_20px_rgba(239,68,68,0.4)]">
                <AlertTriangle size={36} />
              </div>
              
              <h2 className="text-2xl font-black text-white text-center mb-2">Initiate SOS Emergency Broadcast?</h2>
              <p className="text-[#bac9cc] text-center text-xs sm:text-sm mb-6">
                This will trigger an urgent security broadcast. High-priority emails containing your GPS coordinates, Google Maps link, and telemetry will be dispatched to your emergency contacts.
              </p>

              {/* Emergency Message Input */}
              <div className="mb-5">
                <label className="block text-xs font-mono font-bold text-[#bac9cc] uppercase mb-1.5">
                  Emergency Custom Note
                </label>
                <textarea
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  rows={2}
                  className="w-full bg-black/40 border border-white/10 focus:border-red-500 rounded-xl p-3 text-xs text-white resize-none outline-none font-sans"
                  placeholder="e.g. Suspected unauthorized money transfer / device compromise..."
                />
              </div>

              {/* Target Contacts Preview */}
              <div className="mb-6 p-3.5 rounded-2xl bg-white/5 border border-white/10">
                <p className="text-[11px] font-mono font-bold text-[#bac9cc] uppercase mb-2">
                  Emergency Contacts to be Notified ({contacts.length}):
                </p>
                {contacts.length === 0 ? (
                  <p className="text-xs text-amber-400">Warning: No emergency contacts configured! Add contacts in the Contacts tab.</p>
                ) : (
                  <div className="space-y-1">
                    {contacts.map(c => (
                      <div key={c.id} className="text-xs text-white font-mono flex items-center justify-between">
                        <span>• {c.name} ({c.relation})</span>
                        <span className="text-[#00daf3]">{c.email}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={() => setShowConfirmModal(false)}
                  className="py-3 rounded-xl border border-white/10 text-white font-bold text-xs hover:bg-white/5 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleProceedToCountdown}
                  className="py-3 rounded-xl bg-red-500 hover:bg-red-600 text-white font-black text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(239,68,68,0.5)] cursor-pointer"
                >
                  Confirm & Alert Contacts
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL 2: 5-SECOND COUNTDOWN CANCELLATION MODAL */}
      <AnimatePresence>
        {showCountdownModal && (
          <div className="fixed inset-0 z-[180] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-red-950/90 backdrop-blur-xl"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
              className="bg-[#0b0d18] border-2 border-red-500 p-8 rounded-3xl shadow-[0_0_60px_rgba(239,68,68,0.6)] relative z-10 max-w-md w-full text-center text-white overflow-hidden"
            >
              <div className="absolute inset-0 bg-red-500/10 pointer-events-none animate-pulse" />

              <span className="px-3 py-1 rounded-full bg-red-500/20 text-red-400 font-mono text-xs font-bold border border-red-500/40 uppercase tracking-widest">
                DISPATCHING EMERGENCY ALERT
              </span>

              {/* Big Animated Countdown Number */}
              <div className="my-6">
                <motion.div
                  key={countdownSeconds}
                  initial={{ scale: 1.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="text-7xl font-black text-red-500 font-mono drop-shadow-[0_0_30px_rgba(239,68,68,0.8)]"
                >
                  00:0{countdownSeconds}
                </motion.div>
                <p className="text-xs font-mono text-[#bac9cc] mt-2">
                  Sending alert emails & GPS coordinates to {contacts.length} contact(s)...
                </p>
              </div>

              <div className="space-y-3">
                <button
                  onClick={handleCancelCountdown}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-red-600 to-red-800 hover:from-red-500 hover:to-red-700 text-white font-black text-sm uppercase tracking-widest shadow-[0_0_30px_rgba(239,68,68,0.6)] border border-red-400/50 transition-all cursor-pointer transform active:scale-95"
                >
                  🛑 CANCEL SOS EMERGENCY (5s)
                </button>
                <p className="text-[11px] text-[#bac9cc]">
                  Click above to abort the emergency alert before emails are sent.
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL 3: ADD/EDIT EMERGENCY CONTACT MODAL */}
      <AnimatePresence>
        {showContactModal && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setShowContactModal(false)}
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-[#0f1321] border border-[#00daf3]/40 p-6 sm:p-8 rounded-3xl shadow-2xl relative z-10 max-w-md w-full text-white"
            >
              <button 
                onClick={() => setShowContactModal(false)}
                className="absolute top-5 right-5 text-[#bac9cc] hover:text-white transition-colors"
              >
                <X size={20} />
              </button>

              <h2 className="text-xl font-bold text-white mb-1 flex items-center gap-2">
                <Phone className="text-[#00daf3]" size={20} />
                {editingContact ? 'Edit Emergency Contact' : 'Add Emergency Contact'}
              </h2>
              <p className="text-xs text-[#bac9cc] mb-6">
                Max 5 emergency contacts permitted. Ensure email is accurate for instant SOS alerts.
              </p>

              {contactFormError && (
                <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/40 text-red-400 text-xs flex items-center gap-2">
                  <AlertTriangle size={16} />
                  <span>{contactFormError}</span>
                </div>
              )}

              <form onSubmit={handleSaveContact} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono font-bold text-[#bac9cc] uppercase mb-1">
                    Contact Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    placeholder="e.g. Sarah Connor"
                    className="w-full bg-black/40 border border-white/10 focus:border-[#00daf3] rounded-xl px-3.5 py-2.5 text-xs text-white outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-[#bac9cc] uppercase mb-1">
                    Relationship
                  </label>
                  <select
                    value={contactForm.relation}
                    onChange={(e) => setContactForm({ ...contactForm, relation: e.target.value })}
                    className="w-full bg-[#0a0d1a] border border-white/10 focus:border-[#00daf3] rounded-xl px-3.5 py-2.5 text-xs text-white outline-none"
                  >
                    <option value="Spouse / Partner">Spouse / Partner</option>
                    <option value="Parent / Family">Parent / Family</option>
                    <option value="Brother / Sister">Brother / Sister</option>
                    <option value="Trusted Friend">Trusted Friend</option>
                    <option value="Legal Counsel">Legal Counsel</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-[#bac9cc] uppercase mb-1">
                    Email Address (For Instant Alerts) *
                  </label>
                  <input
                    type="email"
                    required
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    placeholder="e.g. sarah.c@example.com"
                    className="w-full bg-black/40 border border-white/10 focus:border-[#00daf3] rounded-xl px-3.5 py-2.5 text-xs text-white outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-[#bac9cc] uppercase mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={contactForm.phone}
                    onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                    placeholder="e.g. +1 (555) 019-2834"
                    className="w-full bg-black/40 border border-white/10 focus:border-[#00daf3] rounded-xl px-3.5 py-2.5 text-xs text-white outline-none font-mono"
                  />
                </div>

                <div className="pt-4 grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setShowContactModal(false)}
                    className="py-2.5 rounded-xl border border-white/10 text-white font-bold text-xs hover:bg-white/5 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="py-2.5 rounded-xl bg-[#00daf3] hover:bg-[#00daf3]/90 text-slate-950 font-black text-xs uppercase tracking-wider transition-all shadow-[0_0_15px_rgba(0,218,243,0.3)] cursor-pointer"
                  >
                    Save Contact
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL 4: SUCCESS CONFIRMATION DIALOG */}
      <AnimatePresence>
        {showSuccessDialog && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setShowSuccessDialog(false)}
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-[#0f1321] border border-emerald-500/50 p-6 sm:p-8 rounded-3xl shadow-2xl relative z-10 max-w-md w-full text-center text-white overflow-hidden"
            >
              <button onClick={() => setShowSuccessDialog(false)} className="absolute top-4 right-4 text-[#bac9cc] hover:text-white transition-colors">
                <X size={20} />
              </button>

              <div className="w-20 h-20 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-4 border border-emerald-500/50 shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                <CheckCircle2 size={44} />
              </div>
              
              <h2 className="text-2xl font-black text-white mb-2">SOS Broadcast Dispatched</h2>
              <p className="text-[#bac9cc] text-xs sm:text-sm mb-6">
                Your emergency telemetry, GPS location, and alert message have been saved in the database and emailed to your emergency contacts.
              </p>
              
              <div className="space-y-2">
                <button 
                  onClick={() => setShowSuccessDialog(false)}
                  className="w-full py-3 rounded-xl bg-emerald-500 text-slate-950 font-black text-xs uppercase tracking-wider hover:bg-emerald-400 transition-colors shadow-[0_0_15px_rgba(16,185,129,0.3)] cursor-pointer"
                >
                  Proceed to Immediate Checklist
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
