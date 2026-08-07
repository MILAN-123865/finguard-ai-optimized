import React, { useState, useEffect, useMemo } from 'react';
import { 
  X, Laptop, Smartphone, Monitor, ShieldCheck, ShieldAlert, 
  Search, Filter, Download, Trash2, LogOut, Edit3, Copy, Check, 
  ExternalLink, Info, Activity, Globe, MapPin, Key, RefreshCw, AlertTriangle, ChevronRight, FileSpreadsheet, FileText, FileCode 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { AuthorizedDevice, LoginHistoryEntry } from '../types/device';
import { INITIAL_DEVICES, INITIAL_LOGIN_HISTORY } from '../data/mockDevices';
import { DeviceDetailsModal } from './DeviceDetailsModal';
import { ToastContainer, ToastProps } from '../../../components/ui/Toast';

interface DeviceManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
  devices?: AuthorizedDevice[];
  onUpdateDevices?: (updated: AuthorizedDevice[]) => void;
}

export const DeviceManagementModal: React.FC<DeviceManagementModalProps> = ({
  isOpen,
  onClose,
  devices: initialDevicesProp,
  onUpdateDevices,
}) => {
  const [devicesList, setDevicesList] = useState<AuthorizedDevice[]>(
    initialDevicesProp && initialDevicesProp.length > 0 ? initialDevicesProp : INITIAL_DEVICES
  );
  const [loginHistory, setLoginHistory] = useState<LoginHistoryEntry[]>(INITIAL_LOGIN_HISTORY);
  
  // Active Tab
  const [activeTab, setActiveTab] = useState<'devices' | 'history'>('devices');

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<
    'all' | 'current' | 'trusted' | 'inactive' | 'high-risk' | 'desktop' | 'mobile'
  >('all');

  // Modal inspection states
  const [selectedDeviceDetails, setSelectedDeviceDetails] = useState<AuthorizedDevice | null>(null);

  // Confirmation Modals State
  const [signOutConfirmDevice, setSignOutConfirmDevice] = useState<AuthorizedDevice | null>(null);
  const [removeConfirmDevice, setRemoveConfirmDevice] = useState<AuthorizedDevice | null>(null);

  // Rename Inline State
  const [editingDeviceId, setEditingDeviceId] = useState<string | null>(null);
  const [editingNameValue, setEditingNameValue] = useState('');

  // Toast System
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  const addToast = (type: 'success' | 'error' | 'info' | 'warning', title: string, message: string) => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [
      ...prev,
      {
        id,
        type,
        title,
        message,
        onClose: (removeId) => setToasts((p) => p.filter((t) => t.id !== removeId)),
      },
    ]);
  };

  // Synchronize internal devices with parent when prop changes or state mutates
  useEffect(() => {
    if (initialDevicesProp && initialDevicesProp.length > 0) {
      setDevicesList(initialDevicesProp);
    }
  }, [initialDevicesProp]);

  const updateDevicesState = (newDevices: AuthorizedDevice[]) => {
    setDevicesList(newDevices);
    if (onUpdateDevices) {
      onUpdateDevices(newDevices);
    }
  };

  // Keybindings (ESC to close modal)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (selectedDeviceDetails) {
          setSelectedDeviceDetails(null);
        } else if (signOutConfirmDevice) {
          setSignOutConfirmDevice(null);
        } else if (removeConfirmDevice) {
          setRemoveConfirmDevice(null);
        } else {
          onClose();
        }
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedDeviceDetails, signOutConfirmDevice, removeConfirmDevice, onClose]);

  // Calculated Analytics Summary
  const analytics = useMemo(() => {
    const total = devicesList.length;
    const currentSessions = devicesList.filter((d) => d.isCurrentSession || d.status === 'current' || d.status === 'active').length;
    const trusted = devicesList.filter((d) => d.isTrusted).length;
    const avgRisk = total > 0 ? Math.round(devicesList.reduce((acc, d) => acc + d.riskScore, 0) / total) : 0;
    const suspicious = devicesList.filter((d) => d.riskScore > 20 || !d.isTrusted).length;

    return { total, currentSessions, trusted, avgRisk, suspicious };
  }, [devicesList]);

  // Filtered Devices
  const filteredDevices = useMemo(() => {
    return devicesList.filter((device) => {
      // Search query match
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = 
        !q ||
        device.name.toLowerCase().includes(q) ||
        device.os.toLowerCase().includes(q) ||
        device.browser.toLowerCase().includes(q) ||
        device.location.city.toLowerCase().includes(q) ||
        device.location.country.toLowerCase().includes(q) ||
        device.ipAddress.includes(q);

      // Filter category match
      let matchesFilter = true;
      if (selectedFilter === 'current') matchesFilter = device.isCurrentSession || device.status === 'current';
      else if (selectedFilter === 'trusted') matchesFilter = device.isTrusted;
      else if (selectedFilter === 'inactive') matchesFilter = device.status === 'inactive';
      else if (selectedFilter === 'high-risk') matchesFilter = device.riskScore > 10;
      else if (selectedFilter === 'desktop') matchesFilter = device.type === 'desktop';
      else if (selectedFilter === 'mobile') matchesFilter = device.type === 'mobile';

      return matchesSearch && matchesFilter;
    });
  }, [devicesList, searchQuery, selectedFilter]);

  // Filtered History
  const filteredHistory = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return loginHistory;
    return loginHistory.filter((item) => 
      item.deviceName.toLowerCase().includes(q) ||
      item.city.toLowerCase().includes(q) ||
      item.country.toLowerCase().includes(q) ||
      item.ip.includes(q) ||
      item.browser.toLowerCase().includes(q) ||
      item.os.toLowerCase().includes(q)
    );
  }, [loginHistory, searchQuery]);

  // Device Action Handlers
  const handleCopyId = (id: string) => {
    navigator.clipboard.writeText(id);
    addToast('success', 'Device ID Copied', `Copied ${id} to clipboard.`);
  };

  const handleStartRename = (device: AuthorizedDevice) => {
    setEditingDeviceId(device.id);
    setEditingNameValue(device.name);
  };

  const handleSaveRename = (id: string) => {
    if (!editingNameValue.trim()) return;
    const updated = devicesList.map((d) => (d.id === id ? { ...d, name: editingNameValue.trim() } : d));
    updateDevicesState(updated);
    setEditingDeviceId(null);
    addToast('success', 'Device Renamed', `Updated device label to "${editingNameValue.trim()}".`);
  };

  const handleToggleTrust = (id: string) => {
    const target = devicesList.find((d) => d.id === id);
    if (!target) return;
    const newTrustedState = !target.isTrusted;

    const updated = devicesList.map((d) => (d.id === id ? { ...d, isTrusted: newTrustedState } : d));
    updateDevicesState(updated);

    if (newTrustedState) {
      addToast('success', 'Device Trusted', `${target.name} has been added to trusted credentials.`);
    } else {
      addToast('warning', 'Device Untrusted', `${target.name} flagged as unverified.`);
    }

    if (selectedDeviceDetails && selectedDeviceDetails.id === id) {
      setSelectedDeviceDetails({ ...selectedDeviceDetails, isTrusted: newTrustedState });
    }
  };

  const handleConfirmSignOut = () => {
    if (!signOutConfirmDevice) return;
    const target = signOutConfirmDevice;

    const updated = devicesList.map((d) => {
      if (d.id === target.id) {
        return {
          ...d,
          status: 'inactive' as const,
          isCurrentSession: false,
        };
      }
      return d;
    });

    updateDevicesState(updated);
    setSignOutConfirmDevice(null);
    if (selectedDeviceDetails?.id === target.id) {
      setSelectedDeviceDetails(null);
    }

    // Append to audit log
    const newLog: LoginHistoryEntry = {
      id: `log_${Date.now()}`,
      date: 'Today',
      time: new Date().toLocaleTimeString(),
      city: target.location.city,
      country: target.location.country,
      ip: target.ipAddress,
      browser: target.browser,
      os: target.os,
      status: 'Warning',
      deviceName: `${target.name} (Session Revoked)`,
    };
    setLoginHistory((prev) => [newLog, ...prev]);

    addToast(
      target.isCurrentSession ? 'warning' : 'info',
      'Session Terminated',
      `Session for ${target.name} was successfully revoked.`
    );
  };

  const handleConfirmRemove = () => {
    if (!removeConfirmDevice) return;
    const target = removeConfirmDevice;

    const updated = devicesList.filter((d) => d.id !== target.id);
    updateDevicesState(updated);
    setRemoveConfirmDevice(null);

    addToast('success', 'Device Removed', `${target.name} removed from authorized devices list.`);
  };

  // Export handlers (CSV, JSON, PDF simulated text download)
  const handleExport = (format: 'csv' | 'json' | 'pdf') => {
    const filename = `finguard_authorized_devices_${Date.now()}.${format}`;
    let content = '';
    let mimeType = 'text/plain';

    if (format === 'json') {
      content = JSON.stringify(devicesList, null, 2);
      mimeType = 'application/json';
    } else if (format === 'csv') {
      const headers = ['ID', 'Name', 'OS', 'Browser', 'IP', 'City', 'Country', 'Status', 'Trusted', 'RiskScore'];
      const rows = devicesList.map((d) => [
        d.id,
        `"${d.name}"`,
        `"${d.os}"`,
        `"${d.browser}"`,
        d.ipAddress,
        d.location.city,
        d.location.country,
        d.status,
        d.isTrusted,
        `${d.riskScore}%`,
      ]);
      content = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
      mimeType = 'text/csv';
    } else {
      content = `FINGUARD AI SECURITY REPORT - AUTHORIZED DEVICES AUDIT\nGenerated: ${new Date().toISOString()}\nTotal Devices: ${devicesList.length}\n\n` +
        devicesList.map((d) => `- ${d.name} (${d.os}) | IP: ${d.ipAddress} | Loc: ${d.location.city}, ${d.location.country} | Risk: ${d.riskScore}%`).join('\n');
      mimeType = 'application/pdf';
    }

    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    addToast('success', `Exported ${format.toUpperCase()}`, `Saved device analytics report to ${filename}.`);
  };

  if (!isOpen) return null;

  const getPlatformIcon = (platform: AuthorizedDevice['platform'], type: AuthorizedDevice['type']) => {
    if (type === 'mobile') return <Smartphone size={18} className="text-[#00daf3]" />;
    return <Laptop size={18} className="text-[#00daf3]" />;
  };

  const getRiskBadge = (score: number) => {
    if (score <= 10) return <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono font-bold">Risk: {score}%</span>;
    if (score <= 25) return <span className="px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/30 text-[10px] font-mono font-bold">Risk: {score}%</span>;
    if (score <= 50) return <span className="px-2 py-0.5 rounded-full bg-orange-500/15 text-orange-400 border border-orange-500/30 text-[10px] font-mono font-bold">Risk: {score}%</span>;
    return <span className="px-2 py-0.5 rounded-full bg-red-500/15 text-red-400 border border-red-500/30 text-[10px] font-mono font-bold">Risk: {score}%</span>;
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9990] flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-hidden">
        
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-xl"
        />

        {/* Center Dialog / Slide-Over Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative w-full max-w-5xl h-[92vh] max-h-[900px] bg-[#0b0f19] border border-[#00daf3]/40 rounded-3xl shadow-[0_25px_70px_rgba(0,0,0,0.95),0_0_50px_rgba(0,218,243,0.18)] overflow-hidden flex flex-col text-white z-10 font-sans"
        >
          {/* Subtle Cyber Glow & Grid background */}
          <div className="absolute inset-0 bg-[radial-gradient(#00daf3_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.05] pointer-events-none" />
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#00daf3]/10 rounded-full blur-3xl pointer-events-none" />

          {/* Modal Header */}
          <div className="relative z-10 flex items-center justify-between px-6 py-5 border-b border-white/10 bg-[#060a14]/80 backdrop-blur-md">
            <div className="flex items-center gap-3.5">
              <div className="p-3 bg-[#00daf3]/10 border border-[#00daf3]/30 rounded-2xl text-[#00daf3] shadow-[0_0_20px_rgba(0,218,243,0.25)]">
                <Laptop size={22} className="animate-pulse" />
              </div>
              <div>
                <h2 className="text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
                  Device Management Center
                </h2>
                <p className="text-xs font-mono text-[#bac9cc] mt-0.5">
                  Enterprise Device Trust & Session Revocation Gateway
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-400 hover:text-white transition-all cursor-pointer"
              title="Close (ESC)"
            >
              <X size={20} />
            </button>
          </div>

          {/* Top Security Analytics Overview */}
          <div className="relative z-10 px-6 py-4 bg-[#070b16]/70 border-b border-white/10 grid grid-cols-2 sm:grid-cols-5 gap-3">
            <div className="bg-white/5 border border-white/5 p-3 rounded-2xl">
              <span className="text-[10px] font-mono uppercase tracking-wider text-gray-400 block">Authorized Devices</span>
              <span className="text-xl font-extrabold font-mono text-white mt-1 block">{analytics.total}</span>
            </div>

            <div className="bg-white/5 border border-white/5 p-3 rounded-2xl">
              <span className="text-[10px] font-mono uppercase tracking-wider text-gray-400 block">Current Sessions</span>
              <span className="text-xl font-extrabold font-mono text-[#00daf3] mt-1 block">{analytics.currentSessions}</span>
            </div>

            <div className="bg-white/5 border border-white/5 p-3 rounded-2xl">
              <span className="text-[10px] font-mono uppercase tracking-wider text-gray-400 block">Trusted Devices</span>
              <span className="text-xl font-extrabold font-mono text-emerald-400 mt-1 block">{analytics.trusted}</span>
            </div>

            <div className="bg-white/5 border border-white/5 p-3 rounded-2xl">
              <span className="text-[10px] font-mono uppercase tracking-wider text-gray-400 block">Average Risk</span>
              <span className="text-xl font-extrabold font-mono text-amber-400 mt-1 block">{analytics.avgRisk}%</span>
            </div>

            <div className="bg-white/5 border border-white/5 p-3 rounded-2xl col-span-2 sm:col-span-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-gray-400 block">Suspicious Devices</span>
              <span className="text-xl font-extrabold font-mono text-purple-400 mt-1 block">{analytics.suspicious}</span>
            </div>
          </div>

          {/* Controls Bar: Search, Filters & Export */}
          <div className="relative z-10 px-6 py-3.5 bg-[#060913]/90 border-b border-white/10 flex flex-wrap items-center justify-between gap-3">
            
            {/* Tabs & Search */}
            <div className="flex flex-wrap items-center gap-3 flex-1">
              
              {/* Tab Selector */}
              <div className="flex items-center bg-[#0d1222] p-1 rounded-2xl border border-white/10">
                <button
                  onClick={() => setActiveTab('devices')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold font-mono transition-all ${
                    activeTab === 'devices'
                      ? 'bg-[#00daf3] text-slate-950 shadow-[0_0_12px_rgba(0,218,243,0.4)]'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Devices ({devicesList.length})
                </button>
                <button
                  onClick={() => setActiveTab('history')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold font-mono transition-all ${
                    activeTab === 'history'
                      ? 'bg-[#00daf3] text-slate-950 shadow-[0_0_12px_rgba(0,218,243,0.4)]'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Recent Login History
                </button>
              </div>

              {/* Search Bar */}
              <div className="relative flex-1 min-w-[200px] max-w-xs">
                <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search device, IP, OS, location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 bg-[#0d1222] border border-white/10 focus:border-[#00daf3] rounded-2xl text-xs text-white placeholder-gray-500 font-mono focus:outline-none"
                />
              </div>

            </div>

            {/* Filter Pill Options & Export Button */}
            <div className="flex flex-wrap items-center gap-2">
              {activeTab === 'devices' && (
                <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-1">
                  <span className="text-[11px] text-gray-400 font-mono flex items-center gap-1">
                    <Filter size={12} /> Filter:
                  </span>
                  {(['all', 'current', 'trusted', 'inactive', 'high-risk', 'desktop', 'mobile'] as const).map((filterKey) => (
                    <button
                      key={filterKey}
                      onClick={() => setSelectedFilter(filterKey)}
                      className={`px-2.5 py-1 rounded-xl text-[11px] font-mono font-bold capitalize transition-all border ${
                        selectedFilter === filterKey
                          ? 'bg-[#00daf3]/20 border-[#00daf3] text-[#00daf3]'
                          : 'bg-white/5 border-white/5 text-gray-400 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      {filterKey.replace('-', ' ')}
                    </button>
                  ))}
                </div>
              )}

              {/* Export Button */}
              <div className="relative group">
                <button className="px-3 py-1.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono font-bold text-[#00daf3] flex items-center gap-1.5 transition-colors">
                  <Download size={14} />
                  <span>Export</span>
                </button>

                {/* Dropdown Options */}
                <div className="absolute right-0 top-full mt-1 w-36 bg-[#0d1222] border border-white/10 rounded-2xl p-1 shadow-2xl opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all z-30">
                  <button
                    onClick={() => handleExport('csv')}
                    className="w-full px-3 py-1.5 rounded-xl text-left text-xs font-mono text-gray-300 hover:text-white hover:bg-white/10 flex items-center gap-2"
                  >
                    <FileSpreadsheet size={13} className="text-emerald-400" /> Export CSV
                  </button>
                  <button
                    onClick={() => handleExport('json')}
                    className="w-full px-3 py-1.5 rounded-xl text-left text-xs font-mono text-gray-300 hover:text-white hover:bg-white/10 flex items-center gap-2"
                  >
                    <FileCode size={13} className="text-[#00daf3]" /> Export JSON
                  </button>
                  <button
                    onClick={() => handleExport('pdf')}
                    className="w-full px-3 py-1.5 rounded-xl text-left text-xs font-mono text-gray-300 hover:text-white hover:bg-white/10 flex items-center gap-2"
                  >
                    <FileText size={13} className="text-purple-400" /> Export Audit PDF
                  </button>
                </div>
              </div>

            </div>

          </div>

          {/* Main Scrollable Content */}
          <div className="relative z-10 flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-cyan-500/20">
            
            {/* TAB 1: Devices Grid */}
            {activeTab === 'devices' && (
              <div className="space-y-4">
                {filteredDevices.length === 0 ? (
                  <div className="text-center py-16 bg-white/5 border border-white/5 rounded-3xl">
                    <Laptop size={40} className="mx-auto text-gray-600 mb-3" />
                    <h4 className="text-base font-bold text-white">No Authorized Devices Found</h4>
                    <p className="text-xs text-gray-400 font-mono mt-1">Try resetting your search query or filter tags.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredDevices.map((device) => {
                      const isCurrent = device.isCurrentSession || device.status === 'current';
                      const isEditing = editingDeviceId === device.id;

                      return (
                        <motion.div
                          key={device.id}
                          layout
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          className={`relative rounded-3xl p-5 border transition-all duration-300 flex flex-col justify-between ${
                            isCurrent
                              ? 'bg-[#0e1628]/90 border-[#00daf3] shadow-[0_0_25px_rgba(0,218,243,0.25)] ring-1 ring-[#00daf3]/50'
                              : device.status === 'inactive'
                              ? 'bg-[#070b14]/60 border-white/5 opacity-75 hover:opacity-100 hover:border-white/20'
                              : 'bg-[#090e1b]/80 border-white/10 hover:border-[#00daf3]/40'
                          }`}
                        >
                          {/* Top Card Row */}
                          <div>
                            <div className="flex items-start justify-between gap-3 mb-3">
                              <div className="flex items-center gap-3">
                                <div className={`p-3 rounded-2xl border ${
                                  isCurrent 
                                    ? 'bg-[#00daf3]/15 border-[#00daf3]/40 text-[#00daf3] shadow-[0_0_12px_rgba(0,218,243,0.3)]' 
                                    : 'bg-white/5 border-white/10 text-gray-400'
                                }`}>
                                  {getPlatformIcon(device.platform, device.type)}
                                </div>
                                <div>
                                  {isEditing ? (
                                    <div className="flex items-center gap-1.5">
                                      <input
                                        type="text"
                                        value={editingNameValue}
                                        onChange={(e) => setEditingNameValue(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && handleSaveRename(device.id)}
                                        className="bg-[#111827] border border-[#00daf3] rounded-lg px-2 py-0.5 text-xs text-white font-bold focus:outline-none"
                                        autoFocus
                                      />
                                      <button
                                        onClick={() => handleSaveRename(device.id)}
                                        className="p-1 bg-[#00daf3] text-slate-950 rounded-lg text-[10px] font-bold"
                                      >
                                        Save
                                      </button>
                                    </div>
                                  ) : (
                                    <div className="flex items-center gap-2">
                                      <h3 className="text-sm font-bold text-white tracking-tight">
                                        {device.name}
                                      </h3>
                                      <button
                                        onClick={() => handleStartRename(device)}
                                        className="text-gray-500 hover:text-[#00daf3] transition-colors"
                                        title="Rename device"
                                      >
                                        <Edit3 size={13} />
                                      </button>
                                    </div>
                                  )}
                                  <p className="text-xs font-mono text-[#bac9cc] mt-0.5">
                                    {device.os} • {device.browser}
                                  </p>
                                </div>
                              </div>

                              {/* Risk Badge */}
                              {getRiskBadge(device.riskScore)}
                            </div>

                            {/* Session Badges Row */}
                            <div className="flex flex-wrap items-center gap-2 mb-4">
                              {isCurrent && (
                                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[10px] font-mono font-bold uppercase flex items-center gap-1">
                                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                                  Current Session
                                </span>
                              )}
                              {device.isTrusted ? (
                                <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 text-[10px] font-mono font-bold flex items-center gap-1">
                                  <ShieldCheck size={11} className="text-[#00daf3]" />
                                  Trusted
                                </span>
                              ) : (
                                <span className="px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30 text-[10px] font-mono font-bold flex items-center gap-1">
                                  <AlertTriangle size={11} className="text-amber-400" />
                                  Untrusted
                                </span>
                              )}
                              <span className="text-[10px] font-mono text-gray-400">
                                Last Active: {device.lastActive}
                              </span>
                            </div>

                            {/* Technical Specs List */}
                            <div className="bg-[#050811]/60 border border-white/5 rounded-2xl p-3 space-y-1.5 text-xs font-mono mb-4">
                              <div className="flex justify-between items-center text-[#bac9cc]">
                                <span className="text-gray-500">Public IP:</span>
                                <span className="text-white font-bold">{device.ipAddress}</span>
                              </div>
                              <div className="flex justify-between items-center text-[#bac9cc]">
                                <span className="text-gray-500">Location:</span>
                                <span>{device.location.city}, {device.location.country}</span>
                              </div>
                              <div className="flex justify-between items-center text-[#bac9cc]">
                                <span className="text-gray-500">Model:</span>
                                <span className="truncate max-w-[180px] text-gray-300">{device.model}</span>
                              </div>
                            </div>
                          </div>

                          {/* Action Toolbar */}
                          <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-2">
                            <div className="flex items-center gap-1.5">
                              <button
                                onClick={() => setSelectedDeviceDetails(device)}
                                className="px-2.5 py-1.5 rounded-xl bg-white/5 hover:bg-[#00daf3]/15 text-[#00daf3] border border-[#00daf3]/30 text-xs font-mono font-bold flex items-center gap-1 transition-all"
                              >
                                View Details
                              </button>
                              <button
                                onClick={() => handleToggleTrust(device.id)}
                                className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors"
                                title={device.isTrusted ? 'Mark as Untrusted' : 'Mark as Trusted'}
                              >
                                <ShieldCheck size={14} className={device.isTrusted ? 'text-emerald-400' : 'text-gray-400'} />
                              </button>
                              <button
                                onClick={() => handleCopyId(device.id)}
                                className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors"
                                title="Copy Device ID"
                              >
                                <Copy size={14} />
                              </button>
                            </div>

                            <div className="flex items-center gap-1.5">
                              <button
                                onClick={() => setSignOutConfirmDevice(device)}
                                className="px-2.5 py-1.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 text-xs font-mono font-bold flex items-center gap-1 transition-colors"
                              >
                                <LogOut size={13} />
                                <span>{isCurrent ? 'Sign Out' : 'Revoke'}</span>
                              </button>
                              {!isCurrent && (
                                <button
                                  onClick={() => setRemoveConfirmDevice(device)}
                                  className="p-1.5 rounded-xl bg-white/5 hover:bg-red-500/20 text-gray-400 hover:text-red-400 transition-colors"
                                  title="Remove device"
                                >
                                  <Trash2 size={14} />
                                </button>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: Login History Table */}
            {activeTab === 'history' && (
              <div className="bg-[#090e1b]/80 border border-white/10 rounded-3xl overflow-hidden">
                <div className="p-4 border-b border-white/10 flex items-center justify-between">
                  <h3 className="text-sm font-bold font-mono text-white flex items-center gap-2">
                    <Activity size={16} className="text-[#00daf3]" />
                    <span>Recent Security Authentication Audit Trail</span>
                  </h3>
                  <span className="text-xs font-mono text-gray-400">{filteredHistory.length} events logged</span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-mono">
                    <thead className="bg-[#050811] text-gray-400 uppercase text-[10px] border-b border-white/10">
                      <tr>
                        <th className="py-3 px-4">Date & Time</th>
                        <th className="py-3 px-4">Device Identity</th>
                        <th className="py-3 px-4">Location</th>
                        <th className="py-3 px-4">Public IP</th>
                        <th className="py-3 px-4">Browser / OS</th>
                        <th className="py-3 px-4 text-right">Auth Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-gray-300">
                      {filteredHistory.map((log) => (
                        <tr key={log.id} className="hover:bg-white/5 transition-colors">
                          <td className="py-3.5 px-4 font-bold text-white">
                            <div>{log.date}</div>
                            <div className="text-[10px] text-gray-500">{log.time}</div>
                          </td>
                          <td className="py-3.5 px-4 font-bold text-[#00daf3]">
                            {log.deviceName}
                          </td>
                          <td className="py-3.5 px-4">
                            {log.city}, {log.country}
                          </td>
                          <td className="py-3.5 px-4 text-gray-400">
                            {log.ip}
                          </td>
                          <td className="py-3.5 px-4 text-gray-400">
                            {log.browser} • {log.os}
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            {log.status === 'Success' && (
                              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold">
                                Success
                              </span>
                            )}
                            {log.status === 'Warning' && (
                              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 text-[10px] font-bold">
                                Warning
                              </span>
                            )}
                            {log.status === 'Blocked' && (
                              <span className="px-2.5 py-0.5 rounded-full bg-red-500/20 text-red-400 border border-red-500/30 text-[10px] font-bold animate-pulse">
                                Blocked
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

          </div>

          {/* Footer Bar */}
          <div className="relative z-10 px-6 py-4 bg-[#060a14]/90 border-t border-white/10 flex items-center justify-between text-xs font-mono text-gray-400">
            <span className="flex items-center gap-1.5">
              <ShieldCheck size={14} className="text-[#00daf3]" />
              End-to-End Encrypted Session Key Protocol
            </span>
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-2xl bg-[#00daf3] hover:bg-[#00e5ff] text-slate-950 font-bold font-mono transition-all shadow-[0_0_15px_rgba(0,218,243,0.3)]"
            >
              Done
            </button>
          </div>

        </motion.div>

        {/* Nested Modal 1: Device Details Inspect */}
        <DeviceDetailsModal
          device={selectedDeviceDetails}
          isOpen={!!selectedDeviceDetails}
          onClose={() => setSelectedDeviceDetails(null)}
          onRename={handleSaveRename}
          onToggleTrust={handleToggleTrust}
          onSignOut={(dev) => {
            setSelectedDeviceDetails(null);
            setSignOutConfirmDevice(dev);
          }}
          onCopyId={handleCopyId}
        />

        {/* Nested Modal 2: Sign Out / Revoke Session Confirmation */}
        <AnimatePresence>
          {signOutConfirmDevice && (
            <div className="fixed inset-0 z-[10005] flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSignOutConfirmDevice(null)}
                className="fixed inset-0 bg-black/80 backdrop-blur-md"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 15 }}
                className="relative z-10 w-full max-w-md bg-[#0b0f19] border border-red-500/40 rounded-3xl p-6 shadow-2xl text-white"
              >
                <div className="p-3 w-12 h-12 rounded-2xl bg-red-500/20 border border-red-500/40 text-red-400 mb-4 flex items-center justify-center">
                  <LogOut size={24} />
                </div>
                <h3 className="text-lg font-bold text-white">
                  {signOutConfirmDevice.isCurrentSession ? 'Sign Out Current Session?' : 'Revoke Device Session?'}
                </h3>
                <p className="text-xs font-mono text-gray-300 mt-2 leading-relaxed">
                  {signOutConfirmDevice.isCurrentSession
                    ? 'Warning: You are about to sign out of your active browser session on this device. You will need to re-authenticate with 2FA.'
                    : `Are you sure you want to terminate the active session token for "${signOutConfirmDevice.name}"? This device will be logged out immediately.`}
                </p>

                <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-white/10">
                  <button
                    onClick={() => setSignOutConfirmDevice(null)}
                    className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-mono text-white"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConfirmSignOut}
                    className="px-4 py-2 rounded-xl bg-red-500 hover:bg-red-600 text-white font-bold text-xs font-mono shadow-[0_0_15px_rgba(239,68,68,0.4)]"
                  >
                    Confirm Logout
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Nested Modal 3: Remove Device Confirmation */}
        <AnimatePresence>
          {removeConfirmDevice && (
            <div className="fixed inset-0 z-[10005] flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setRemoveConfirmDevice(null)}
                className="fixed inset-0 bg-black/80 backdrop-blur-md"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 15 }}
                className="relative z-10 w-full max-w-md bg-[#0b0f19] border border-red-500/40 rounded-3xl p-6 shadow-2xl text-white"
              >
                <div className="p-3 w-12 h-12 rounded-2xl bg-red-500/20 border border-red-500/40 text-red-400 mb-4 flex items-center justify-center">
                  <Trash2 size={24} />
                </div>
                <h3 className="text-lg font-bold text-white">
                  Remove Device Credentials?
                </h3>
                <p className="text-xs font-mono text-gray-300 mt-2 leading-relaxed">
                  Are you sure you want to remove <strong className="text-white">{removeConfirmDevice.name}</strong> from your account's authorized device list?
                </p>

                <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-white/10">
                  <button
                    onClick={() => setRemoveConfirmDevice(null)}
                    className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-mono text-white"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConfirmRemove}
                    className="px-4 py-2 rounded-xl bg-red-500 hover:bg-red-600 text-white font-bold text-xs font-mono shadow-[0_0_15px_rgba(239,68,68,0.4)]"
                  >
                    Remove Device
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Toast Container */}
        <ToastContainer toasts={toasts} />
      </div>
    </AnimatePresence>
  );
};
