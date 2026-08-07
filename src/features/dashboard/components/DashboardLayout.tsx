import React, { useState } from 'react';
import { DashboardSidebar } from './DashboardSidebar';
import { DashboardHeader } from './DashboardHeader';
import { NotificationPanel } from './NotificationPanel';
import { DashboardFooter } from './DashboardFooter';
import { useDashboard } from '../hooks/useDashboard';
import { FloatingActionGroup } from '../../../components/common/FloatingActionGroup';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const { notifications, markNotificationRead, markAllNotificationsRead } = useDashboard();

  const unreadNotificationsCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="min-h-screen bg-[#F7F8F5] text-[#111827] flex flex-col lg:flex-row relative overflow-x-hidden">
      {/* Sidebar */}
      <DashboardSidebar
        isMobileOpen={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto w-full">
        <DashboardHeader
          onToggleMobileMenu={() => setIsMobileSidebarOpen(true)}
          onToggleNotifications={() => setIsNotificationOpen(true)}
          unreadCount={unreadNotificationsCount}
        />

        <main className="flex-1 space-y-8">{children}</main>

        <DashboardFooter />
      </div>

      {/* Notification Drawer */}
      <NotificationPanel
        notifications={notifications}
        isOpen={isNotificationOpen}
        onClose={() => setIsNotificationOpen(false)}
        onMarkRead={markNotificationRead}
        onMarkAllRead={markAllNotificationsRead}
      />
      
      <FloatingActionGroup />
    </div>
  );
};
