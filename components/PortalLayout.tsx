import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
  GraduationCap,
  CreditCard,
  PieChart
} from 'lucide-react';
import { User, UserRole } from '../types';

interface PortalLayoutProps {
  user: User | null;
  logout: () => void;
}

const PortalLayout: React.FC<PortalLayoutProps> = ({ user, logout }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getMenuItems = () => {
    switch (user.role) {
      case UserRole.ADMIN:
        return [
          { name: 'Dashboard', icon: LayoutDashboard, path: '/admin/dashboard' },
          { name: 'Applications', icon: FileText, path: '/admin/applications' },
          { name: 'Agents', icon: Users, path: '/admin/agents' },
          { name: 'Finance', icon: CreditCard, path: '/admin/finance' },
          { name: 'Reports', icon: PieChart, path: '/admin/reports' },
          { name: 'Settings', icon: Settings, path: '/admin/settings' },
        ];
      case UserRole.AGENT:
        return [
          { name: 'Dashboard', icon: LayoutDashboard, path: '/agent/dashboard' },
          { name: 'My Leads', icon: Users, path: '/agent/leads' },
          { name: 'Applications', icon: FileText, path: '/agent/applications' },
          { name: 'Commissions', icon: CreditCard, path: '/agent/commissions' },
        ];
      case UserRole.STUDENT:
        return [
          { name: 'My Profile', icon: LayoutDashboard, path: '/student/dashboard' },
          { name: 'New Application', icon: FileText, path: '/student/apply' },
          { name: 'Payments', icon: CreditCard, path: '/student/payments' },
        ];
      default:
        return [];
    }
  };

  const menuItems = getMenuItems();

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Mobile Sidebar Backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-slate-900 bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-slate-900 text-white transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between h-16 px-6 bg-slate-950">
          <Link to="/" className="flex items-center gap-2 font-bold text-xl">
            <GraduationCap className="h-6 w-6 text-indigo-500" />
            <span>EduLink</span>
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-slate-400">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="px-6 py-4">
           <div className="flex items-center gap-3 mb-6 p-3 bg-slate-800 rounded-lg">
             <div className="h-10 w-10 rounded-full bg-indigo-500 flex items-center justify-center text-sm font-bold">
                {user.name.charAt(0)}
             </div>
             <div className="overflow-hidden">
               <p className="text-sm font-medium text-white truncate">{user.name}</p>
               <p className="text-xs text-slate-400 truncate capitalize">{user.role.toLowerCase()}</p>
             </div>
           </div>

          <nav className="space-y-1">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === item.path
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="absolute bottom-0 w-full p-4 border-t border-slate-800">
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-3 py-2 text-sm font-medium text-slate-300 rounded-md hover:bg-slate-800 hover:text-white transition-colors"
          >
            <LogOut className="mr-3 h-5 w-5" />
            Sign Out
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="flex items-center justify-between lg:justify-end h-16 px-6 bg-white border-b border-slate-200">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-slate-500 hover:text-slate-700"
          >
            <Menu className="h-6 w-6" />
          </button>
          <div className="hidden lg:block text-sm text-slate-500">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default PortalLayout;