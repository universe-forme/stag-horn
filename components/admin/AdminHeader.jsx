"use client";

import { Bell, User, Search, LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useAdminAuth } from "../AdminAuthProvider";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function AdminHeader() {
  const { adminSession, logout } = useAdminAuth();
  const router = useRouter();

  const handleLogout = () => {
    if (confirm('Are you sure you want to log out?')) {
      logout();
      toast.success('Admin logged out successfully');
      router.push('/');
    }
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-4">
          <h2 className="text-lg font-semibold text-gray-900">Admin Dashboard</h2>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search..."
              className="pl-10 w-64"
            />
          </div>
          
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
          </Button>
          
          <div className="flex items-center space-x-3">
            <div className="text-right">
              <div className="text-sm font-medium text-gray-900">
                {adminSession?.username || 'Admin User'}
              </div>
              <div className="text-xs text-gray-500">
                {adminSession?.loginTime ? 
                  `Logged in: ${new Date(adminSession.loginTime).toLocaleString()}` : 
                  'admin@wazircutlery.com'
                }
              </div>
            </div>
            <Button variant="ghost" size="sm" className="rounded-full">
              <User className="h-5 w-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleLogout}
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
