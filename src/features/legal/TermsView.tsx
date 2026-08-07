import React from 'react';
import { motion } from 'motion/react';
import { FileText, Shield, Key, Eye, Server, Mail, Scale } from 'lucide-react';

export const TermsView: React.FC = () => {
  const sections = [
    {
      title: "Introduction",
      icon: <FileText className="text-[#00daf3]" size={24} />,
      content: "Welcome to FinGuard AI. These Terms and Conditions govern your access to and use of our AI Shield Telemetry portal and associated services. By accessing our platform, you agree to comply with and be bound by these terms."
    },
    {
      title: "User Responsibilities",
      icon: <Scale className="text-[#d2bbff]" size={24} />,
      content: "Users must maintain the confidentiality of their portal access credentials. Any actions performed under your account are your sole responsibility. You agree not to attempt unauthorized access, reverse engineering, or network disruption of the platform."
    },
    {
      title: "Privacy & Data Collection",
      icon: <Eye className="text-[#00daf3]" size={24} />,
      content: "We collect telemetry and authentication data strictly for security monitoring and AI threat detection. By using the service, you consent to our data collection practices as detailed in the Privacy Policy."
    },
    {
      title: "Security & Monitoring",
      icon: <Shield className="text-[#d2bbff]" size={24} />,
      content: "Our AI shield actively monitors all connections. We reserve the right to instantly terminate sessions or block IPs that exhibit malicious behavior, automated crawling, or violation of our fair-use policies."
    },
    {
      title: "Cookies & Tracking",
      icon: <Server className="text-[#00daf3]" size={24} />,
      content: "We use encrypted session cookies required for authentication and biometric scanning states. We do not use third-party marketing trackers on the portal."
    },
    {
      title: "Access & Authentication",
      icon: <Key className="text-[#d2bbff]" size={24} />,
      content: "Portal access may require multi-factor authentication (MFA) or biometric verification. Refusal to comply with security prompts will result in denied clearance."
    },
    {
      title: "Contact",
      icon: <Mail className="text-[#00daf3]" size={24} />,
      content: "For compliance or legal inquiries, please contact our security team at security@finguard.ai or via the authenticated support portal."
    }
  ];

  return (
    <div className="py-10 max-w-4xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
          Terms & Conditions
        </h1>
        <p className="text-[#bac9cc] font-mono max-w-2xl mx-auto">
          Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </p>
      </motion.div>

      <div className="space-y-6">
        {sections.map((section, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-card rounded-2xl p-6 sm:p-8 border border-white/10 bg-[#0a0d1c]/60 backdrop-blur-md relative overflow-hidden group hover:border-[#00e5ff]/30 transition-colors"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#00e5ff]/5 to-[#6001d1]/5 rounded-full blur-2xl pointer-events-none group-hover:from-[#00e5ff]/10 group-hover:to-[#6001d1]/10 transition-all" />
            
            <div className="flex items-start gap-4 sm:gap-6 relative z-10">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 shrink-0">
                {section.icon}
              </div>
              <div>
                <h2 className="text-xl font-bold text-white mb-2">{section.title}</h2>
                <p className="text-[#bac9cc] font-mono text-sm leading-relaxed">
                  {section.content}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
