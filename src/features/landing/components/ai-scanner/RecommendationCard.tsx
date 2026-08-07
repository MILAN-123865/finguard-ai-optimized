import React from 'react';
import { ShieldAlert, ShieldCheck } from 'lucide-react';

interface RecommendationCardProps {
  title?: string;
  actions?: { text: string; type: 'safe' | 'danger' | 'neutral' }[];
  recommendationText?: string;
}

export const RecommendationCard: React.FC<RecommendationCardProps> = ({
  title,
  actions,
  recommendationText
}) => {
  const safeActions = Array.isArray(actions) && actions.length > 0
    ? actions
    : [
        { text: recommendationText || 'Exercise digital safety precautions.', type: 'neutral' as const }
      ];

  const isDanger = safeActions.some(a => a.type === 'danger');
  const safeTitle = title || (isDanger ? 'RECOMMENDED ACTION REQUIRED' : 'VERIFIED COMMUNICATION');

  const Icon = isDanger ? ShieldAlert : ShieldCheck;
  const containerStyle = isDanger 
    ? 'bg-red-50 border-red-200 text-[#EF4444]' 
    : 'bg-[#DDF2EA] border-[#11875D]/30 text-[#11875D]';
  
  return (
    <div className={`rounded-[20px] p-6 border ${containerStyle} flex flex-col items-center text-center gap-4 shadow-xs`}>
      <div className="flex flex-col items-center gap-2">
        <Icon size={28} />
        <h2 className="text-lg font-bold uppercase tracking-wide">
          {safeTitle}
        </h2>
      </div>

      <div className="flex flex-wrap justify-center gap-2.5 w-full">
        {safeActions.map((action, idx) => {
          let badgeStyle = 'bg-white text-[#111827] border-[#E4E7E5]';
          if (action.type === 'danger') badgeStyle = 'bg-[#EF4444] text-white border-[#EF4444]';
          if (action.type === 'safe') badgeStyle = 'bg-[#11875D] text-white border-[#11875D]';

          return (
            <div 
              key={idx}
              className={`px-4 py-2 rounded-[12px] text-xs font-bold border ${badgeStyle} shadow-2xs`}
            >
              {action.text}
            </div>
          );
        })}
      </div>
    </div>
  );
};
