import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/common/Navbar';
import { Footer } from '../components/common/Footer';

export const AuthLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F7F8F5] text-[#111827] flex flex-col relative overflow-x-hidden">
      <Navbar />
      
      <main className="flex-1 flex items-center justify-center py-8 sm:py-12 px-4 z-10 w-full max-w-lg mx-auto">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};
