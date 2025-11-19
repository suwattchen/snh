import React from 'react';
import { LayoutDashboard, Server, CreditCard, Settings, LogOut, Users, Globe, Activity, ShoppingBag, LifeBuoy } from 'lucide-react';

interface DashboardLayoutProps {
  children: React.ReactNode;
  currentPage: string;
  currentRole: 'client' | 'admin';
  onNavigate: (page: string) => void;
  onSwitchRole: () => void;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, currentPage, currentRole, onNavigate, onSwitchRole }) => {
  
  const clientNavItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Overview' },
    { id: 'marketplace', icon: ShoppingBag, label: 'App Marketplace' }, // New
    { id: 'services', icon: Server, label: 'My Services' },
    { id: 'billing', icon: CreditCard, label: 'Billing' },
    { id: 'support', icon: LifeBuoy, label: 'Support Tickets' }, // New
    { id: 'settings', icon: Settings, label: 'Account' },
  ];

  const adminNavItems = [
    { id: 'admin-dashboard', icon: Activity, label: 'Server Health' },
    { id: 'admin-clients', icon: Users, label: 'Client Management' },
    { id: 'admin-services', icon: Server, label: 'Container Control' },
    { id: 'admin-domains', icon: Globe, label: 'Cloudflare DNS' }, // New
    { id: 'admin-billing', icon: CreditCard, label: 'Revenue & Invoices' },
    { id: 'admin-settings', icon: Settings, label: 'System Settings' },
  ];

  const items = currentRole === 'client' ? clientNavItems : adminNavItems;
  const sidebarColor = currentRole === 'client' ? 'bg-slate-900' : 'bg-slate-950';
  const logoColor = currentRole === 'client' ? 'bg-indigo-500' : 'bg-red-600';

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className={`w-64 ${sidebarColor} text-slate-300 hidden md:flex flex-col fixed h-full transition-colors duration-300`}>
        <div className="p-6 border-b border-slate-800">
          <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <div className={`w-8 h-8 ${logoColor} rounded-lg flex items-center justify-center shadow-lg`}>
              <span className="text-lg font-bold text-white">N</span>
            </div>
            NexusHost
            {currentRole === 'admin' && <span className="text-xs bg-red-900 text-red-200 px-1.5 py-0.5 rounded border border-red-800">ADM</span>}
          </h1>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                currentPage === item.id 
                  ? 'bg-white/10 text-white shadow-md' 
                  : 'hover:bg-white/5 hover:text-white'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800 space-y-2">
          <button 
            onClick={onSwitchRole}
            className="w-full flex items-center gap-3 px-4 py-2 text-xs uppercase font-bold text-slate-500 hover:text-white transition-colors border border-slate-800 rounded-lg hover:bg-slate-800"
          >
             Switch to {currentRole === 'client' ? 'Admin' : 'Client'}
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white transition-colors hover:bg-red-500/10 rounded-lg">
            <LogOut className="w-5 h-5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className={`md:hidden fixed top-0 left-0 w-full ${sidebarColor} text-white p-4 z-40 flex justify-between items-center shadow-md`}>
        <div className="flex items-center gap-2">
          <div className={`w-6 h-6 ${logoColor} rounded flex items-center justify-center`}>
            <span className="font-bold text-xs">N</span>
          </div>
          <span className="font-bold">NexusHost</span>
        </div>
        <button className="p-2">Menu</button>
      </div>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 p-6 md:p-10 pt-20 md:pt-10">
        {children}
      </main>
    </div>
  );
};