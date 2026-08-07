import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, User, Mail, Lock, Save, Camera, Check } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EditProfileModal: React.FC<EditProfileModalProps> = ({ isOpen, onClose }) => {
  const { user, updateProfile } = useAuth();
  const [activeTab, setActiveTab] = useState<'profile' | 'password'>('profile');
  const [fullName, setFullName] = useState<string>(user?.fullName || '');
  const [avatarUrl, setAvatarUrl] = useState<string>(user?.avatarUrl || '');
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSuccessMsg(null);
    try {
      await updateProfile({ fullName, avatarUrl });
      setSuccessMsg('Profile updated successfully!');
      setTimeout(() => {
        setSuccessMsg(null);
        onClose();
      }, 1000);
    } catch (err: any) {
      alert('Failed to update profile');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-md bg-[#0a0d1a] border border-white/10 shadow-2xl rounded-3xl overflow-hidden flex flex-col h-auto max-h-[90vh] text-white"
        >
          <div className="p-5 border-b border-white/10 flex justify-between items-center bg-[#0a0d1a]">
            <h2 className="font-bold text-white">Edit Security Profile</h2>
            <button onClick={onClose} className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-[#bac9cc] hover:text-white transition-colors cursor-pointer">
              <X size={18} />
            </button>
          </div>

          <div className="flex border-b border-white/5 bg-[#0f1321]">
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex-1 py-3 text-sm font-bold text-center transition-colors cursor-pointer ${
                activeTab === 'profile' ? 'text-[#00daf3] border-b-2 border-[#00daf3]' : 'text-[#bac9cc] hover:text-white'
              }`}
            >
              Profile Details
            </button>
          </div>

          <div className="p-6 overflow-y-auto custom-scrollbar">
            {successMsg && (
              <div className="mb-4 p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-mono flex items-center gap-2">
                <Check size={16} />
                <span>{successMsg}</span>
              </div>
            )}

            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div className="flex justify-center mb-6">
                <div className="relative group">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#00e5ff]/20 to-[#6001d1]/30 border-2 border-[#00e5ff]/40 flex items-center justify-center text-[#00daf3] overflow-hidden">
                    {avatarUrl ? (
                      <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                    ) : (
                      <User size={40} />
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs text-[#bac9cc] font-bold">Full Name</label>
                <div className="relative">
                  <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#bac9cc]" />
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-3 text-sm text-white focus:outline-none focus:border-[#00daf3]"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs text-[#bac9cc] font-bold">Email Address (Read Only)</label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#bac9cc]" />
                  <input
                    type="email"
                    disabled
                    value={user?.email || ''}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-3 text-sm text-white/50 cursor-not-allowed"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSaving}
                className="w-full py-3 rounded-xl bg-[#00daf3] text-[#0a0d1a] font-bold text-sm hover:bg-[#00e5ff] transition-colors flex items-center justify-center gap-2 mt-6 cursor-pointer"
              >
                <Save size={16} />
                <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
