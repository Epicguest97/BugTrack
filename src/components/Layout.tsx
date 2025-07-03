
import React from 'react';
import { Navigation } from './Navigation';
import { useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className="min-h-screen bg-gray-50">
      {!isHomePage && <Navigation />}
      <main className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${!isHomePage ? 'py-8' : ''}`}>
        {children}
      </main>
    </div>
  );
};
