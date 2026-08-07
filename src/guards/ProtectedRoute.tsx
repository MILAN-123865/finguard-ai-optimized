import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

interface ProtectedRouteProps {
  children?: React.ReactNode;
  requireVerification?: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requireVerification = true,
}) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0d1a] flex flex-col items-center justify-center p-4">
        <div className="w-14 h-14 rounded-full border-2 border-[#00daf3] border-t-transparent animate-spin mb-4" />
        <p className="text-xs font-mono text-[#00daf3] tracking-wider animate-pulse">
          VERIFYING SECURITY CLEARANCE...
        </p>
      </div>
    );
  }

  // 1. If not authenticated at all -> redirect to /login
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 2. If authenticated but email NOT verified and page requires verification -> redirect to /email-verification
  if (requireVerification && !user.emailVerified) {
    return <Navigate to="/email-verification" state={{ email: user.email }} replace />;
  }

  return children ? <>{children}</> : null;
};
