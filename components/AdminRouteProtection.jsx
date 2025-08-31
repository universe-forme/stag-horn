"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAdminAuth } from './AdminAuthProvider';

export default function AdminRouteProtection({ children }) {
  const { isAdminLoggedIn, isLoading } = useAdminAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAdminLoggedIn) {
      router.push('/login');
    }
  }, [isAdminLoggedIn, isLoading, router]);

  // Show loading while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D6AF66] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render children if not authenticated
  if (!isAdminLoggedIn) {
    return null;
  }

  return children;
}
