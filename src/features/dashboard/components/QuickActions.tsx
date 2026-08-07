import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, History, FileText, Download, Sparkles } from 'lucide-react';

export const QuickActions: React.FC = () => {
  const navigate = useNavigate();

  const actions = [
    {
      label: 'Scan Message',
      desc: 'Instant AI Threat Inspection',
      icon: ShieldAlert,
      onClick: () => navigate('/scanner'),
      gradient: 'from-[#00e5ff]/20 to-[#00daf3]/30',
      border: 'border-[#00e5ff]/50',
      color: 'text-[#00daf3]',
    },
    {
      label: 'View History',
      desc: 'Neural Scan Audit Log',
      icon: History,
      onClick: () => navigate('/history'),
      gradient: 'from-[#6001d1]/20 to-[#d2bbff]/20',
      border: 'border-[#6001d1]/50',
      color: 'text-[#d2bbff]',
    },
    {
      label: 'Report Scam',
      desc: 'Submit Fraud to Registry',
      icon: FileText,
      onClick: () => navigate('/report'),
      gradient: 'from-red-500/20 to-amber-500/20',
      border: 'border-red-500/40',
      color: 'text-red-400',
    },
    {
      label: 'Export Audit Log',
      desc: 'Download CSV Telemetry',
      icon: Download,
      onClick: () => {
        const dummyCsv = 'id,type,score,level,timestamp\nscan_001,sms,88,DANGEROUS,10m ago\nscan_002,whatsapp,94,CRITICAL,25m ago';
        const blob = new Blob([dummyCsv], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'finguard_security_audit.csv';
        a.click();
      },
      gradient: 'from-[#00e5ff]/10 to-emerald-500/20',
      border: 'border-emerald-500/40',
      color: 'text-emerald-400',
    },
  ];

  return (
    <div className="glass-card rounded-3xl p-6 border border-white/10 space-y-4 shadow-2xl">
      <h3 className="text-sm font-bold text-white flex items-center gap-2">
        <Sparkles size={16} className="text-[#00daf3]" />
        <span>Command Center Quick Actions</span>
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {actions.map((act, i) => {
          const Icon = act.icon;
          return (
            <button
              key={i}
              onClick={act.onClick}
              className={`p-4 rounded-2xl bg-gradient-to-br ${act.gradient} border ${act.border} hover:scale-[1.02] transition-all text-left space-y-2 group shadow-lg`}
            >
              <div className="flex justify-between items-center">
                <Icon size={20} className={`${act.color} group-hover:scale-110 transition-transform`} />
                <span className="text-[10px] font-mono uppercase text-[#bac9cc]">Fast Execution</span>
              </div>
              <div>
                <h4 className="font-bold text-sm text-white">{act.label}</h4>
                <p className="text-[11px] text-[#bac9cc] font-mono">{act.desc}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
