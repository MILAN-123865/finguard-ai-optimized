import React, { useEffect, useState } from 'react';
import { Dialog } from '../../components/ui/Dialog';
import { Button } from '../../components/ui/Button';
import { Clock, ShieldAlert } from 'lucide-react';

export const SessionMonitor: React.FC = () => {
  const [isExpired, setIsExpired] = useState(false);

  // In a real app, this would hook into AuthContext or interceptors
  // Here we just expose a global window method for testing/simulation
  useEffect(() => {
    (window as any).simulateSessionExpiry = () => setIsExpired(true);
    return () => {
      delete (window as any).simulateSessionExpiry;
    };
  }, []);

  if (!isExpired) return null;

  return (
    <Dialog
      isOpen={isExpired}
      onClose={() => setIsExpired(false)}
      title="Session Expired"
      description="For your security, your session has timed out due to inactivity."
    >
      <div className="flex flex-col items-center justify-center p-4 text-center">
        <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-4">
          <Clock size={32} className="text-amber-400" />
        </div>
        <p className="text-sm text-[#bac9cc] mb-6">
          Please authenticate again to regain access to the SOC Neural Gateway.
        </p>
        <div className="flex gap-4 w-full">
          <Button variant="primary" onClick={() => window.location.href = '/login'} className="w-full">
            Re-Authenticate
          </Button>
        </div>
      </div>
    </Dialog>
  );
};
