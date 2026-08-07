import React from 'react';

export const Divider: React.FC<{ className?: string; orientation?: 'horizontal' | 'vertical' }> = ({ 
  className = '', 
  orientation = 'horizontal' 
}) => {
  return (
    <div 
      className={`${orientation === 'horizontal' ? 'w-full h-px' : 'h-full w-px'} bg-white/10 ${className}`} 
      role="separator" 
    />
  );
};

export const EmptyState: React.FC<{ 
  icon?: React.ReactNode; 
  title: string; 
  description?: string; 
  action?: React.ReactNode;
  className?: string;
}> = ({ icon, title, description, action, className = '' }) => (
  <div className={`flex flex-col items-center justify-center text-center p-8 border border-white/10 border-dashed rounded-3xl ${className}`}>
    {icon && <div className="text-white/20 mb-4 [&>svg]:w-12 [&>svg]:h-12">{icon}</div>}
    <h3 className="text-lg font-bold text-white">{title}</h3>
    {description && <p className="text-sm text-[#bac9cc] mt-2 max-w-sm">{description}</p>}
    {action && <div className="mt-6">{action}</div>}
  </div>
);

export const ErrorState: React.FC<{ 
  icon?: React.ReactNode; 
  title: string; 
  description?: string; 
  onRetry?: () => void;
  className?: string;
}> = ({ icon, title, description, onRetry, className = '' }) => (
  <div className={`flex flex-col items-center justify-center text-center p-8 bg-red-950/10 border border-red-500/20 rounded-3xl ${className}`}>
    {icon && <div className="text-red-500/50 mb-4 [&>svg]:w-12 [&>svg]:h-12">{icon}</div>}
    <h3 className="text-lg font-bold text-red-400">{title}</h3>
    {description && <p className="text-sm text-[#bac9cc] mt-2 max-w-sm">{description}</p>}
    {onRetry && (
      <button 
        onClick={onRetry}
        className="mt-6 px-6 py-2 rounded-xl border border-red-500/50 text-red-400 font-bold hover:bg-red-500/10 transition-colors"
      >
        Try Again
      </button>
    )}
  </div>
);
