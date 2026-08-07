import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { 
  User, ShieldCheck, LogOut, Terminal, Edit3, Settings, 
  Smartphone, Laptop, Activity, Camera, ArrowUpRight, ShieldAlert
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { SettingsModal } from './SettingsModal';
import { EditProfileModal } from './EditProfileModal';
import { DeviceManagementModal } from './components/DeviceManagementModal';
import { AuthorizedDevice } from './types/device';
import { INITIAL_DEVICES } from './data/mockDevices';
import { motion } from 'motion/react';

export const ProfileView: React.FC = () => {
  const { t } = useTranslation();
  const { user, logout } = useAuth();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isDeviceManagementOpen, setIsDeviceManagementOpen] = useState(false);
  const [devices, setDevices] = useState<AuthorizedDevice[]>(INITIAL_DEVICES);

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-5xl mx-auto pb-10">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">{t('profile.entityProfile', 'Security Entity Profile')}</h1>
          <p className="text-xs font-mono text-[#bac9cc] mt-1">
            {t('profile.agentIdentity', 'Agent Identity & Security Gateway Settings')}
          </p>
        </div>
        <button
          onClick={() => setIsSettingsOpen(true)}
          className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-colors flex items-center gap-2 text-sm font-bold cursor-pointer"
        >
          <Settings size={18} />
          <span className="hidden sm:inline">{t('profile.settings', 'Settings')}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column */}
        <div className="lg:col-span-1 space-y-8">
          
          {/* User Card */}
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="glass-card rounded-3xl p-6 border border-[#00daf3]/30 flex flex-col items-center text-center gap-4 relative overflow-hidden">
            <div className="absolute top-4 right-4 flex gap-2">
              <button onClick={() => setIsEditProfileOpen(true)} className="p-2 rounded-xl bg-white/5 hover:bg-[#00daf3]/10 text-[#bac9cc] hover:text-[#00daf3] transition-colors" title="Edit Profile">
                <Edit3 size={16} />
              </button>
            </div>

            <div className="relative group cursor-pointer" onClick={() => setIsEditProfileOpen(true)}>
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#00e5ff]/20 to-[#6001d1]/30 border-2 border-[#00e5ff]/40 flex items-center justify-center text-[#00daf3] overflow-hidden">
                <User size={40} />
              </div>
              <div className="absolute inset-0 bg-black/60 rounded-full flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera size={20} className="text-white mb-1" />
                <span className="text-[10px] text-white font-bold">Upload</span>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white">{user?.name || "Security Operator"}</h2>
              <p className="text-xs font-mono text-[#bac9cc] mt-0.5">{user?.email || "operator@finguard.ai"}</p>
              <div className="flex items-center justify-center gap-2 mt-3">
                <span className="px-2.5 py-0.5 rounded-full bg-[#00daf3]/20 text-[#00daf3] text-[10px] font-mono font-bold uppercase">
                  {user?.role || "Admin"}
                </span>
                <span className="flex items-center gap-1 text-[10px] font-mono text-green-400">
                  <ShieldCheck size={12} />
                  <span>MFA Active</span>
                </span>
              </div>
            </div>

            <button
              onClick={logout}
              className="w-full py-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-bold font-mono transition-all flex items-center justify-center gap-2 mt-2"
            >
              <LogOut size={15} />
              <span>Revoke Session</span>
            </button>
          </motion.div>

          {/* Security Score Card */}
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }} className="glass-card rounded-3xl p-6 border border-[#00daf3]/30">
            <h3 className="text-sm font-bold text-white flex items-center gap-2 mb-4">
              <Activity size={16} className="text-[#00daf3]" />
              Security Score
            </h3>
            <div className="flex items-end gap-3 mb-2">
              <span className="text-4xl font-extrabold text-[#00daf3]">98</span>
              <span className="text-sm text-[#bac9cc] font-bold mb-1">/ 100</span>
            </div>
            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden mb-3">
              <div className="h-full bg-gradient-to-r from-[#00e5ff] to-[#6001d1] w-[98%]" />
            </div>
            <p className="text-xs text-[#bac9cc]">Your account security is excellent. 2FA is active and no breaches detected.</p>
          </motion.div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Active Devices List */}
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="glass-card rounded-3xl p-6 md:p-8 border border-[#00daf3]/30">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Laptop size={18} className="text-[#00daf3]" />
                  <span>Authorized Devices</span>
                </h3>
                <p className="text-xs font-mono text-[#bac9cc] mt-0.5">
                  {devices.length} verified hardware devices & active sessions
                </p>
              </div>
              <button
                onClick={() => setIsDeviceManagementOpen(true)}
                className="px-3.5 py-1.5 rounded-2xl bg-[#00daf3]/10 hover:bg-[#00daf3]/20 border border-[#00daf3]/40 text-xs text-[#00daf3] font-bold font-mono transition-all flex items-center gap-1.5 shadow-[0_0_12px_rgba(0,218,243,0.15)] cursor-pointer"
              >
                <span>Manage</span>
                <ArrowUpRight size={14} />
              </button>
            </div>

            <div className="space-y-3">
              {devices.slice(0, 3).map((device) => {
                const isCurrent = device.isCurrentSession || device.status === 'current';

                return (
                  <div
                    key={device.id}
                    onClick={() => setIsDeviceManagementOpen(true)}
                    className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition-all duration-200 ${
                      isCurrent
                        ? 'bg-[#00daf3]/10 border-[#00daf3]/40 shadow-[0_0_15px_rgba(0,218,243,0.15)] hover:border-[#00daf3]'
                        : 'bg-white/5 border-white/5 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-xl ${isCurrent ? 'bg-[#00daf3]/20 text-[#00daf3]' : 'bg-white/5 text-[#bac9cc]'}`}>
                        {device.type === 'mobile' ? <Smartphone size={20} /> : <Laptop size={20} />}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-white">{device.name}</h4>
                          {device.isTrusted && <ShieldCheck size={14} className="text-emerald-400" title="Trusted Device" />}
                        </div>
                        <p className="text-xs text-[#bac9cc] font-mono">
                          {device.os} • {device.browser} ({device.location.city}, {device.location.country})
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      {isCurrent ? (
                        <span className="inline-block px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold uppercase mb-1 font-mono">
                          Current Session
                        </span>
                      ) : (
                        <p className="text-xs text-[#bac9cc] mb-1 font-mono">{device.lastActive}</p>
                      )}
                      <p className="text-[10px] text-[#bac9cc] font-mono">IP: {device.ipAddress}</p>
                    </div>
                  </div>
                );
              })}

              {devices.length > 3 && (
                <button
                  onClick={() => setIsDeviceManagementOpen(true)}
                  className="w-full py-2 bg-white/5 hover:bg-white/10 border border-white/5 rounded-2xl text-xs font-mono text-[#00daf3] text-center font-bold transition-colors"
                >
                  View All ({devices.length}) Devices in Management Center →
                </button>
              )}
            </div>
          </motion.div>

          {/* Detailed Session Audit Trail */}
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }} className="glass-card rounded-3xl p-6 md:p-8 border border-[#00daf3]/30">
            <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-6">
              <Terminal size={18} className="text-[#00daf3]" />
              <span>Login Activity Timeline</span>
            </h3>

            <div className="relative border-l border-white/10 ml-4 space-y-6">
              <div className="relative pl-6">
                <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-green-400 shadow-[0_0_10px_#4ade80]" />
                <div className="flex justify-between items-start mb-1">
                  <span className="text-sm font-bold text-white">Authorized Login</span>
                  <span className="text-xs text-[#bac9cc] font-mono">Just now</span>
                </div>
                <p className="text-xs text-[#bac9cc]">Successfully authenticated via MFA (Authenticator App).</p>
              </div>

              <div className="relative pl-6">
                <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-[#00daf3] shadow-[0_0_10px_#00daf3]" />
                <div className="flex justify-between items-start mb-1">
                  <span className="text-sm font-bold text-white">Profile Updated</span>
                  <span className="text-xs text-[#bac9cc] font-mono">Yesterday, 14:30</span>
                </div>
                <p className="text-xs text-[#bac9cc]">Notification preferences were modified.</p>
              </div>
              
              <div className="relative pl-6">
                <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_10px_#fbbf24]" />
                <div className="flex justify-between items-start mb-1">
                  <span className="text-sm font-bold text-white">New Device Detected</span>
                  <span className="text-xs text-[#bac9cc] font-mono">Jul 20, 09:15</span>
                </div>
                <p className="text-xs text-[#bac9cc]">Login from new device (iPhone 15 Pro) approved via Email verification.</p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
      <EditProfileModal isOpen={isEditProfileOpen} onClose={() => setIsEditProfileOpen(false)} />
      <DeviceManagementModal
        isOpen={isDeviceManagementOpen}
        onClose={() => setIsDeviceManagementOpen(false)}
        devices={devices}
        onUpdateDevices={(updated) => setDevices(updated)}
      />
    </div>
  );
};
