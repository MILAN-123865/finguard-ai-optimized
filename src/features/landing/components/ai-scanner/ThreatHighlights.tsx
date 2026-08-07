import React from 'react';
import { motion } from 'motion/react';
import { ShieldAlert, Link, Phone, Mail, Building, Clock, AlertCircle } from 'lucide-react';
import { ScanResult } from '../../../../types';

interface ThreatHighlightsProps {
  content: string;
  highlights?: { word: string; severity: 'low' | 'medium' | 'high' }[];
  result?: ScanResult | null;
}

export const ThreatHighlights: React.FC<ThreatHighlightsProps> = ({ content, highlights = [], result }) => {
  const redFlags = result?.indicators || result?.keywords || result?.redFlags || [];
  const urls = result?.detectedUrls || result?.extractedUrls || [];
  const phones = result?.phoneNumbers || result?.extractedPhoneNumbers || [];
  const emails = result?.emails || result?.extractedEmails || [];
  const entities = result?.entities || result?.extractedEntities || [];
  const timeline = result?.timeline || [];
  const explanation = result?.explanation || result?.reasoning || result?.summary || '';

  const renderHighlightedContent = () => {
    if (!highlights || highlights.length === 0) return <span>{content}</span>;

    let segments: { text: string; highlight?: { word: string; severity: 'low' | 'medium' | 'high' } }[] = [{ text: content }];

    highlights.forEach((hl) => {
      if (!hl?.word) return;
      const newSegments: typeof segments = [];
      const regex = new RegExp(`(${hl.word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');

      segments.forEach((seg) => {
        if (seg.highlight) {
          newSegments.push(seg);
        } else {
          const parts = seg.text.split(regex);
          parts.forEach((part) => {
            if (part.toLowerCase() === hl.word.toLowerCase()) {
              newSegments.push({ text: part, highlight: hl });
            } else if (part) {
              newSegments.push({ text: part });
            }
          });
        }
      });
      segments = newSegments;
    });

    return segments.map((seg, idx) => {
      if (seg.highlight) {
        let colorClasses = 'bg-yellow-100 text-yellow-800 border-yellow-300';
        if (seg.highlight.severity === 'high') {
          colorClasses = 'bg-red-100 text-[#EF4444] border-red-200 font-bold underline';
        } else if (seg.highlight.severity === 'medium') {
          colorClasses = 'bg-orange-100 text-[#F59E0B] border-orange-200 font-semibold';
        }

        return (
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.05 }}
            key={idx}
            className={`px-1.5 py-0.5 rounded border inline-block mx-0.5 ${colorClasses}`}
          >
            {seg.text}
          </motion.span>
        );
      }
      return <span key={idx}>{seg.text}</span>;
    });
  };

  return (
    <div className="bg-white rounded-[20px] p-6 border border-[#E4E7E5] h-full flex flex-col gap-5 shadow-xs">
      {/* Category & Executive Summary */}
      {result?.scamType && (
        <div className="flex flex-col gap-2 border-b border-[#E4E7E5] pb-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#11875D] uppercase tracking-wider">
              Scam Classification
            </span>
            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-[#DDF2EA] text-[#11875D] border border-[#11875D]/30">
              {result.scamType}
            </span>
          </div>
          {explanation && (
            <p className="text-xs text-[#64748B] leading-relaxed mt-1">
              {explanation}
            </p>
          )}
        </div>
      )}

      {/* Semantic Text Highlighting */}
      <div className="flex flex-col gap-2">
        <h3 className="text-xs font-bold text-[#64748B] uppercase tracking-wider">
          Semantic Threat Highlighting
        </h3>
        <div className="text-[#111827] text-xs leading-relaxed whitespace-pre-wrap bg-[#F8FAFC] rounded-[16px] p-4 border border-[#E4E7E5] max-h-48 overflow-y-auto">
          {renderHighlightedContent()}
        </div>
      </div>

      {/* Extracted Indicators */}
      <div className="space-y-3 pt-2">
        <h3 className="text-xs font-bold text-[#64748B] uppercase tracking-wider">
          Extracted Indicators
        </h3>
        
        <div className="flex flex-wrap gap-2 text-xs">
          {urls.map((url: string, i: number) => (
            <span key={i} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-red-50 text-[#EF4444] border border-red-200 font-medium">
              <Link size={12} /> {url}
            </span>
          ))}

          {phones.map((phone: string, i: number) => (
            <span key={i} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 text-[#F59E0B] border border-amber-200 font-medium">
              <Phone size={12} /> {phone}
            </span>
          ))}

          {emails.map((email: string, i: number) => (
            <span key={i} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#DDF2EA] text-[#11875D] border border-[#11875D]/30 font-medium">
              <Mail size={12} /> {email}
            </span>
          ))}

          {entities.map((entity: string, i: number) => (
            <span key={i} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#F8FAFC] text-[#111827] border border-[#E4E7E5] font-medium">
              <Building size={12} /> {entity}
            </span>
          ))}
        </div>
      </div>

      {/* Detected Red Flags */}
      {redFlags.length > 0 && (
        <div className="space-y-2 pt-2 border-t border-[#E4E7E5]">
          <h3 className="text-xs font-bold text-[#EF4444] uppercase tracking-wider flex items-center gap-1.5">
            <AlertCircle size={14} /> Red Flag Patterns
          </h3>
          <ul className="space-y-1 text-xs text-[#111827]">
            {redFlags.map((flag: string, i: number) => (
              <li key={i} className="flex items-start gap-1.5">
                <span className="text-[#EF4444] font-bold">•</span>
                <span>{flag}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
