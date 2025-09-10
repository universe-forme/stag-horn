"use client";
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { getAdminSession } from '../lib/utils';
import Navbar from './Navbar';
import Footer from './Footer';

export default function ConditionalLayout({ children }) {
  const pathname = usePathname();
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const session = getAdminSession();
      setIsAdminLoggedIn(!!session);
    } catch (error) {
      console.warn('Error checking admin session:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Don't show navbar and footer on admin and auth pages
  const isAdminPage = pathname.startsWith('/admin');
  const isAuthPage = pathname === '/login' || pathname === '/signup' || pathname === '/forgot-password';
  const shouldShowNavbarFooter = !isAdminPage && !isAuthPage;

  if (isLoading) {
    return <div></div>;
  }

  return (
    <>
      {shouldShowNavbarFooter && <Navbar isAdminLoggedIn={isAdminLoggedIn} />}
      {children}
      {shouldShowNavbarFooter && <Footer />}
    </>
  );
}
