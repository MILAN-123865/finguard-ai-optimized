import React from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, RefreshCw, Home, WifiOff, Settings, Lock } from 'lucide-react';
import { Button } from '../../components/ui/Button';

interface SystemPageProps {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  actionText: string;
  onAction: () => void;
  secondaryActionText?: string;
  onSecondaryAction?: () => void;
}

const SystemPageTemplate: React.FC<SystemPageProps> = ({
  title,
  subtitle,
  icon,
  actionText,
  onAction,
  secondaryActionText,
  onSecondaryAction,
}) => (
  <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-500">
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', damping: 20, stiffness: 200 }}
      className="w-32 h-32 rounded-full bg-white/5 border-2 border-white/10 flex items-center justify-center mb-8 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[#00daf3]/10 animate-pulse" />
      <div className="relative z-10 text-[#00daf3]">{icon}</div>
    </motion.div>

    <motion.h1
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.1 }}
      className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4"
    >
      {title}
    </motion.h1>

    <motion.p
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="text-sm md:text-base font-mono text-[#bac9cc] max-w-md mb-10 leading-relaxed"
    >
      {subtitle}
    </motion.p>

    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
    >
      {secondaryActionText && onSecondaryAction && (
        <Button variant="outline" onClick={onSecondaryAction} className="w-full sm:w-auto">
          {secondaryActionText}
        </Button>
      )}
      <Button variant="primary" onClick={onAction} className="w-full sm:w-auto">
        {actionText}
      </Button>
    </motion.div>
  </div>
);

export const NotFoundView: React.FC = () => {
  const navigate = useNavigate();
  return (
    <SystemPageTemplate
      title="404 - Not Found"
      subtitle="The telemetry vector you requested does not exist in our systems. It may have been quarantined or deleted."
      icon={<ShieldAlert size={48} />}
      actionText="Return to Dashboard"
      onAction={() => navigate('/dashboard')}
    />
  );
};

export const ServerErrorView: React.FC = () => {
  const navigate = useNavigate();
  return (
    <SystemPageTemplate
      title="System Failure"
      subtitle="The SOC Neural Gateway encountered an unexpected anomaly. Our automated defense protocols are investigating."
      icon={<RefreshCw size={48} className="animate-spin-slow" />}
      actionText="Retry Connection"
      onAction={() => window.location.reload()}
      secondaryActionText="Dashboard"
      onSecondaryAction={() => navigate('/dashboard')}
    />
  );
};

export const MaintenanceView: React.FC = () => {
  return (
    <SystemPageTemplate
      title="System Maintenance"
      subtitle="FinGuard AI is currently undergoing scheduled defense grid upgrades. We will be back online shortly."
      icon={<Settings size={48} className="animate-spin-slow" />}
      actionText="Check Status"
      onAction={() => window.location.reload()}
    />
  );
};

export const OfflineView: React.FC = () => {
  return (
    <SystemPageTemplate
      title="No Connection"
      subtitle="Your local device has lost connection to the FinGuard Neural Gateway. Check your internet connection to resume protection."
      icon={<WifiOff size={48} />}
      actionText="Retry Connection"
      onAction={() => window.location.reload()}
    />
  );
};

export const AccessDeniedView: React.FC = () => {
  const navigate = useNavigate();
  return (
    <SystemPageTemplate
      title="Access Denied"
      subtitle="You do not have the required clearance level to access this sector. Please verify your credentials."
      icon={<Lock size={48} />}
      actionText="Return to Safety"
      onAction={() => navigate('/')}
    />
  );
};
