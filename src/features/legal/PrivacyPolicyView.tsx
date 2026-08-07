import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Shield, Database, Cpu, Cookie, Globe, Lock, UserCheck, Mail } from 'lucide-react';

interface PolicySectionProps {
  title: string;
  icon: React.ReactNode;
  content: React.ReactNode;
  defaultOpen?: boolean;
}

const PolicySection: React.FC<PolicySectionProps> = ({ title, icon, content, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border border-white/10 rounded-2xl bg-[#0a0d1c]/60 backdrop-blur-md overflow-hidden transition-colors hover:border-white/20">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
      >
        <div className="flex items-center gap-4">
          <div className="p-2 rounded-lg bg-white/5 border border-white/10 text-[#00daf3]">
            {icon}
          </div>
          <h2 className="text-lg font-bold text-white">{title}</h2>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="text-[#bac9cc]" size={20} />
        </motion.div>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-6 pb-6 pt-2 text-[#bac9cc] font-mono text-sm leading-relaxed border-t border-white/5 mt-2">
              {content}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const PrivacyPolicyView: React.FC = () => {
  return (
    <div className="py-10 max-w-4xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#00e5ff]/20 to-[#6001d1]/20 border border-[#00e5ff]/40 text-[#00daf3] mb-6 shadow-[0_0_25px_rgba(0,229,255,0.3)]">
          <Shield size={32} />
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
          Privacy Policy
        </h1>
        <p className="text-[#bac9cc] font-mono max-w-2xl mx-auto">
          We are committed to protecting your personal information and your right to privacy.
          If you have any questions about this privacy notice, please contact us.
        </p>
      </motion.div>

      <div className="space-y-4">
        <PolicySection 
          defaultOpen={true}
          title="Information Collection" 
          icon={<Database size={20} />} 
          content={<p>We collect personal information that you voluntarily provide to us when you register on the Services, express an interest in obtaining information about us or our products and Services, when you participate in activities on the Services, or otherwise when you contact us. The personal information that we collect depends on the context of your interactions with us and the Services.</p>} 
        />
        <PolicySection 
          title="Data Storage" 
          icon={<Lock size={20} />} 
          content={<p>We keep your information for as long as necessary to fulfill the purposes outlined in this privacy notice unless otherwise required by law. When we have no ongoing legitimate business need to process your personal information, we will either delete or anonymize such information, or, if this is not possible (for example, because your personal information has been stored in backup archives), then we will securely store your personal information and isolate it from any further processing until deletion is possible.</p>} 
        />
        <PolicySection 
          title="AI Usage" 
          icon={<Cpu size={20} />} 
          content={<p>Our platform utilizes artificial intelligence and machine learning algorithms for threat detection and telemetry analysis. Your interaction data may be processed by these systems to improve our security models. This data is strictly anonymized and aggregated. We do not use your personal data to train publicly accessible AI models.</p>} 
        />
        <PolicySection 
          title="Cookies" 
          icon={<Cookie size={20} />} 
          content={<p>We use cookies and similar tracking technologies (like web beacons and pixels) to access or store information. Specific information about how we use such technologies and how you can refuse certain cookies is set out in our Cookie Notice. Our primary use of cookies is for maintaining secure authenticated sessions.</p>} 
        />
        <PolicySection 
          title="Third-party Services" 
          icon={<Globe size={20} />} 
          content={<p>We may share your data with third-party vendors, service providers, contractors, or agents who perform services for us or on our behalf and require access to such information to do that work. We have contracts in place with our data processors, which are designed to help safeguard your personal information.</p>} 
        />
        <PolicySection 
          title="Security" 
          icon={<Shield size={20} />} 
          content={<p>We have implemented appropriate and reasonable technical and organizational security measures designed to protect the security of any personal information we process. However, despite our safeguards and efforts to secure your information, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure.</p>} 
        />
        <PolicySection 
          title="User Rights" 
          icon={<UserCheck size={20} />} 
          content={<p>In some regions, you have certain rights under applicable data protection laws. These may include the right (i) to request access and obtain a copy of your personal information, (ii) to request rectification or erasure; (iii) to restrict the processing of your personal information; and (iv) if applicable, to data portability. To make such a request, please use the contact details provided below.</p>} 
        />
        <PolicySection 
          title="Contact" 
          icon={<Mail size={20} />} 
          content={<p>If you have questions or comments about this notice, you may email us at privacy@finguard.ai or contact our Data Protection Officer directly through the authenticated support portal.</p>} 
        />
      </div>
    </div>
  );
};
