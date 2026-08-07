import React from 'react';
import { ShieldAlert, ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';

// Import all sub-components
import { EvidenceTimeline } from './EvidenceTimeline';
import { ThreatIndicators } from './ThreatIndicators';
import { EvidenceHighlights } from './EvidenceHighlights';
import { DecisionTree } from './DecisionTree';
import { ThreatIntelTable } from './ThreatIntelTable';
import { VerdictCard } from './VerdictCard';
import { ConfidenceRadar } from './ConfidenceRadar';
import { EducationCard } from './EducationCard';
import { ExportActions } from './ExportActions';

export const InvestigationCenter: React.FC = () => {
  return (
    <div className="w-full max-w-[1400px] mx-auto py-12 px-4 sm:px-6 relative min-h-screen">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none -z-10 bg-[#050711]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px]" />
        <div className="absolute top-[20%] right-[-10%] w-[800px] h-[600px] bg-red-500/5 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-[#00daf3]/5 blur-[150px] rounded-full" />
      </div>

      <button className="flex items-center gap-2 text-[#94a3b8] hover:text-white mb-8 transition-colors group">
        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        <span className="font-bold">Back to Scanner</span>
      </button>

      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="text-red-400 font-mono text-sm tracking-widest uppercase font-bold bg-red-500/10 px-4 py-1.5 rounded-full border border-red-500/20 mb-4 inline-block">
            Threat Forensics Center
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mt-2">
            AI Investigation Report
          </h2>
          <p className="text-[#94a3b8] mt-3 max-w-2xl text-sm md:text-base">
            Detailed technical investigation report of detected threat vectors, Indicators of Compromise (IoC), and global threat intelligence matches.
          </p>
        </div>

        <div className="flex items-center gap-6 p-4 rounded-2xl bg-white/5 border border-white/10 shrink-0">
          <div>
            <div className="text-[10px] font-mono text-[#94a3b8] uppercase tracking-wider">Threat Level</div>
            <div className="text-red-400 font-bold text-xl flex items-center gap-2">
              <ShieldAlert size={20} /> CRITICAL
            </div>
          </div>
          <div className="w-[1px] h-10 bg-white/10" />
          <div>
            <div className="text-[10px] font-mono text-[#94a3b8] uppercase tracking-wider">Confidence</div>
            <div className="text-white font-bold text-xl">99.1%</div>
          </div>
        </div>
      </div>

      {/* 3-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT COLUMN: Timeline */}
        <div className="lg:col-span-3">
          <EvidenceTimeline />
        </div>

        {/* CENTER COLUMN: Deep Dive */}
        <div className="lg:col-span-6 space-y-6">
          <EvidenceHighlights />
          <ThreatIndicators />
          <DecisionTree />
          <ThreatIntelTable />
        </div>

        {/* RIGHT COLUMN: Verdict & Output */}
        <div className="lg:col-span-3 space-y-6">
          <VerdictCard />
          <ConfidenceRadar />
          <EducationCard />
          <ExportActions />
        </div>
        
      </div>
    </div>
  );
};
