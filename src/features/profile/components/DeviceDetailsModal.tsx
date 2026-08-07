import React, { useState } from 'react';
import { 
  X, Laptop, Smartphone, Monitor, ShieldCheck, ShieldAlert, 
  MapPin, Clock, Copy, Check, LogOut, Edit3, Key, Cpu, Wifi, Globe, AlertTriangle 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { AuthorizedDevice } from '../types/device';

interface DeviceDetailsModalProps {
  device: AuthorizedDevice | null;
  isOpen: boolean;
  onClose: () => void;
  onRename: (id: string, newName: string) => void;
  onToggleTrust: (id: string) => void;
  onSignOut: (device: AuthorizedDevice) => void;
  onCopyId: (id: string) => void;
}

export const DeviceDetailsModal: React.FC<DeviceDetailsModalProps> = ({
  device,
  isOpen,
  onClose,
  onRename,
  onToggleTrust,
  onSignOut,
  onCopyId,
}) => {
  const [isEditingName, setIsEditingName] = useState(false);
  const [editName, setEditName] = useState('');
  const [copiedToken, setCopiedToken] = useState(false);

  if (!isOpen || !device) return null;

  const handleStartRename = () => {
    setEditName(device.name);
    setIsEditingName(true);
  };

  const handleSaveRename = () => {
    if (editName.trim()) {
      onRename(device.id, editName.trim());
      setIsEditingName(false);
    }
  };

  const handleCopyToken = () => {
    navigator.clipboard.writeText(device.sessionTokenId);
    setCopiedToken(true);
    setTimeout(() => setCopiedToken(false), 2000);
  };

  const getDeviceIcon = () => {
    if (device.type === 'mobile') return <Smartphone size={24} className="text-[#00daf3]" />;
    if (device.type === 'tablet') return <Smartphone size={24} className="text-[#00daf3]" />;
    return <Laptop size={24} className="text-[#00daf3]" />;
  };

  const getRiskColor = (score: number) => {
    if (score <= 10) return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
    if (score <= 25) return 'text-amber-400 bg-amber-500/10 border-amber-500/30';
    if (score <= 50) return 'text-orange-400 bg-orange-500/10 border-orange-500/30';
    return 'text-red-400 bg-red-500/10 border-red-500/30';
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-2xl bg-[#0b0f19] border border-[#00daf3]/40 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.9),0_0_40px_rgba(0,218,243,0.15)] overflow-hidden text-white my-auto z-10"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10 bg-[#060a14]/60">
            <div className="flex items-center gap-3.5">
              <div className="p-3 bg-[#00daf3]/10 border border-[#00daf3]/30 rounded-2xl shadow-[0_0_15px_rgba(0,218,243,0.2)]">
                {getDeviceIcon()}
              </div>
              <div>
                {isEditingName ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSaveRename()}
                      className="bg-[#111827] border border-[#00daf3] rounded-xl px-3 py-1 text-sm font-bold text-white focus:outline-none"
                      autoFocus
                    />
                    <button
                      onClick={handleSaveRename}
                      className="px-3 py-1 bg-[#00daf3] text-slate-950 text-xs font-bold rounded-xl"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setIsEditingName(false)}
                      className="px-2 py-1 bg-white/10 text-xs rounded-xl"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-white">{device.name}</h3>
                    <button
                      onClick={handleStartRename}
                      className="p-1 text-[#bac9cc] hover:text-[#00daf3] transition-colors"
                      title="Rename device"
                    >
                      <Edit3 size={14} />
                    </button>
                  </div>
                )}
                <p className="text-xs text-[#bac9cc] font-mono mt-0.5">
                  {device.os} • {device.browser}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto scrollbar-thin scrollbar-thumb-cyan-500/20">
            
            {/* Status Badges Row */}
            <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-white/5 border border-white/10 rounded-2xl">
              <div className="flex flex-wrap items-center gap-2">
                {device.isCurrentSession && (
                  <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-xs font-bold font-mono uppercase flex items-center gap-1.5 shadow-[0_0_10px_rgba(52,211,153,0.3)]">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    Current Session
                  </span>
                )}
                {device.isTrusted ? (
                  <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs font-bold font-mono flex items-center gap-1.5">
                    <ShieldCheck size={14} className="text-[#00daf3]" />
                    Trusted Device
                  </span>
                ) : (
                  <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-bold font-mono flex items-center gap-1.5">
                    <AlertTriangle size={14} className="text-amber-400" />
                    Untrusted Device
                  </span>
                )}
                {device.mfaEnabled && (
                  <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40 text-xs font-bold font-mono flex items-center gap-1.5">
                    <Key size={14} />
                    MFA Enabled
                  </span>
                )}
              </div>

              <div className={`px-3 py-1 rounded-xl border text-xs font-mono font-extrabold flex items-center gap-1.5 ${getRiskColor(device.riskScore)}`}>
                <span>Risk Score: {device.riskScore}%</span>
              </div>
            </div>

            {/* Grid 1: Device Hardware & System Details */}
            <div>
              <h4 className="text-xs font-bold font-mono text-[#00daf3] uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <Cpu size={14} /> System & Hardware Telemetry
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-3 rounded-2xl bg-[#060a14]/60 border border-white/5">
                  <span className="text-gray-400 text-[10px] block">Device ID</span>
                  <div className="flex items-center justify-between mt-1">
                    <span className="font-bold text-white truncate">{device.id}</span>
                    <button
                      onClick={() => onCopyId(device.id)}
                      className="text-[#00daf3] hover:text-white transition-colors"
                      title="Copy Device ID"
                    >
                      <Copy size={13} />
                    </button>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-[#060a14]/60 border border-white/5">
                  <span className="text-gray-400 text-[10px] block">Hardware Model</span>
                  <span className="font-bold text-white mt-1 block truncate">{device.model}</span>
                </div>

                <div className="p-3 rounded-2xl bg-[#060a14]/60 border border-white/5">
                  <span className="text-gray-400 text-[10px] block">Screen Resolution</span>
                  <span className="font-bold text-white mt-1 block">{device.screenResolution}</span>
                </div>

                <div className="p-3 rounded-2xl bg-[#060a14]/60 border border-white/5">
                  <span className="text-gray-400 text-[10px] block">Timezone & Locale</span>
                  <span className="font-bold text-white mt-1 block truncate">{device.timezone}</span>
                </div>
              </div>
            </div>

            {/* Grid 2: Network & Geolocation Telemetry */}
            <div>
              <h4 className="text-xs font-bold font-mono text-[#00daf3] uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <MapPin size={14} /> Geolocation & Network
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-3 rounded-2xl bg-[#060a14]/60 border border-white/5">
                  <span className="text-gray-400 text-[10px] block">Public IP Address</span>
                  <span className="font-bold text-[#00daf3] mt-1 block">{device.ipAddress}</span>
                </div>

                <div className="p-3 rounded-2xl bg-[#060a14]/60 border border-white/5">
                  <span className="text-gray-400 text-[10px] block">Approximate Location</span>
                  <span className="font-bold text-white mt-1 block truncate">
                    {device.location.city}, {device.location.country} ({device.location.coords})
                  </span>
                </div>

                <div className="p-3 rounded-2xl bg-[#060a14]/60 border border-white/5">
                  <span className="text-gray-400 text-[10px] block">Network Bearer</span>
                  <span className="font-bold text-white mt-1 block">{device.networkType}</span>
                </div>

                <div className="p-3 rounded-2xl bg-[#060a14]/60 border border-white/5">
                  <span className="text-gray-400 text-[10px] block">Browser Locale</span>
                  <span className="font-bold text-white mt-1 block">{device.language}</span>
                </div>
              </div>
            </div>

            {/* Grid 3: Security & Session Authentication Details */}
            <div>
              <h4 className="text-xs font-bold font-mono text-[#00daf3] uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <ShieldCheck size={14} /> Authentication Credentials
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-3 rounded-2xl bg-[#060a14]/60 border border-white/5">
                  <span className="text-gray-400 text-[10px] block">Authentication Protocol</span>
                  <span className="font-bold text-white mt-1 block truncate">{device.authMethod}</span>
                </div>

                <div className="p-3 rounded-2xl bg-[#060a14]/60 border border-white/5">
                  <span className="text-gray-400 text-[10px] block">First Authenticated Date</span>
                  <span className="font-bold text-white mt-1 block">{device.firstLogin}</span>
                </div>

                <div className="p-3 rounded-2xl bg-[#060a14]/60 border border-white/5 col-span-1 sm:col-span-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-gray-400 text-[10px] block">Active Session Token Handle</span>
                      <span className="font-bold text-gray-300 text-[11px] font-mono mt-0.5 block truncate">
                        {device.sessionTokenId}
                      </span>
                    </div>
                    <button
                      onClick={handleCopyToken}
                      className="px-3 py-1 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs text-[#00daf3] font-bold flex items-center gap-1 transition-colors"
                    >
                      {copiedToken ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                      <span>{copiedToken ? 'Copied' : 'Copy Token'}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Footer Actions */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-6 border-t border-white/10 bg-[#060a14]/80">
            <button
              onClick={() => onToggleTrust(device.id)}
              className={`px-4 py-2.5 rounded-xl border text-xs font-bold font-mono transition-all flex items-center gap-2 ${
                device.isTrusted
                  ? 'bg-amber-500/10 hover:bg-amber-500/20 border-amber-500/30 text-amber-400'
                  : 'bg-cyan-500/10 hover:bg-cyan-500/20 border-cyan-500/30 text-[#00daf3]'
              }`}
            >
              <ShieldCheck size={15} />
              <span>{device.isTrusted ? 'Mark as Untrusted' : 'Mark as Trusted'}</span>
            </button>

            <button
              onClick={() => onSignOut(device)}
              className="px-4 py-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 text-xs font-bold font-mono transition-all flex items-center gap-2"
            >
              <LogOut size={15} />
              <span>{device.isCurrentSession ? 'Sign Out Current Session' : 'Revoke Session'}</span>
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
