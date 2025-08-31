"use client";
import { createContext, useContext, useState, useEffect } from 'react';
import { getAdminSession, clearAdminSession } from '../lib/utils';

const AdminAuthContext = createContext();

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};

export const AdminAuthProvider = ({ children }) => {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminSession, setAdminSession] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      // Check for existing admin session on mount
      const session = getAdminSession();
      if (session) {
        setIsAdminLoggedIn(true);
        setAdminSession(session);
      }
    } catch (error) {
      console.error('Error checking admin session:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = (sessionData) => {
    try {
      setAdminSession(sessionData);
      setIsAdminLoggedIn(true);
    } catch (error) {
      console.error('Error during admin login:', error);
    }
  };

  const logout = () => {
    try {
      clearAdminSession();
      setAdminSession(null);
      setIsAdminLoggedIn(false);
    } catch (error) {
      console.error('Error during admin logout:', error);
    }
  };

  const value = {
    isAdminLoggedIn,
    adminSession,
    isLoading,
    login,
    logout,
  };

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
};
