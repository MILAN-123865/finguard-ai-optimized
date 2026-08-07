import React from 'react';
import { MessageSquareText, Image as ImageIcon, Link, QrCode, FileBarChart } from 'lucide-react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';

const actions = [
  { label: 'Scan Message', icon: <MessageSquareText size={18} />, tab: 'sms', route: '/scanner' },
  { label: 'Check URL', icon: <Link size={18} />, tab: 'url', route: '/scanner' },
  { label: 'Analyze QR', icon: <QrCode size={18} />, tab: 'qr', route: '/scanner' },
  { label: 'Upload Proof', icon: <ImageIcon size={18} />, tab: 'image', route: '/scanner' },
  { label: 'Report Scam', icon: <FileBarChart size={18} />, route: '/report' },
];

export const QuickActions: React.FC = () => {
  const navigate = useNavigate();

  const handleActionClick = (action: typeof actions[0]) => {
    if (action.route === '/scanner' && action.tab) {
      navigate('/scanner', { state: { tab: action.tab } });
    } else {
      navigate(action.route);
    }
  };

  return (
    <div className="bg-white rounded-[20px] border border-[#E4E7E5] p-5 flex flex-col h-full shadow-xs">
      <h3 className="font-bold text-[#111827] text-sm mb-4 pb-2 border-b border-[#E4E7E5]">Quick Actions</h3>
      
      <div className="grid grid-cols-2 gap-3 flex-1">
        {actions.map((action, idx) => (
          <motion.button
            key={idx}
            onClick={() => handleActionClick(action)}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="flex flex-col items-center justify-center gap-2 p-3.5 rounded-[16px] border border-[#E4E7E5] bg-[#F8FAFC] hover:bg-[#DDF2EA] hover:border-[#11875D]/30 text-[#111827] hover:text-[#11875D] transition-colors cursor-pointer"
          >
            <div className="text-[#11875D]">
              {action.icon}
            </div>
            <span className="text-xs font-bold">{action.label}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
};
