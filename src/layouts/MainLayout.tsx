import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/common/Navbar';
import { Footer } from '../components/common/Footer';
import { FloatingActionGroup } from '../components/common/FloatingActionGroup';
import { AccessibilityWidget } from '../components/common/AccessibilityWidget';
import { SessionMonitor } from '../components/common/SessionMonitor';
import { KeyboardManager } from '../components/common/KeyboardManager';

export const MainLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F7F8F5] text-[#111827] flex flex-col relative overflow-x-hidden">
      <Navbar />
      <main className="flex-1 pt-2 sm:pt-4 pb-12 px-4 sm:px-6 lg:px-8 max-w-[1400px] w-full mx-auto relative z-10">
        <Outlet />
      </main>
      <Footer />
      <FloatingActionGroup />
      <AccessibilityWidget />
      <SessionMonitor />
      <KeyboardManager />
    </div>
  );
};
